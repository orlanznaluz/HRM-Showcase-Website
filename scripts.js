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
  let initialized = false;

  // ---- Initialize on DOM Ready OR when sections load ----
  function initAll() {
    if (initialized) return;
    initialized = true;

    initCarousels();
    initScrollReveal();
    initLucideIcons();
    initSmoothScroll();
    initHeroParallax();
    initCounterAnimation();
    initFlipBooks();
    initBrochure();
    initAccordionMobile();
    initStickyNav();
    initMapWithRetry();
  }

  // Try immediate init (for non-modular fallback)
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('career-track')) {
      initAll();
    }
  });

  // Listen for sectionsLoaded event from modular loader
  window.addEventListener('sectionsLoaded', () => {
    initAll();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
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
            const next = Math.min(carouselState[trackId] + cardWidth, maxOffset);
            carouselState[trackId] = next;
          } else {
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

    // ---- FlipBook & Single Page View ----
  function initFlipBooks() {
    const flipbookView = document.getElementById('flipbookView');
    const singlePageView = document.getElementById('singlePageView');
    if (!flipbookView && !singlePageView) return;

    // ===== FLIPBOOK VIEW =====
    const flipBooks = document.querySelectorAll('.flipbook');
    flipBooks.forEach((elBook) => {
      elBook.style.setProperty("--c", 0);

      const pages = elBook.querySelectorAll(".flip-page");
      pages.forEach((page, idx) => {
        page.style.setProperty("--i", idx);

        page.addEventListener("click", (evt) => {
          if (evt.target.closest("a")) return;
          const curr = evt.target.closest(".flip-back") ? idx : idx + 1;
          elBook.style.setProperty("--c", curr);
        });
      });
    });

    // ===== SINGLE PAGE VIEW =====
    const pages = [
      '0.png',
      '1.png',
      '2.png',
      '3.png',
      '4.png',
      '5.png',
      '6.png',
      '7.png',
      '8.png',
      '9.png'
    ];
    
    let currentPage = 0;
    const singlePageImg = document.getElementById('singlePageImg');
    const singlePageNum = document.getElementById('singlePageNum');
    const btnPrev = document.getElementById('singlePrev');
    const btnNext = document.getElementById('singleNext');
    const thumbnails = document.querySelectorAll('.thumb-btn');

    function updateSinglePage() {
      if (!singlePageImg) return;
      
      singlePageImg.src = pages[currentPage];
      singlePageNum.textContent = `${currentPage + 1} / ${pages.length}`;
      
      // Update nav buttons
      if (btnPrev) btnPrev.disabled = currentPage === 0;
      if (btnNext) btnNext.disabled = currentPage === pages.length - 1;
      
      // Update thumbnails
      thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentPage);
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentPage > 0) {
          currentPage--;
          updateSinglePage();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
          currentPage++;
          updateSinglePage();
        }
      });
    }

    // Thumbnail clicks
    thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        currentPage = parseInt(thumb.dataset.page, 10);
        updateSinglePage();
      });
    });

    // Keyboard navigation for single page view
    document.addEventListener('keydown', (e) => {
      if (singlePageView && !singlePageView.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft' && currentPage > 0) {
          currentPage--;
          updateSinglePage();
        } else if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
          currentPage++;
          updateSinglePage();
        }
      }
    });

    // Initialize single page state
    updateSinglePage();

    // ===== VIEW TOGGLE =====
    const btnFlipbook = document.getElementById('btnFlipbook');
    const btnSingle = document.getElementById('btnSingle');

    if (btnFlipbook && btnSingle) {
      btnFlipbook.addEventListener('click', () => {
        flipbookView.classList.remove('hidden');
        singlePageView.classList.add('hidden');
        btnFlipbook.classList.add('active');
        btnSingle.classList.remove('active');
        
        // Re-init lucide icons
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });

      btnSingle.addEventListener('click', () => {
        flipbookView.classList.add('hidden');
        singlePageView.classList.remove('hidden');
        btnSingle.classList.add('active');
        btnFlipbook.classList.remove('active');
        
        // Re-init lucide icons
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    }
  }

    // ---- Tri-Fold Brochure Interaction ----
  function initBrochure() {
    const container = document.getElementById('triFoldBrochure');
    if (!container) return;

    let state = 'closed'; // closed → half → open → closed

    container.addEventListener('click', () => {
      if (state === 'closed') {
        // First click: open right panel slightly
        container.classList.remove('open');
        container.classList.add('half');
        state = 'half';
      } else if (state === 'half') {
        // Second click: open both panels, reveal center
        container.classList.remove('half');
        container.classList.add('open');
        state = 'open';
      } else {
        // Third click: close everything
        container.classList.remove('open', 'half');
        state = 'closed';
      }
    });
  }

    // ---- Curriculum Accordion — Hover (Desktop) / Click (Mobile) ----
  function initAccordionMobile() {
    const accordion = document.getElementById('learnAccordion');
    if (!accordion) return;

    const options = accordion.querySelectorAll('.learn-option');
    let activeIndex = -1;

    // Detect if device supports hover
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Only add click handlers for touch/mobile devices
    if (!hasHover) {
      options.forEach((option, index) => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();

          // If clicking already active, close it
          if (activeIndex === index) {
            option.classList.remove('active');
            accordion.classList.remove('has-active');
            activeIndex = -1;
            return;
          }

          // Remove active from all
          options.forEach(opt => opt.classList.remove('active'));
          
          // Add active to clicked
          option.classList.add('active');
          accordion.classList.add('has-active');
          activeIndex = index;
        });
      });

      // Click outside to close
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#learnAccordion')) {
          options.forEach(opt => opt.classList.remove('active'));
          accordion.classList.remove('has-active');
          activeIndex = -1;
        }
      });
    }

    // Touch support for smoother mobile experience
    options.forEach((option) => {
      option.addEventListener('touchstart', (e) => {
        // Prevent default only if we're handling it as a tap
        if (!hasHover) {
          // Let the click handler above deal with it
        }
      }, { passive: true });
    });
  }

  // ---- Sticky Navigation ----
  function initStickyNav() {
    const nav = document.getElementById('siteNav');
    const mobileToggle = document.getElementById('navMobileToggle');
    const mobileMenu = document.getElementById('navMobileMenu');

    // Scroll effect
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
  }

  // ---- Google Maps Retry ----
  function initMapWithRetry() {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.log('Google Maps API not loaded yet, retrying in 500ms...');
      setTimeout(initMapWithRetry, 500);
      return;
    }

    const success = window.initFoodMap();
    
    if (!success) {
      console.log('Map container not ready, retrying in 300ms...');
      setTimeout(initMapWithRetry, 300);
    }
  }

})();