
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
    

    // ===== COMPENSATION CALCULATOR =====
    (function() {
      const hourlyRateInput = document.getElementById('hourlyRate');
      const hoursWorkedInput = document.getElementById('hoursWorked');
      const otHoursInput = document.getElementById('otHours');
      const otHoursField = document.getElementById('otHoursField');
      const dayTypeCheckboxes = document.querySelectorAll('input[name="dayType"]');
      const overtimeCheckbox = document.querySelector('input[name="overtime"]');
      const nightshiftCheckbox = document.querySelector('input[name="nightshift"]');

      const resBase = document.getElementById('resBase');
      const resDayPremium = document.getElementById('resDayPremium');
      const resOtPremium = document.getElementById('resOtPremium');
      const resNsPremium = document.getElementById('resNsPremium');
      const resTotal = document.getElementById('resTotal');
      const resultFormula = document.getElementById('resultFormula');
      const effRate = document.getElementById('effRate');
      const effMultiplier = document.getElementById('effMultiplier');

      const rowDayPremium = document.getElementById('rowDayPremium');
      const rowOtPremium = document.getElementById('rowOtPremium');
      const rowNsPremium = document.getElementById('rowNsPremium');

      // Day type multipliers (Philippine labor law)
      const dayMultipliers = {
        ordinary: 1.0,
        rest: 1.3,
        special: 1.3,
        regular: 2.0
      };

      // OT multipliers on top of day rate
      const otMultipliers = {
        ordinary: 1.25,
        rest: 1.69,
        special: 1.69,
        regular: 2.6
      };

      function getSelectedDayType() {
        let selected = 'ordinary';
        dayTypeCheckboxes.forEach(cb => {
          if (cb.checked) selected = cb.value;
        });
        return selected;
      }

      function formatCurrency(num) {
        return '₱' + num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      function updateCheckboxStyles() {
        document.querySelectorAll('.checkbox-card').forEach(card => {
          const cb = card.querySelector('input[type="checkbox"]');
          if (cb.checked) {
            card.classList.add('checked');
          } else {
            card.classList.remove('checked');
          }
        });
      }

      function calculate() {
        const rate = parseFloat(hourlyRateInput.value) || 0;
        const hours = parseFloat(hoursWorkedInput.value) || 0;
        const otHours = parseFloat(otHoursInput.value) || 0;
        const dayType = getSelectedDayType();
        const hasOvertime = overtimeCheckbox && overtimeCheckbox.checked;
        const hasNightshift = nightshiftCheckbox && nightshiftCheckbox.checked;

        const dayMult = dayMultipliers[dayType];
        const otMult = otMultipliers[dayType];

        // Base pay = hourly rate * hours worked * day multiplier
        const basePay = rate * hours * dayMult;

        // Day premium = basePay - (rate * hours)  [the extra from day type]
        const dayPremium = basePay - (rate * hours);

        // OT pay = hourly rate * OT hours * OT multiplier
        const otPay = hasOvertime ? (rate * otHours * otMult) : 0;
        // OT premium = otPay - (rate * otHours)  [the extra from OT]
        const otPremium = hasOvertime ? (rate * otHours * (otMult - 1)) : 0;

        // Night shift premium = 10% of total pay (base + OT) if night shift
        const totalHours = hours + (hasOvertime ? otHours : 0);
        const nsPremium = hasNightshift ? (rate * totalHours * 0.10 * dayMult) : 0;

        const total = basePay + otPay + nsPremium;

        // Update UI
        resBase.textContent = formatCurrency(basePay);

        if (dayPremium > 0.01) {
          rowDayPremium.style.display = 'flex';
          resDayPremium.textContent = '+' + formatCurrency(dayPremium);
        } else {
          rowDayPremium.style.display = 'none';
        }

        if (otPremium > 0.01) {
          rowOtPremium.style.display = 'flex';
          resOtPremium.textContent = '+' + formatCurrency(otPremium);
        } else {
          rowOtPremium.style.display = 'none';
        }

        if (nsPremium > 0.01) {
          rowNsPremium.style.display = 'flex';
          resNsPremium.textContent = '+' + formatCurrency(nsPremium);
        } else {
          rowNsPremium.style.display = 'none';
        }

        resTotal.textContent = formatCurrency(total);

        // Effective rate display
        const effectiveMult = dayMult + (hasOvertime && otHours > 0 ? ((otMult - 1) * (otHours / totalHours)) : 0) + (hasNightshift ? 0.10 : 0);
        effRate.textContent = Math.round(effectiveMult * 100) + '%';
        effMultiplier.textContent = '×' + effectiveMult.toFixed(2);

        // Formula text
        if (rate <= 0) {
          resultFormula.textContent = 'Enter your hourly rate to see the calculation.';
        } else {
          let formula = '';
          const dayLabel = dayType.charAt(0).toUpperCase() + dayType.slice(1) + ' Day';
          formula = dayLabel + ' (' + Math.round(dayMult * 100) + '%)';
          if (hasOvertime && otHours > 0) {
            formula += ' + OT (' + Math.round(otMult * 100) + '%)';
          }
          if (hasNightshift) {
            formula += ' + Night Shift (+10%)';
          }
          resultFormula.textContent = formula;
        }
      }

      // Day type: only one can be selected (radio-like behavior)
      dayTypeCheckboxes.forEach(cb => {
        cb.addEventListener('change', function() {
          if (this.checked) {
            dayTypeCheckboxes.forEach(other => {
              if (other !== this) other.checked = false;
            });
          } else {
            const anyChecked = Array.from(dayTypeCheckboxes).some(c => c.checked);
            if (!anyChecked) {
              document.querySelector('input[value="ordinary"]').checked = true;
            }
          }
          updateCheckboxStyles();
          calculate();
        });
      });

      // Show/hide OT hours field
      if (overtimeCheckbox) {
        overtimeCheckbox.addEventListener('change', function() {
          otHoursField.style.display = this.checked ? 'flex' : 'none';
          if (this.checked) {
            otHoursInput.value = otHoursInput.value || '2';
          }
          updateCheckboxStyles();
          calculate();
        });
      }

      if (nightshiftCheckbox) {
        nightshiftCheckbox.addEventListener('change', function() {
          updateCheckboxStyles();
          calculate();
        });
      }

      // Input listeners
      hourlyRateInput.addEventListener('input', calculate);
      hoursWorkedInput.addEventListener('input', calculate);
      otHoursInput.addEventListener('input', calculate);

      // Initial styles and calc
      updateCheckboxStyles();
      calculate();
    })();

  })();