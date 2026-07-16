// ================= TrueTail — script.js =================
document.addEventListener('DOMContentLoaded', () => {

  /* ---- loader ---- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('done'), 400);
  });
  // fallback in case load event already fired / is slow
  setTimeout(() => loader && loader.classList.add('done'), 2500);

  /* ---- year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- nav scroll state ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    nav.classList.toggle('menu-open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('menu-open'));
  });

  /* ---- back to top ---- */
  const toTop = document.getElementById('toTop');
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
    io.observe(el);
  });

  /* ---- cursor glow ---- */
  const glow = document.getElementById('cursorGlow');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isFinePointer && glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      glow.classList.add('active');
    });
    document.addEventListener('mouseleave', () => glow.classList.remove('active'));
  }

  /* ---- 3D tilt: hero stage follows mouse ---- */
  const stage = document.querySelector('[data-tilt]');
  const pouch = document.querySelector('.hero-pouch');
  if (stage && pouch && isFinePointer) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      pouch.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 22}deg) translateZ(20px)`;
    });
    stage.addEventListener('mouseleave', () => {
      pouch.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  }

  /* ---- gentle 3D tilt for feature/product cards ---- */
  const tiltCards = document.querySelectorAll('[data-tilt-card]');
  if (isFinePointer) {
    tiltCards.forEach(card => {
      const inner = card.querySelector('.feature-card-inner') || card;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        inner.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
      });
    });
  }

  /* ---- soft tilt for about visual ---- */
  const softTilt = document.querySelector('[data-tilt-soft]');
  if (softTilt && isFinePointer) {
    softTilt.addEventListener('mousemove', (e) => {
      const rect = softTilt.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      softTilt.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    softTilt.addEventListener('mouseleave', () => {
      softTilt.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
  }

  /* ---- hero particle canvas (paw prints / dust motes) ---- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      const hero = document.querySelector('.hero');
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }

    function makeParticles() {
      const count = Math.min(60, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        speed: Math.random() * 0.4 + 0.08,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.15
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 180, 92, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }

    resize();
    makeParticles();
    tick();
    window.addEventListener('resize', () => { resize(); makeParticles(); });
  }

  /* ---- smooth-scroll for in-page nav links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

});
