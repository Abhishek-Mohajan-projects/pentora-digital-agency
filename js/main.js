/* ============================================
   PENTORA DIGITAL - PORTFOLIO JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* --- Premium Preloader --- */
  const loader = document.getElementById('page-loader');
  if (loader) {
    const loaderBar = loader.querySelector('.loader-bar');
    const loaderPercent = loader.querySelector('.loader-percent');
    const isHardRefresh = performance.navigation.type === 1;
    const isFirstVisit = !sessionStorage.getItem('pentora_loaded');

    if (isHardRefresh || isFirstVisit) {
      let progress = 0;
      const duration = 1800;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        progress = Math.round(eased * 100);

        if (loaderBar) loaderBar.style.width = progress + '%';
        if (loaderPercent) loaderPercent.textContent = progress + '%';

        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          completeLoader();
        }
      }

      requestAnimationFrame(tick);
    } else {
      loader.style.display = 'none';
      initHeroAnimation();
    }

    function completeLoader() {
      loader.classList.add('exit');
      initHeroAnimation();
      loader.addEventListener('animationend', () => {
        loader.classList.add('loaded');
        sessionStorage.setItem('pentora_loaded', '1');
      }, { once: true });
    }
  }

  function initHeroAnimation() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroContent) heroContent.classList.add('animate-in');
    if (heroVisual) heroVisual.classList.add('animate-in');
  }

  /* --- Dark Mode Toggle --- */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* --- Navbar Scroll Effect --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* --- Active Nav Link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Mobile Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }

  function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });

    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  /* --- Scroll Animations (Intersection Observer) --- */
  const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => observer.observe(el));
  }

  /* --- Animated Counters --- */
  const counters = document.querySelectorAll('.stat-number[data-count]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* --- Skill Bar Animations --- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  /* --- Portfolio Filter --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* --- Portfolio Modal --- */
  const modal = document.querySelector('.portfolio-modal');
  const modalClose = document.querySelector('.modal-close');

  document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-modal-trigger');
      const modalEl = document.getElementById('modal-' + id);
      if (modalEl) {
        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.portfolio-modal').forEach(mod => {
    mod.addEventListener('click', (e) => {
      if (e.target === mod || e.target.classList.contains('modal-close') || e.target.closest('.modal-close') || e.target.classList.contains('modal-close-btn')) {
        mod.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.portfolio-modal.active').forEach(mod => {
        mod.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

  /* --- Testimonial Carousel --- */
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;
  let autoplayTimer;

  function goToSlide(index) {
    if (!track) return;
    const totalSlides = track.children.length;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if (track && dots.length > 0) {
    startAutoplay();
  }

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Contact Form Handling --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';
        contactForm.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* --- Newsletter Form --- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const input = form.querySelector('input');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed!';
      input.value = '';

      setTimeout(() => {
        btn.textContent = originalText;
      }, 3000);
    });
  });

  /* --- Back to Top Button --- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
