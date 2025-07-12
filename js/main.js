// Modern JavaScript for Patrick Seguin Website

// Translations
const translations = {
    fr: {
        // Navigation
        home: "Accueil",
        music: "Musique",
        about: "À Propos",
        contact: "Contact",
        
        // Homepage
        welcome: "Bienvenue",
        name: "Patrick Seguin",
        tagline: "Auteur-compositeur | Créateur musical",
        listen: "Découvrir ma musique",
        latest_release: "Dernière sortie",
        explore_music: "Explorer ma musique",
        learn_more: "En savoir plus",
        get_in_touch: "Me contacter",
        
        // Music Page
        my_music: "Ma Musique",
        discover: "Découvrez mes créations sur toutes les plateformes",
        spotify: "Spotify",
        apple_music: "Apple Music",
        youtube_music: "YouTube Music",
        deezer: "Deezer",
        listen_on: "Écouter sur",
        
        // About Page
        about_title: "À Propos de Moi",
        bio1: "Je suis Patrick Seguin, artiste musical indépendant passionné par l'écriture et la création musicale.",
        bio2: "J'utilise Suno AI pour donner vie à mes compositions, combinant technologie et créativité pour produire une musique unique.",
        bio3: "Ma démarche artistique repose sur l'authenticité des textes et l'exploration de nouvelles sonorités.",
        bio4: "Distribué via DistroKid, je partage ma musique avec le monde tout en conservant mon indépendance créative.",
        creative_process: "Processus Créatif",
        tools_tech: "Outils & Technologies",
        
        // Contact Page
        contact_title: "Contactez-moi",
        contact_intro: "N'hésitez pas à me contacter pour toute collaboration, question ou simplement pour discuter de musique.",
        name_label: "Nom",
        email_label: "Email",
        subject_label: "Sujet",
        message_label: "Message",
        send: "Envoyer",
        send_message: "Envoyer le message",
        follow_me: "Suivez-moi",
        
        // Messages
        thanks: "Merci pour votre message! Je vous répondrai dès que possible.",
        error: "Une erreur s'est produite. Veuillez réessayer.",
        required_field: "Ce champ est requis",
        invalid_email: "Veuillez entrer une adresse email valide"
    },
    en: {
        // Navigation
        home: "Home",
        music: "Music",
        about: "About",
        contact: "Contact",
        
        // Homepage
        welcome: "Welcome",
        name: "Patrick Seguin",
        tagline: "Songwriter | Music Creator",
        listen: "Discover my music",
        latest_release: "Latest Release",
        explore_music: "Explore my music",
        learn_more: "Learn more",
        get_in_touch: "Get in touch",
        
        // Music Page
        my_music: "My Music",
        discover: "Discover my creations on all platforms",
        spotify: "Spotify",
        apple_music: "Apple Music",
        youtube_music: "YouTube Music",
        deezer: "Deezer",
        listen_on: "Listen on",
        
        // About Page
        about_title: "About Me",
        bio1: "I am Patrick Seguin, an independent music artist passionate about writing and music creation.",
        bio2: "I use Suno AI to bring my compositions to life, combining technology and creativity to produce unique music.",
        bio3: "My artistic approach is based on authentic lyrics and exploration of new sounds.",
        bio4: "Distributed via DistroKid, I share my music with the world while maintaining my creative independence.",
        creative_process: "Creative Process",
        tools_tech: "Tools & Technology",
        
        // Contact Page
        contact_title: "Contact Me",
        contact_intro: "Feel free to contact me for any collaboration, question or simply to discuss music.",
        name_label: "Name",
        email_label: "Email",
        subject_label: "Subject",
        message_label: "Message",
        send: "Send",
        send_message: "Send Message",
        follow_me: "Follow Me",
        
        // Messages
        thanks: "Thank you for your message! I will get back to you as soon as possible.",
        error: "An error occurred. Please try again.",
        required_field: "This field is required",
        invalid_email: "Please enter a valid email address"
    }
};

// Website Class
class PatrickSeguinWebsite {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'fr';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.translatePage(this.currentLang);
        this.highlightActiveNavItem();
        this.setupScrollAnimations();
        this.setupContactForm();
    }

    setupEventListeners() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.translatePage(btn.dataset.lang);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('show');
                }
            });

            // Close mobile menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('show');
                });
            });
        }

        // Smooth scrolling for anchor links (for single page sections)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                }
            });
        }
    }

    translatePage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update document language
        document.documentElement.lang = lang;
    }

    highlightActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            // Check if this is the current page
            if ((currentPath.endsWith(href)) || 
                (currentPath === '/' && href === 'index.html') ||
                (currentPath.includes(href.replace('.html', '')))) {
                link.classList.add('active');
            }
        });
    }

    setupScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        document.querySelectorAll('.card, .platform, .grid > *').forEach(el => {
            observer.observe(el);
        });
    }

    setupContactForm() {
        const contactForm = document.querySelector('#contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!this.validateForm(name, email, message)) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                this.showMessage(translations[this.currentLang].thanks, 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    validateForm(name, email, message) {
        const errors = [];

        if (!name.trim()) {
            errors.push(translations[this.currentLang].required_field + ': ' + translations[this.currentLang].name_label);
        }

        if (!email.trim()) {
            errors.push(translations[this.currentLang].required_field + ': ' + translations[this.currentLang].email_label);
        } else if (!this.isValidEmail(email)) {
            errors.push(translations[this.currentLang].invalid_email);
        }

        if (!message.trim()) {
            errors.push(translations[this.currentLang].required_field + ': ' + translations[this.currentLang].message_label);
        }

        if (errors.length > 0) {
            this.showMessage(errors.join('\n'), 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        Object.assign(messageDiv.style, {
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            marginTop: '1rem',
            textAlign: 'center',
            fontWeight: '500'
        });

        if (type === 'success') {
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else if (type === 'error') {
            messageDiv.style.background = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }

        // Add to form
        const contactForm = document.querySelector('#contact-form');
        contactForm.appendChild(messageDiv);

        // Remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Utility method for page transitions
    navigateToPage(page) {
        window.location.href = page;
    }
}

// Platform links data
const platformLinks = {
    spotify: '#', // Replace with actual Spotify link
    apple: '#',   // Replace with actual Apple Music link
    youtube: '#', // Replace with actual YouTube Music link
    deezer: '#'   // Replace with actual Deezer link
};

// Update platform links
function updatePlatformLinks() {
    Object.keys(platformLinks).forEach(platform => {
        const elements = document.querySelectorAll(`[data-platform="${platform}"]`);
        elements.forEach(element => {
            if (platformLinks[platform] !== '#') {
                element.href = platformLinks[platform];
                element.target = '_blank';
                element.rel = 'noopener noreferrer';
            }
        });
    });
}

// Initialize website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const website = new PatrickSeguinWebsite();
    updatePlatformLinks();
    
    // Add some additional enhancements
    
    // Parallax effect for hero sections
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // Typing effect for hero text (if desired)
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Export for use in other scripts if needed
window.PatrickSeguinWebsite = PatrickSeguinWebsite;
