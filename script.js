(() => {
  const texts = ["Software Developer", "Web Developer"];
  let tIndex = 0, charIndex = 0, isDeleting = false;
  const TYPING_SPEED = 150;
  const DELETING_SPEED = 50;
  const PAUSE = 1000;
  const typedTextEl = document.querySelector('.typed-text');

  function typeStep() {
    const current = texts[tIndex];
    if (!typedTextEl) return;

    if (!isDeleting) {
      charIndex = Math.min(charIndex + 1, current.length);
      typedTextEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeStep, PAUSE);
        return;
      }
    } else {
      charIndex = Math.max(charIndex - 1, 0);
      typedTextEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        tIndex = (tIndex + 1) % texts.length;
      }
    }

    setTimeout(typeStep, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  function setupNav() {
    const hamburger = document.getElementById('hamburger');
    const navlist = document.getElementById('navlist');
    if (!hamburger || !navlist) return;

    function toggleNav() {
      const active = navlist.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', active ? 'true' : 'false');
    }

    hamburger.addEventListener('click', toggleNav);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNav(); }
    });

    navlist.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navlist.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }));

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navlist.contains(e.target)) {
        navlist.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupCards() {
    document.querySelectorAll('.card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.open('https://github.com/syedmohammednayyar?tab=repositories', '_blank', 'noopener');
      });
    });
  }

  function setupForm() {
    const form = document.getElementById('contactform');
    if (!form) return;
    const submitBtn = form.querySelector('input[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
        if (!res.ok) throw new Error('Network response was not ok');
        alert('Submitted! Thank you ' + (form.username?.value || '') + '. I will get back to you soon.');
        form.reset();
      } catch (err) {
        console.error(err);
        alert('There was an error sending your message. Please try again later.');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (typedTextEl) typeStep();
    setupNav();
    setupCards();
    setupForm();
  });
})();
