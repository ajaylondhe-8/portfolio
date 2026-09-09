// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after clicking a link
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Typing effect in the hero (one orchestrated moment only)
// =========================================================
const typeTarget = document.getElementById('type-target');
const words = ['web applications.', 'REST APIs.', 'full products.', 'things that ship.'];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeTarget && !prefersReducedMotion) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = words[wordIndex];

    if (!deleting) {
      charIndex++;
      typeTarget.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400); // pause before deleting
        return;
      }
    } else {
      charIndex--;
      typeTarget.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(tick, deleting ? 40 : 70);
  }

  tick();
}

// =========================================================
// Contact form (client-side only — wire up to a real
// backend or a service like Formspree before going live)
// =========================================================
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = '#e0685f';
    formStatus.textContent = 'Please fill in every field before sending.';
    return;
  }

  // Placeholder behaviour: swap this for a real fetch() call to your
  // backend, or a form service such as Formspree / Getform.
  formStatus.style.color = '#5fb88a';
  formStatus.textContent = `Thanks, ${name} — this form isn't wired up to a server yet, but your message would be on its way.`;
  form.reset();
});

// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();