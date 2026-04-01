/* ════════════════════════════════════════════════════════════════
   LOWVILLE GOLF COURSE — Interactive Behaviors
   ════════════════════════════════════════════════════════════════ */

// ── Navbar: transparent over hero, solid when scrolled ──────────
const navbar = document.getElementById('navbar');

const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 70);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load


// ── Mobile menu ───────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on nav link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }
});


// ── Smooth scroll (offset for fixed nav) ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


// ── Scorecard tabs ────────────────────────────────────────────────
document.querySelectorAll('.sc-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        const panelId = btn.dataset.panel;

        document.querySelectorAll('.sc-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.sc-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(panelId).classList.add('active');
    });
});


// ── Scroll-reveal fade-up animations ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children slightly
            setTimeout(() => entry.target.classList.add('visible'), i * 75);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -55px 0px' });

const revealSelectors = [
    '.about-layout > *',
    '.af-item',
    '.course-card',
    '.testimonial',
    '.gallery-item',
    '.pricing-card',
    '.c-item',
    '.stat-item',
    '.sc-row',
];
document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
    el.classList.add('fade-up');
    revealObserver.observe(el);
});


// ── Contact form ──────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const original = btn.innerHTML;

        btn.innerHTML = 'Message Sent ✓';
        btn.style.background = '#4a8a5a';
        btn.style.pointerEvents = 'none';
        contactForm.reset();

        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.style.pointerEvents = '';
        }, 3500);
    });
}


// ── Newsletter form ───────────────────────────────────────────────
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn   = newsletterForm.querySelector('button');
        const input = newsletterForm.querySelector('input');
        const original = btn.innerHTML;

        btn.innerHTML = 'Subscribed ✓';
        input.value = '';

        setTimeout(() => { btn.innerHTML = original; }, 2600);
    });
}


// ── Page-load fade-in ─────────────────────────────────────────────
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.55s ease';
window.addEventListener('load', () => { document.body.style.opacity = '1'; });
