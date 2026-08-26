/* ==========================================================================
   Baking Beauty - Estética Facial y Corporal
   Interactive Logic & Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu on clicking nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // 2. Services Filtering System (Tabs with Multi-category Support)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';

                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 3. WhatsApp Quick Inquiry Form Handler
    const quickForm = document.getElementById('whatsapp-quick-form');
    if (quickForm) {
        quickForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const interest = document.getElementById('form-interest').value;
            const message = document.getElementById('form-message').value.trim();

            if (!name || !message) {
                alert('Por favor, completá tu nombre y mensaje para enviarte el asesoramiento por WhatsApp.');
                return;
            }

            // Check if interest is related to lashes/brows to direct to dedicated link
            let whatsappUrl = `https://wa.me/qr/JULPQ2VESAFND1`;
            if (interest.includes('Pestañas') || interest.includes('Cejas')) {
                whatsappUrl = `https://wa.me/message/T3XJ4SQKZAMJH1`;
            }

            window.open(whatsappUrl, '_blank');
        });
    }

    // 4. Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Scroll Reveal Animation for Cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.pillar-card, .service-card, .product-card, .brand-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // CSS class helper for revealed elements
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

});
