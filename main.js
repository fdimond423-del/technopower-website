/* ==========================================
   TECHNO POWER — Main JavaScript
   Hero Slider, Counters, Scroll Animations,
   Mobile Menu, Sticky Header
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== HERO SLIDER =====
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (slides.length > 1) startAutoSlide();

    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.dataset.animated) return;
            el.dataset.animated = 'true';

            const target = parseInt(el.dataset.target);
            const duration = 2000;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Quartic ease out for spring feel
                const ease = 1 - Math.pow(1 - progress, 4);
                el.textContent = Math.floor(ease * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
        });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));

    // ===== SCROLL FADE-UP ANIMATIONS =====
    const fadeElements = document.querySelectorAll(
        '.product-card, .about-feature, .application-card, .stat-item, .section-tag, .section-title, .contact-left, .contact-form-wrapper, .contact-info-right, .footer-col'
    );
    fadeElements.forEach(el => el.classList.add('fade-up'));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
                let delay = 0;
                siblings.forEach((sib, idx) => {
                    if (sib === entry.target) delay = idx * 80;
                });
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ===== MOBILE MENU TOGGLE =====
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });
        // Close menu on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ===== STICKY HEADER SHADOW =====
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
    }, { passive: true });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== PRODUCT CARD HOVER TILT =====
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
