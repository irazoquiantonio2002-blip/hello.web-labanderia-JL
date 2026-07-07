/* ═══════════════════════════════════════════════════════════
   LAVANDERÍA JL — main.js
   Lavado, Planchado y Tintorería a Domicilio
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  initPreloader();        // 1. Preloader premium
  initHeroBubbles();      // 2. Burbujas de jabón animadas ★ NUEVO
  initHeroCanvas();       // 3. Canvas: gotas + líneas velocidad
  initNavbar();           // 4. Navbar sticky + hamburger
  initScrollReveal();     // 5. Reveal on scroll
  initStaggerObserver();  // 6. Stagger cards
  initFloatingCards();    // 7. Float animation
  initContactForm();      // 8. Form → WhatsApp
  initParallax();         // 9. Parallax mouse
  initMobileMenuClose();  // 10. Cierra menú móvil
  initSpeedLines();       // 11. Speed lines + counters

});

/* ═══════════════════════════════════════════════════════════
   2. BURBUJAS DE JABÓN ANIMADAS EN HERO
   Suben flotando con deriva lateral suave
   ═══════════════════════════════════════════════════════════ */
function initHeroBubbles() {
  const container = document.getElementById('heroBubbles');
  if (!container) return;

  const FLAKE_COUNT = 28;
  const SIZES       = [12, 16, 20, 26, 32, 38, 44];
  const ICONS       = ['🫧', '○', '◯', '🫧', '●', '🫧', '○'];
  const COLORS      = [
    'rgba(186,230,253,VAL)',
    'rgba(224,242,254,VAL)',
    'rgba(255,255,255,VAL)',
    'rgba(125,211,252,VAL)',
    'rgba(147,197,253,VAL)',
  ];

  function createFlake() {
    const flake    = document.createElement('div');
    flake.classList.add('hero-bubble');

    const size     = SIZES[Math.floor(Math.random() * SIZES.length)];
    const icon     = ICONS[Math.floor(Math.random() * ICONS.length)];
    const colorTpl = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opacity  = rand(0.18, 0.65);
    const color    = colorTpl.replace('VAL', opacity.toFixed(2));
    const left     = rand(0, 100);
    const duration = rand(9, 22);
    const delay    = rand(0, 18);

    flake.textContent = icon;
    flake.style.cssText = `
      left:               ${left}%;
      top:                -60px;
      font-size:          ${size}px;
      color:              ${color};
      animation-duration: ${duration}s;
      animation-delay:   -${delay}s;
    `;

    container.appendChild(flake);

    flake.addEventListener('animationiteration', () => {
      flake.style.left             = rand(0, 100) + '%';
      const newOpacity             = rand(0.15, 0.6);
      flake.style.color            = colorTpl.replace('VAL', newOpacity.toFixed(2));
      flake.style.fontSize         = SIZES[Math.floor(Math.random() * SIZES.length)] + 'px';
      flake.style.animationDuration = rand(9, 22) + 's';
    });

    return flake;
  }

  for (let i = 0; i < FLAKE_COUNT; i++) {
    createFlake();
  }

  setInterval(() => {
    if (container.children.length < FLAKE_COUNT + 6) {
      const f = createFlake();
      f.style.animationDelay = '0s';
    }
  }, 2000);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ═══════════════════════════════════════════════════════════
   1. PRELOADER PREMIUM
   ═══════════════════════════════════════════════════════════ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const bar       = document.getElementById('progressBar');
  const percent   = document.getElementById('progressPercent');
  if (!preloader) return;

  // Partículas: gotas de agua + dots (motivo del logo)
  const particlesEl = document.getElementById('preloaderParticles');
  if (particlesEl) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('p-particle', i % 3 === 0 ? 'drop' : 'dot');
      p.style.left = Math.random() * 100 + '%';
      p.style.top  = Math.random() * 100 + '%';
      particlesEl.appendChild(p);
    }
    // Speed lines horizontales
    for (let i = 0; i < 8; i++) {
      const sl = document.createElement('div');
      sl.classList.add('preloader-speedline');
      sl.style.top  = (20 + Math.random() * 60) + '%';
      sl.style.left = (Math.random() * 20) + '%';
      sl.style.width = (80 + Math.random() * 120) + 'px';
      particlesEl.appendChild(sl);
    }
  }

  // Animar partículas (gotas cayendo)
  anime({
    targets: '.p-particle.drop',
    translateY: [() => anime.random(-200, -100), 0],
    translateX: [() => anime.random(-30, 30), 0],
    opacity: [0, 0.7, 0],
    duration: () => anime.random(2000, 4000),
    delay: () => anime.random(0, 2500),
    loop: true,
    easing: 'easeInQuad',
  });

  anime({
    targets: '.p-particle.dot',
    translateY: [0, () => anime.random(-60, 60)],
    translateX: [0, () => anime.random(-40, 40)],
    opacity: [0, 0.6, 0],
    scale: [0, () => anime.random(1.5, 3), 0],
    duration: () => anime.random(1800, 3500),
    delay: () => anime.random(0, 2000),
    loop: true,
    easing: 'easeInOutSine',
  });

  // Speed lines pulsando
  anime({
    targets: '.preloader-speedline',
    opacity: [0, 0.5, 0],
    translateX: [() => anime.random(0, 20), 0],
    duration: () => anime.random(1200, 2200),
    delay: () => anime.random(0, 1500),
    loop: true,
    easing: 'easeInOutSine',
  });

  // Animación de entrada del preloader (logo real)
  anime.timeline({ easing: 'easeOutCubic' })
    .add({
      targets: '.preloader-logo-circle',
      scale:   [0.5, 1],
      opacity: [0, 1],
      duration: 500,
    })
    .add({
      targets: '.p-ring',
      opacity: [0, 1],
      scale:   [0.7, 1],
      duration: 400,
      delay: anime.stagger(80),
    }, '-=300')
    .add({
      targets: '.preloader-brand-name',
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
    }, '-=200')
    .add({
      targets: '.preloader-tagline-text',
      opacity: [0, 1],
      duration: 300,
    }, '-=150')
    .add({
      targets: ['.preloader-progress-wrap', '.preloader-percent'],
      opacity: [0, 1],
      duration: 250,
    });

  // ── Preloader máximo 3 segundos ──
  // La barra corre en ~2.3s + 0.7s de fade = 3s total exactos
  const TOTAL_MS   = 2300;   // tiempo de llenado de barra
  const FADE_MS    = 700;    // duración del fade out
  const startTime  = performance.now();
  let prog = 0;

  function tick(now) {
    const elapsed = now - startTime;
    // Progreso basado en tiempo real → garantiza que llega al 100% en TOTAL_MS
    prog = Math.min((elapsed / TOTAL_MS) * 100, 100);

    // Easing suave: arranca rápido, frena al final
    const display = easeProgress(prog);

    if (bar)     bar.style.width    = display + '%';
    if (percent) percent.textContent = Math.round(display) + '%';

    if (prog < 100) {
      requestAnimationFrame(tick);
    } else {
      hidePreloader();
    }
  }

  // easing: fast start, slow end
  function easeProgress(p) {
    const t = p / 100;
    return (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) * 100;
  }

  setTimeout(() => requestAnimationFrame(tick), 600);

  function hidePreloader() {
    if (bar)     bar.style.width     = '100%';
    if (percent) percent.textContent  = '100%';
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => {
        preloader.style.display = 'none';
        animateHeroEntrance();
      }, FADE_MS);
    }, 200);
  }
}

