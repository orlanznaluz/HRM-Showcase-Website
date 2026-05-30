# 🎓 HRM Interactive Showcase

> **Shape the Future of Work with Human Resource Management**

A modern, interactive web showcase for the BSBA-HRDM program at Pamantasang Lungsod ng Valenzuela (PLV). Built to inspire students, demonstrate career pathways, and provide comprehensive HR learning resources.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-hrm--future.vercel.app-16a34a?style=for-the-badge&logo=vercel)](https://hrm-future.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-HRM--Showcase--Website-181717?style=for-the-badge&logo=github)](https://github.com/orlanznaluz/HRM-Showcase-Website)

---

## ✨ Features

### 🏠 Landing Page (`index.html`)
- **3D Hero Carousel** — Rotating portrait gallery of HR professionals using CSS 3D transforms
- **Sticky Navigation** — Glassmorphism nav with smooth scroll, mobile menu, and dark mode toggle
- **Career Paths Carousel** — Horizontally scrollable cards showcasing 6 HR specializations
- **Student Stories** — Auto-scrolling testimonial carousel with 9 student profiles
- **What You'll Learn** — Interactive accordion cards linking to detailed learning notes
- **Training Programs** — Curated external resources with hover-reveal visit buttons
- **Future Trends** — Numbered trend cards highlighting emerging HR technologies
- **Recruitment Tips** — 3D FlipBook viewer + single-page viewer for comic-style career guides
- **Student Guides** — Interactive tri-fold brochure viewer with 3 downloadable PDFs
- **Industry Map** — Google Maps integration showing 20+ food manufacturing companies in Valenzuela
- **Company Marquee** — Infinite scrolling marquee of partner firms

### 📚 Learning Notes (`learning-notes.html`)
- **Animated Hero** — Particle system with floating elements
- **Sticky Table of Contents** — Active section highlighting with smooth scroll
- **4 Core Modules:**
  1. **Recruitment & Selection** — Localized sourcing, screening, multi-tiered evaluation, medical clearance
  2. **Training & Development** — 70-20-10 rule, micro-learning, impact tracking
  3. **Salary, Wages & Benefits** — Philippine labor law, premium pay, statutory benefits
  4. **Administrative & Human Relations** — HRIS automation, SOPs, compliance, wellness programs
- **Compensation Calculator** — Interactive calculator for daily earnings with Philippine labor law multipliers
- **Reading Progress Bar** — Visual scroll indicator
- **Back to Top Button** — Appears after scrolling 500px

### 🎨 Design System
- **Light/Dark Mode** — Warm glassmorphism dark mode with orange accent palette
- **Green-Blue-Yellow Color Distribution** — Primary (green), secondary (blue), highlight (yellow)
- **Responsive Design** — Mobile-first with breakpoints at 768px and 480px
- **Scroll Reveal Animations** — Intersection Observer-based entrance animations
- **Lucide Icons** — Consistent iconography throughout

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup |
| **Tailwind CSS (CDN)** | Utility-first styling |
| **Vanilla CSS** | Custom components & animations |
| **Vanilla JavaScript** | Interactivity, carousels, calculators |
| **Google Maps API** | Interactive company location map |
| **Vercel** | Deployment & hosting |

---

## 📁 Project Structure

```
HRM-Showcase-Website/
├── index.html              # Main landing page
├── learning-notes.html     # Comprehensive HR learning notes
├── styles.css              # Main stylesheet (light/dark mode, components)
├── learning.css            # Learning notes specific styles
├── scripts.js              # Main JavaScript (carousels, map, flipbook, etc.)
├── learning.js             # Learning notes JavaScript (calculator, TOC, etc.)
├── vercel.json             # Vercel deployment config
│
├── comics/                 # Recruitment comic pages (0.png - 9.png)
├── picture-carousel/       # Hero 3D carousel images (p1.png - p9.png)
├── researchers/            # Student profile photos
├── studentguide/           # Student guide brochure images (b0.png - b4.png)
├── workersguide/           # Workers guide brochure images (w0.png - w4.png)
├── hrguide/                # HR guide brochure images (h0.png - h4.png)
│
├── HR-excellence.pdf       # Downloadable: HR Excellence Guide
├── student-guide.pdf       # Downloadable: Student Guide
├── workers-guide.pdf       # Downloadable: Workers Guide
├── Comics.pdf              # Downloadable: Recruitment Comics
└── browser-icon.svg        # Site favicon/logo
```

---

## 🛠️ Local Development

### Prerequisites
- A modern web browser
- A local server (recommended for proper module loading)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/orlanznaluz/HRM-Showcase-Website.git
cd HRM-Showcase-Website

# Start a local server (choose one)
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve .

# PHP
php -S localhost:8000

# Open in browser
open http://localhost:8000
```

> **Note:** The Google Maps feature requires an internet connection and a valid API key.

---

## 🌐 Deployment

This project is optimized for **Vercel** deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

The `vercel.json` configuration handles SPA routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "cleanUrls": true
}
```

---

## 🎯 Key Components

### 3D FlipBook Viewer
Interactive CSS 3D flipbook for comic-style recruitment guides. Supports:
- Click-to-flip page turning
- Flipbook vs. Single Page view toggle
- Keyboard navigation (Arrow keys)
- Thumbnail quick navigation

### Compensation Calculator
Philippine labor law-based earnings calculator featuring:
- Hourly rate input
- Day type selection (Ordinary, Rest, Special Holiday, Regular Holiday)
- Overtime & Night Shift Differential toggles
- Real-time breakdown with premium calculations
- Effective rate & multiplier display

### Tri-Fold Brochure
Interactive 3-panel brochure viewer with:
- Click-to-unfold animation (3 states: closed → half → open)
- 3 brochure variants (Food Industry, Manufacturing, HR Career)
- Selector toggle for switching between brochures

### Interactive Map
Google Maps integration showing:
- PLV location (green marker)
- 20+ food manufacturing companies
- Clickable info windows with company details
- Auto-fitted bounds for optimal view

---

## 📝 Content Overview

### Learning Modules
| Module | Topics Covered |
|--------|---------------|
| **Recruitment** | PESO sourcing, resume triage, competency interviews, technical assessments, medical clearance |
| **Training** | Goal alignment, skills gap analysis, micro-learning, 70-20-10 rule, Kirkpatrick evaluation |
| **Compensation** | Minimum wage, premium pay, SSS/PhilHealth/Pag-IBIG, 13th-month pay, specialized leaves |
| **Admin & HR** | HRIS automation, SOPs, compliance audits, active listening, manager upskilling, wellness programs |

### Philippine Labor Law References
- Republic Act No. 6727 (Wage Rationalization Act)
- RA 11210 (Expanded Maternity Leave)
- RA 8187 (Paternity Leave)
- RA 8972 (Solo Parents' Welfare)
- RA 9262 (Anti-Violence Against Women)

---

## 🎨 Customization

### Changing the Accent Color
Edit the CSS variables in `styles.css`:
```css
:root {
  --accent: #16a34a;        /* Primary green */
  --accent-warm: #2563eb;   /* Secondary blue */
}
```

### Adding New Career Cards
Add a new `.career-card` div inside `#career-track` in `index.html`.

### Adding New Student Stories
Add a new `.id-card` div inside `#stories-track` in `index.html`.

### Updating Map Locations
Modify the `companies` array in the `initFoodMap` function in `index.html`.

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

---

## 🤝 Contributing

This is a student showcase project. Contributions, suggestions, and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

<p align="center">
  <strong>Built with 💚 by Jon Orlanz Naluz</strong><br>
  <em>An Aspiring Developer</em>
</p>
