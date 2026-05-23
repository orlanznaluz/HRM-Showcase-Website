/* ============================================
   HRM Interactive Showcase — Scripts
   ============================================ */

(function() {
  'use strict';

  // ---- Carousel State ----
  const carouselState = {};
  const carouselConfig = {
    'career-track':  { dotsId: 'career-dots',  count: 6, autoScroll: false },
    'stories-track': { dotsId: 'stories-dots', count: 9, autoScroll: true, interval: 6000 }
  };
  let autoScrollIntervals = {};
  let isPaused = {};

  // ---- Initialize on DOM Ready ----
  document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initScrollReveal();
    initLucideIcons();
    initSmoothScroll();
    initHeroParallax();
  });

  // ---- Lucide Icons ----
  function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // ---- Carousels ----
  function initCarousels() {
    Object.entries(carouselConfig).forEach(([trackId, config]) => {
      const track = document.getElementById(trackId);
      const dotsContainer = document.getElementById(config.dotsId);
      if (!track || !dotsContainer) return;

      // Build dots
      for (let i = 0; i < config.count; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot' + (trackId === 'stories-track' ? ' light' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(trackId, i));
        dotsContainer.appendChild(dot);
      }

      carouselState[trackId] = 0;

      // Touch / swipe support
      let startX = 0;
      let isDragging = false;

      track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        pauseAutoScroll(trackId);
      }, { passive: true });

      track.addEventListener('touchmove', () => {
        if (!isDragging) return;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - e.changedTouches[0].clientX;
        const cardWidth = track.children[0]?.offsetWidth + 24 || 344;
        const maxOffset = Math.max(0, track.scrollWidth - track.parentElement.offsetWidth);

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            // Swipe left -> next
            const next = Math.min(carouselState[trackId] + cardWidth, maxOffset);
            carouselState[trackId] = next;
          } else {
            // Swipe right -> prev
            const prev = Math.max(carouselState[trackId] - cardWidth, 0);
            carouselState[trackId] = prev;
          }
          track.style.transform = `translateX(-${carouselState[trackId]}px)`;
          updateDots(trackId, Math.round(carouselState[trackId] / cardWidth));
        }
        resumeAutoScroll(trackId);
      }, { passive: true });

      // Hover pause
      track.parentElement.addEventListener('mouseenter', () => pauseAutoScroll(trackId));
      track.parentElement.addEventListener('mouseleave', () => resumeAutoScroll(trackId));

      if (config.autoScroll) setupAutoScroll(trackId);
    });
  }

  function setupAutoScroll(trackId) {
    const config = carouselConfig[trackId];
    autoScrollIntervals[trackId] = setInterval(() => {
      if (isPaused[trackId]) return;
      const track = document.getElementById(trackId);
      if (!track || !track.children[0]) return;
      const cardWidth = track.children[0].offsetWidth + 24;
      const maxOffset = Math.max(0, track.scrollWidth - track.parentElement.offsetWidth);

      if (carouselState[trackId] >= maxOffset - 10) {
        carouselState[trackId] = 0;
      } else {
        carouselState[trackId] = Math.min(carouselState[trackId] + cardWidth, maxOffset);
      }
      track.style.transform = `translateX(-${carouselState[trackId]}px)`;
      updateDots(trackId, Math.round(carouselState[trackId] / cardWidth));
    }, config.interval || 5000);
  }

  function pauseAutoScroll(trackId) {
    isPaused[trackId] = true;
  }

  function resumeAutoScroll(trackId) {
    isPaused[trackId] = false;
  }

  function goToSlide(trackId, slideIndex) {
    const track = document.getElementById(trackId);
    if (!track || !track.children[0]) return;
    const cardWidth = track.children[0].offsetWidth + 24;
    carouselState[trackId] = slideIndex * cardWidth;
    track.style.transform = `translateX(-${carouselState[trackId]}px)`;
    updateDots(trackId, slideIndex);
  }

  function updateDots(trackId, currentSlide) {
    const config = carouselConfig[trackId];
    const dotsContainer = document.getElementById(config.dotsId);
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // ---- Scroll Reveal Animation ----
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ---- Smooth Scroll for Anchor Links ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---- Hero Parallax ----
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const shapes = hero.querySelectorAll('.hero-shape');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = hero.offsetHeight;
          const progress = Math.min(scrollY / heroHeight, 1);

          shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.15;
            shape.style.transform = `translateY(${scrollY * speed}px) scale(${1 - progress * 0.1})`;
          });

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Counter Animation ----
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 2000;
          const start = performance.now();

          function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }



})();


/* ============================================
   Learn Accordion — Hover Interaction
   ============================================ */

// Mobile tap support for accordion cards
document.addEventListener('DOMContentLoaded', () => {
  const accordion = document.querySelector('.learn-accordion');
  if (!accordion) return;

  const options = accordion.querySelectorAll('.learn-option');

  // For mobile: tap to expand, tap again to collapse
  options.forEach(option => {
    option.addEventListener('touchstart', (e) => {
      // On mobile, we rely on CSS hover via the parent :hover
      // But we can add a class for better mobile support
      options.forEach(opt => opt.classList.remove('mobile-active'));
      option.classList.add('mobile-active');
    }, { passive: true });
  });

  // Remove mobile-active when tapping outside
  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.learn-option')) {
      options.forEach(opt => opt.classList.remove('mobile-active'));
    }
  }, { passive: true });
});


/* ============================================
   Sticky Navigation — Scroll & Mobile Toggle
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('siteNav');
  const mobileToggle = document.getElementById('navMobileToggle');
  const mobileMenu = document.getElementById('navMobileMenu');

  // Scroll effect — add .scrolled class when scrolled past 50px
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      // Update icon
      const icon = mobileToggle.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('navThemeToggle');
  if (themeToggle) {
    // Check saved preference
    const savedTheme = localStorage.getItem('hrm-theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark-mode');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('hrm-theme', isDark ? 'dark' : 'light');
      // Re-render lucide icons to pick up color changes
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  // Smooth scroll for nav anchor links
  document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
});