/* ═══════════════════════════════════════════════════════════
   HERO ENTRANCE
   ═══════════════════════════════════════════════════════════ */
function animateHeroEntrance() {
  const tl = anime.timeline({ easing: 'easeOutCubic' });

  tl.add({ targets: '#heroBadge',    opacity: [0,1], translateY: [20,0], duration: 600 })
    .add({ targets: '#heroTitle',    opacity: [0,1], translateX: [-40,0], duration: 700 }, '-=300')
    .add({ targets: '#heroSubtitle', opacity: [0,1], translateY: [20,0], duration: 600 }, '-=400')
    .add({ targets: '#heroCtas',     opacity: [0,1], translateY: [16,0], duration: 500 }, '-=300')
    .add({ targets: '#heroTrust',    opacity: [0,1], translateY: [12,0], duration: 500 }, '-=300')
    .add({ targets: '#heroVisual',   opacity: [0,1], translateX: [60,0], duration: 800 }, '-=500');

  // Floating cards con easeOutBack
  anime({
    targets: ['#fcPrice', '#fcSpeed', '#fcRating'],
    opacity:    [0, 1],
    translateY: [25, 0],
    scale:      [0.88, 1],
    duration:   600,
    delay:      anime.stagger(160, { start: 900 }),
    easing:     'easeOutBack',
  });

  // Scroll cue
  anime({
    targets: '#heroScrollCue',
    opacity: [0, 1],
    duration: 800,
    delay: 1400,
    easing: 'easeOutCubic',
  });

  // WA button
  setTimeout(() => {
    anime({
      targets: '#waFloat',
      opacity: [0, 1],
      scale:   [0.4, 1],
      duration: 700,
      easing: 'easeOutBack',
    });
  }, 1600);
}

