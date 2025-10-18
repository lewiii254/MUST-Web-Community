// Mobile Navigation Toggle (accessible)
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

function setMobileMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    mobileMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
}

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('active');
        setMobileMenu(!isOpen);
    });
}

// Close mobile menu with Escape and trap focus when open
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        setMobileMenu(false);
        // close modal if open
        const modal = document.getElementById('project-modal');
        if (modal && modal.getAttribute('aria-hidden') === 'false') closeProjectModal();
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        setMobileMenu(false);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // move focus for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            target.removeAttribute('tabindex');
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Throttled scroll handling for active link highlighting
let scrollTimeout = null;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
        let current = '';
        const scrollPosition = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

            // When nav opens, focus first link for keyboard users
            const firstNavLink = document.querySelector('.nav-menu .nav-link');
            if (mobileMenu) {
                mobileMenu.addEventListener('click', () => {
                    const open = mobileMenu.classList.contains('active');
                    if (open && firstNavLink) firstNavLink.focus();
                });
            }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        scrollTimeout = null;
    }, 100);
});

// Navbar background on scroll
// Navbar background on scroll and show back-to-top button
const navbar = document.querySelector('.navbar');
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        backToTop.style.display = 'flex';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('#home')?.focus();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                // animate only if not already set
                if (!bar.style.width) bar.style.width = width;
            });
        }
    });
}, { threshold: 0.4 });

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const cat = card.getAttribute('data-category') || 'all';
            if (filter === 'all' || cat === filter) card.style.display = '';
            else card.style.display = 'none';
        });
    });
});

// Project modal (open/close)
const projectModal = document.getElementById('project-modal');
const modalBody = projectModal ? projectModal.querySelector('.modal-body') : null;
const modalCloseBtn = projectModal ? projectModal.querySelector('.modal-close') : null;

function openProjectModal(contentHtml) {
    if (!projectModal || !modalBody) return;
    modalBody.innerHTML = contentHtml;
    projectModal.setAttribute('aria-hidden', 'false');
    // trap focus
    const focusable = projectModal.querySelectorAll('a, button, input, textarea, [tabindex]');
    if (focusable.length) focusable[0].focus();
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.setAttribute('aria-hidden', 'true');
    modalBody && (modalBody.innerHTML = '');
}

// Open modal when clicking project link or project card
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // ignore if clicking actual external link
        if (e.target.closest('a')) return;
        const title = card.querySelector('.project-content h3')?.textContent || 'Project';
        const desc = card.querySelector('.project-content p')?.innerHTML || '';
        const tech = card.querySelector('.project-tech')?.innerHTML || '';
        const html = `<h2>${title}</h2><div>${desc}</div><div class="project-tech">${tech}</div>`;
        openProjectModal(html);
    });
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
if (projectModal) projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });

// Contact form handling with validation and toast
const contactForm = document.querySelector('.contact-form');
const createToast = (msg, type = 'info') => {
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    t.setAttribute('role', 'status');
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; }, 3000);
    setTimeout(() => { t.remove(); }, 3600);
};

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';

        if (!name.trim() || !email.trim() || !message.trim()) {
            createToast('Please fill in all required fields.', 'error');
            return;
        }

        // Here you would normally send the data to a server.
        createToast('Thank you for your message! I\'ll get back to you soon. 🚀', 'success');
        this.reset();
    });
}

// Dark mode toggle with persistence
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.classList.add('dark-mode-toggle');
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = '🌙';
    toggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        z-index: 1001;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow);
        transition: var(--transition);
    `;
    document.body.appendChild(toggle);

    const setMode = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        toggle.innerHTML = isDark ? '☀️' : '🌙';
        try { localStorage.setItem('dark-mode', isDark ? '1' : '0'); } catch (e) {}
    };

    // Initialize from preference or localStorage
    const saved = (() => { try { return localStorage.getItem('dark-mode'); } catch (e) { return null; }})();
    if (saved !== null) setMode(saved === '1');
    else setMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    toggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        setMode(!isDark);
    });

    toggle.addEventListener('mouseenter', () => { toggle.style.transform = 'scale(1.05)'; });
    toggle.addEventListener('mouseleave', () => { toggle.style.transform = 'scale(1)'; });
};

// Initialize dark mode toggle
createDarkModeToggle();

// Typing animation for hero title (respects reduced-motion)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
        const text = heroTitle.textContent.trim();
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            }
        };
        window.addEventListener('load', () => { setTimeout(typeWriter, 600); });
    }
}

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add some interactive hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        font-size: 2rem;
        transition: opacity 0.5s ease;
    `;
    loader.innerHTML = '🚀 Loading...';
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
});

// Easter egg - Konami code
let konamiCode = [];
const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === correctCode.toString()) {
        document.body.style.animation = 'rainbow 1s infinite';
        alert('🎉 Easter egg found! You\'re awesome! 🎉');
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

console.log('🚀 Portfolio loaded successfully!');
console.log('💡 Tip: Try the Konami code (Up Up Down Down Left Right Left Right B A) for a surprise!');
