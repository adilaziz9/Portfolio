// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Animation des skills
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, observerOptions);

    // Observer les sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observer les outils
    document.querySelectorAll('.tool-item').forEach(tool => {
        tool.classList.add('slide-up');
        observer.observe(tool);
    });

    // Animation de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 200);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );
        observer.observe(item);
    });

    // Animation du titre 3D au hover
    const title = document.querySelector('.title-3d');
    if (title) {
        title.addEventListener('mousemove', (e) => {
            const rect = title.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            title.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(50px)
            `;
        });

        title.addEventListener('mouseleave', () => {
            title.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }

    // Animation des cartes au hover
    document.querySelectorAll('.card, .timeline-card, .option-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Animation du bouton CV
    const btnCV = document.querySelector('.btn-cv');
    if (btnCV) {
        btnCV.addEventListener('mousemove', (e) => {
            const rect = btnCV.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            btnCV.style.setProperty('--x-position', `${x}px`);
            btnCV.style.setProperty('--y-position', `${y}px`);
        });
    }

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation des liens sociaux
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        link.addEventListener('mouseleave', (e) => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Amélioration de l'effet parallaxe pour le titre
    let lastScrollY = window.scrollY;
    const titleWrapper = document.querySelector('.title-wrapper');

    if (titleWrapper) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const delta = scrollY - lastScrollY;
            
            if (scrollY < window.innerHeight) {
                titleWrapper.style.transform = `translateY(${scrollY * 0.5}px)`;
                titleWrapper.style.opacity = 1 - (scrollY / window.innerHeight);
            }
            
            lastScrollY = scrollY;
        });
    }

    // Animation de chargement initial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Ajoutez ceci à votre script.js existant

// Gestion de la navigation active
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Fonction pour mettre à jour la navigation active
function updateActiveNav() {
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index]?.classList.add('active');
        }
    });
}

// Event listeners
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Gestion du menu mobile
if (window.innerWidth <= 768) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(menuToggle);

    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuToggle.innerHTML = sidebar.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Smooth scroll pour les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ajoutez ceci à votre script.js

// Gestion de la navigation active et du défilement
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Fonction pour obtenir la position de scroll d'un élément avec offset
    function getScrollPosition(element) {
        const headerOffset = 20;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        return offsetPosition;
    }

    // Gestion du clic sur les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const targetPosition = getScrollPosition(targetSection);
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mise à jour de la navigation active pendant le défilement
    function updateActiveNav() {
        const scrollPosition = window.scrollY;

        // Vérifier chaque section
        document.querySelectorAll('section, #home').forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Retirer la classe active de tous les liens
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Ajouter la classe active au lien correspondant
                const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });

        // Gestion spéciale pour la section d'accueil
        if (scrollPosition < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-link[href="#home"]').classList.add('active');
        }
    }

    // Event listeners pour le défilement
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
});

// Ajoutez ceci à votre script.js existant

document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la flèche de défilement vers le bas
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#profil');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Gestion du bouton retour en haut
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});