/* ═══════════════════════════════════════════════════════════
   2. HERO CANVAS — Gotas de agua + Líneas de velocidad
      (motivo de agua y jabón, acorde al logo de Lavandería JL)
   ═══════════════════════════════════════════════════════════ */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let waterDrops = [];
  let speedLines = [];

  // Paleta Lavandería JL — tonos azules/cyan
  const ROYAL  = 'rgba(21,96,189,';
  const ROYAL_M = 'rgba(30,120,216,';
  const SKY    = 'rgba(56,189,248,';
  const WATER  = 'rgba(186,230,253,';

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initElements();
  }

  function initElements() {
    waterDrops = [];
    speedLines = [];

    const W = canvas.width;
    const H = canvas.height;
    const dropCount = Math.min(Math.floor(W * H / 18000), 40);

    // Gotas de agua flotantes (motivo del logo)
    for (let i = 0; i < dropCount; i++) {
      waterDrops.push({
        x:   Math.random() * W,
        y:   Math.random() * H,
        vy:  Math.random() * 0.4 + 0.1,
        vx:  (Math.random() - 0.5) * 0.15,
        r:   Math.random() * 4 + 2,
        opacity: Math.random() * 0.3 + 0.05,
        color: Math.random() > 0.5 ? SKY : (Math.random() > 0.5 ? ROYAL_M : WATER),
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.005,
        swingAmp: Math.random() * 0.5 + 0.1,
      });
    }

    // Líneas de velocidad horizontales (como en el logo)
    const lineCount = Math.min(Math.floor(W / 100), 16);
    for (let i = 0; i < lineCount; i++) {
      speedLines.push({
        x:     -Math.random() * W,
        y:      Math.random() * H,
        width:  Math.random() * 80 + 30,
        vy:    (Math.random() - 0.5) * 0.1,
        speed:  Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.12 + 0.02,
        color:  Math.random() > 0.6 ? SKY : ROYAL,
        thickness: Math.random() * 1.5 + 0.5,
      });
    }
  }

  resize();
  window.addEventListener('resize', () => { resize(); });

  function drawDrop(p) {
    ctx.save();
    ctx.translate(p.x, p.y);

    // Forma de gota (igual al motivo del logo)
    ctx.beginPath();
    ctx.moveTo(0, -p.r * 1.4);
    ctx.bezierCurveTo(
      p.r * 0.7, -p.r * 0.4,
      p.r, p.r * 0.4,
      0, p.r
    );
    ctx.bezierCurveTo(
      -p.r, p.r * 0.4,
      -p.r * 0.7, -p.r * 0.4,
      0, -p.r * 1.4
    );
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -p.r * 1.4, 0, p.r);
    grad.addColorStop(0, p.color + '0.05)');
    grad.addColorStop(0.5, p.color + p.opacity + ')');
    grad.addColorStop(1, p.color + '0.02)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawSpeedLine(l) {
    ctx.save();
    const grad = ctx.createLinearGradient(l.x, 0, l.x + l.width, 0);
    grad.addColorStop(0, l.color + '0)');
    grad.addColorStop(0.3, l.color + l.opacity + ')');
    grad.addColorStop(1, l.color + '0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = l.thickness;
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(l.x + l.width, l.y);
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width;
    const H = canvas.height;

    // Dibujar líneas de velocidad
    speedLines.forEach(l => {
      drawSpeedLine(l);
      l.x += l.speed;
      l.y += l.vy;
      if (l.x > W + 20) { l.x = -l.width - 20; l.y = Math.random() * H; }
      if (l.y < 0 || l.y > H) l.vy *= -1;
    });

    // Dibujar gotas conectadas (gotas cercanas se "unen" como agua)
    for (let i = 0; i < waterDrops.length; i++) {
      for (let j = i + 1; j < waterDrops.length; j++) {
        const dx   = waterDrops[i].x - waterDrops[j].x;
        const dy   = waterDrops[i].y - waterDrops[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const op = 0.06 * (1 - dist / 100);
          ctx.beginPath();
          ctx.moveTo(waterDrops[i].x, waterDrops[i].y);
          ctx.lineTo(waterDrops[j].x, waterDrops[j].y);
          ctx.strokeStyle = SKY + op + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Dibujar gotas
    waterDrops.forEach(p => {
      drawDrop(p);
      p.swing += p.swingSpeed;
      p.x += p.vx + Math.sin(p.swing) * p.swingAmp;
      p.y += p.vy;
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
      if (p.x < -20)    p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ═══════════════════════════════════════════════════════════
   3. NAVBAR
   ═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   4. SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   5. STAGGER CARDS
   ═══════════════════════════════════════════════════════════ */
function initStaggerObserver() {
  ['.services-grid', '.services-grid-3', '.benefits-grid', '.process-wrap', '.process-wrap-4', '.solutions-grid'].forEach(sel => {
    const container = document.querySelector(sel);
    if (!container) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.stagger-card');
          anime({
            targets:    cards,
            opacity:    [0, 1],
            translateY: [40, 0],
            duration:   650,
            delay:      anime.stagger(90),
            easing:     'easeOutCubic',
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    obs.observe(container);
  });
}

/* ═══════════════════════════════════════════════════════════
   6 & 7. FLOATING CARDS — flotado suave continuo
   ═══════════════════════════════════════════════════════════ */
function initFloatingCards() {
  [
    { id: '#fcPrice',  dy: -10, dur: 3200,  delay: 0 },
    { id: '#fcSpeed',  dy: -8,  dur: 2700,  delay: 500 },
    { id: '#fcRating', dy: -12, dur: 3600,  delay: 900 },
  ].forEach(cfg => {
    const el = document.querySelector(cfg.id);
    if (!el) return;
    anime({
      targets:   el,
      translateY:[0, cfg.dy],
      duration:  cfg.dur,
      delay:     cfg.delay,
      direction: 'alternate',
      loop:      true,
      easing:    'easeInOutSine',
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   7. FLOATING CARDS (reused as slot 7)
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   8. CONTACT FORM → WhatsApp
   ═══════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = form.querySelector('[name="nombre"]')?.value   || '';
    const telefono = form.querySelector('[name="telefono"]')?.value || '';
    const equipo   = form.querySelector('[name="equipo"]')?.value   || '';
    const colonia  = form.querySelector('[name="colonia"]')?.value  || '';
    const mensaje  = form.querySelector('[name="mensaje"]')?.value  || '';

    const equipoLabel = {
      'lavado-kilo':          'Lavado por kilo',
      'planchado':            'Planchado profesional',
      'tintoreria':           'Tintorería / lavado en seco',
      'edredones-blancos':    'Edredones y blancos',
      'entrega-domicilio':    'Recolección y entrega a domicilio',
      'servicio-express':     'Servicio express',
      'otro':                 'Otro servicio',
    }[equipo] || equipo;

    const text = encodeURIComponent(
      `Hola, me llamo *${nombre}*.\n` +
      `📱 Tel: ${telefono}\n` +
      `🧺 Servicio: ${equipoLabel}\n` +
      `📍 Dirección de recolección: ${colonia}\n` +
      (mensaje ? `💬 Detalles: ${mensaje}` : '')
    );

    window.open(`https://wa.me/5214421444887?text=${text}`, '_blank');

    const btn = form.querySelector('.form-btn');
    if (btn) {
      const original = btn.innerHTML;
      btn.textContent = '✓ Redirigiendo a WhatsApp...';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        form.reset();
      }, 3000);
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   9. PARALLAX HERO — mouse move con efecto velocidad
   ═══════════════════════════════════════════════════════════ */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  hero.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const { width, height, left, top } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;

      // Orbs se mueven en dirección opuesta (profundidad)
      anime({
        targets: '.orb-1',
        translateX: x * 25, translateY: y * 18,
        duration: 800, easing: 'easeOutCubic',
      });
      anime({
        targets: '.orb-2',
        translateX: -x * 18, translateY: -y * 14,
        duration: 800, easing: 'easeOutCubic',
      });

      // La tarjeta principal leve perspectiva 3D
      anime({
        targets: '#heroMainCard',
        rotateY: x * 6, rotateX: -y * 4,
        duration: 600, easing: 'easeOutCubic',
      });

      // Speed lines se desplazan con el mouse
      anime({
        targets: '.hero-speed-lines',
        translateX: x * 10,
        duration: 400, easing: 'easeOutSine',
      });

      ticking = false;
    });
  });

  hero.addEventListener('mouseleave', () => {
    anime({
      targets: ['#heroMainCard', '.orb-1', '.orb-2', '.hero-speed-lines'],
      rotateY: 0, rotateX: 0, translateX: 0, translateY: 0,
      duration: 700, easing: 'easeOutCubic',
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   10. MOBILE MENU CLOSE
   ═══════════════════════════════════════════════════════════ */
function initMobileMenuClose() {
  const links      = document.querySelectorAll('.mobile-link, .mobile-cta');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger  = document.getElementById('hamburger');

  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
      hamburger?.classList.remove('active');
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   11. SPEED LINES SECTIONS — animación al hacer scroll
       (refuerza el motivo de velocidad del logo)
   ═══════════════════════════════════════════════════════════ */
function initSpeedLines() {
  // Añade micro-animaciones en las tarjetas al hover
  document.querySelectorAll('.service-card, .benefit-card, .logistics-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      anime({
        targets: card,
        scale: [1, 1.01],
        duration: 300,
        easing: 'easeOutCubic',
      });
    });
    card.addEventListener('mouseleave', () => {
      anime({
        targets: card,
        scale: [1.01, 1],
        duration: 300,
        easing: 'easeOutCubic',
      });
    });
  });

  // Contador animado de stats cuando entran en viewport
  const statsRow = document.querySelector('.stats-row');
  if (!statsRow) return;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsRow);
}

function animateCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  const counters = [
    { target: 100, suffix: '%',          prefix: '' },
    { target: 24,  suffix: 'h',          prefix: '' },
    { target: 6,   suffix: ' servicios', prefix: '' },
    { target: 0,   suffix: '',           prefix: '', label: 'Cotización' },
  ];

  statNums.forEach((el, i) => {
    if (!counters[i]) return;
    const { target, suffix, prefix, label } = counters[i];
    if (label) { el.textContent = label; return; }
    const obj = { val: 0 };

    anime({
      targets: obj,
      val:     target,
      round:   1,
      duration: 1800,
      easing:  'easeOutQuart',
      update: () => {
        el.textContent = prefix + Math.round(obj.val) + suffix;
      },
    });
  });
}
