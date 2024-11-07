// particles.js
class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 3 + 0.1; // Tailles plus variées
        this.speedX = (Math.random() - 0.5) * 3; // Vitesse plus variée
        this.speedY = (Math.random() - 0.5) * 3; // Vitesse plus variée
        this.life = 1;
        this.decay = 0.002 + Math.random() * 0.003; // Durée de vie plus longue
        this.opacity = Math.random() * 0.5 + 0.2; // Opacité variable
        this.color = `rgba(37, 99, 235, ${this.opacity})`;
        this.glowing = Math.random() > 0.8; // Certaines particules brillent
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;

        // Effet de rebond sur les bords
        if (this.x < 0 || this.x > this.canvas.width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.speedY *= -1;
        }

        // Réinitialisation quand la particule meurt
        if (this.life <= 0) {
            this.reset();
        }

        this.draw();
    }

    draw() {
        const gradient = this.ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        );

        if (this.glowing) {
            // Particules brillantes
            gradient.addColorStop(0, `rgba(37, 99, 235, ${this.opacity * this.life})`);
            gradient.addColorStop(0.4, `rgba(37, 99, 235, ${this.opacity * this.life * 0.6})`);
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

            // Effet de halo
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity * this.life * 0.1})`;
            this.ctx.fill();
        } else {
            // Particules normales
            gradient.addColorStop(0, `rgba(37, 99, 235, ${this.opacity * this.life})`);
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        }

        // Dessin de la particule
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Effet de trainée
        if (Math.abs(this.speedX) > 1 || Math.abs(this.speedY) > 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(this.x - this.speedX * 5, this.y - this.speedY * 5);
            this.ctx.strokeStyle = `rgba(37, 99, 235, ${this.opacity * this.life * 0.3})`;
            this.ctx.lineWidth = this.size * 0.5;
            this.ctx.stroke();
        }
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particles';
        document.body.prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 100; // Plus de particules
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('scroll', () => this.handleScroll());
    }

    init() {
        this.resize();
        
        // Création des particules
        for(let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas, this.ctx));
        }
        
        this.animate();

        // Style du canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        // Ajout de particules autour du curseur
        if (Math.random() > 0.8) {
            const particle = new Particle(this.canvas, this.ctx);
            particle.x = this.mouseX;
            particle.y = this.mouseY;
            particle.speedX = (Math.random() - 0.5) * 4;
            particle.speedY = (Math.random() - 0.5) * 4;
            particle.size = Math.random() * 4 + 1;
            particle.glowing = true;
            this.particles.push(particle);
        }
    }

    handleScroll() {
        // Ajout de particules lors du défilement
        if (Math.random() > 0.5) {
            const particle = new Particle(this.canvas, this.ctx);
            particle.x = Math.random() * this.canvas.width;
            particle.y = Math.random() * this.canvas.height;
            particle.glowing = true;
            this.particles.push(particle);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Mise à jour et dessin des particules
        this.particles = this.particles.filter(particle => particle.life > 0);
        this.particles.forEach(particle => {
            // Effet d'attraction vers la souris
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                particle.speedX += dx * 0.0001;
                particle.speedY += dy * 0.0001;
            }
            
            particle.update();
        });
        
        // Maintien du nombre de particules
        while (this.particles.length < this.numberOfParticles) {
            this.particles.push(new Particle(this.canvas, this.ctx));
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialisation du système de particules au chargement
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});