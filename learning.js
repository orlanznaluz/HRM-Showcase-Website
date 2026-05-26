
// ===== DARK MODE =====
(function() {
  const toggle = document.getElementById('navThemeToggle');
  if (!toggle) return;

  // Check for saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  toggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();

// ===== MOBILE MENU TOGGLE =====
(function() {
  const mobileToggle = document.getElementById('navMobileToggle');
  const mobileMenu = document.getElementById('navMobileMenu');
  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    const isOpen = mobileMenu.classList.contains('active');
    mobileToggle.innerHTML = isOpen
      ? '<i data-lucide="x" class="w-6 h-6"></i>'
      : '<i data-lucide="menu" class="w-6 h-6"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });
})();

// ===== NAV SCROLL EFFECT =====
(function() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
})();


// Initialize lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // ===== PARTICLE SYSTEM =====
    (function() {
      const container = document.getElementById('heroParticles');
      if (!container) return;
      const particleCount = 25;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
      }
    })();

    // ===== READING PROGRESS =====
    (function() {
      const progressBar = document.getElementById('readingProgress');
      if (!progressBar) return;
      window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
      });
    })();

    // ===== BACK TO TOP =====
    (function() {
      const btn = document.getElementById('backToTop');
      if (!btn) return;
      window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
      btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    })();

    // ===== SCROLL REVEAL =====
    (function() {
      const sections = document.querySelectorAll('.notes-section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      sections.forEach(section => observer.observe(section));
    })();

    // ===== TOC ACTIVE STATE =====
    (function() {
      const tocLinks = document.querySelectorAll('.notes-toc a');
      const sections = document.querySelectorAll('.notes-section');
      const toc = document.getElementById('notesToc');

      // Scroll effect on TOC
      window.addEventListener('scroll', function() {
        if (toc) {
          if (window.scrollY > 100) {
            toc.classList.add('scrolled');
          } else {
            toc.classList.remove('scrolled');
          }
        }
      });

      // Active section highlighting
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tocLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.notes-toc a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
          }
        });
      }, { threshold: 0.3 });
      sections.forEach(section => observer.observe(section));

      // Smooth scroll for TOC links
      tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            const offset = 140;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          }
        });
      });
    })();

    // ===== STRATEGY CARD HOVER EFFECT =====
    (function() {
      const cards = document.querySelectorAll('.strategy-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
      });
    })();

    // ===== TABLE ROW STAGGER ANIMATION =====
    (function() {
      const tables = document.querySelectorAll('.notes-section table');
      tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              rows.forEach((row, i) => {
                row.style.opacity = '0';
                row.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                  row.style.transition = 'all 0.4s ease';
                  row.style.opacity = '1';
                  row.style.transform = 'translateX(0)';
                }, i * 80);
              });
              observer.unobserve(table);
            }
          });
        }, { threshold: 0.2 });
        observer.observe(table);
      });
    })();