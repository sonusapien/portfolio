# Sonu — Personal Portfolio Website

A production-quality personal portfolio website for **Sonu**, built with clean, modern, lightweight vanilla HTML5, CSS3, and ES6+ JavaScript.

Designed with an editorial, magazine-inspired medical & technological aesthetic derived from the visual design reference, with Sonu's authentic personal and academic profile as the authoritative content source.

---

## 🎨 Visual Design System

The visual design system strictly follows the clean, minimal aesthetic:

- **Primary Blue**: `#267FA8`
- **Deep Blue**: `#17678F`
- **Sky Blue Containers**: `#E8F6FD`
- **Background**: Pure White `#FFFFFF`
- **Main Typography**: `#252B30`
- **Secondary Typography**: `#657783`
- **Typography Stack**: `Outfit` (display headings) & `Plus Jakarta Sans` (body and interface text)
- **Rounded Section Containers**: Organic rounded section transitions
- **Hero Composition**: Split typography ("SO" / "NU") framing Sonu's original portrait with floating 3D medical cross and pharmaceutical capsule badges.

---

## 🚀 Key Features

1. **Editorial Hero Section**:
   - High-impact split typography overlapping Sonu's portrait.
   - Floating 3D badges with subtle keyframe floating physics.
   - Professional subtitle and authentic tagline.
   - Direct call-to-action buttons.

2. **About Me**:
   - Clean white section with rounded lower corners.
   - Personal profile details: Name, Date of Birth (28 July 2006), Nationality (Indian), Residence (Badarpur, New Delhi, India).
   - "Bridging Healthcare & Technology" narrative.
   - Four core focus pillars: Healthcare, Medicine, Research, and Technology.

3. **Publications & Projects Area**:
   - Real-time client-side keyword search.
   - Category filtering pills (All Work, Software & Apps, Pharmacy & Science, Productivity Systems).
   - Dynamic counter badges on category tabs.
   - **Flagship Project**: **ONEVO (onevocontact)** — independently developed Android digital identity and smart contact-sharing application, featuring a custom smartphone mockup, official logo emblem, 6 core capability chips (Universal QR/vCard, ONEVO Nearby, NameLink, Granular Privacy, Explicit Approvals, Android Contacts export), and direct links to the official website (`https://sonusapien.github.io/onevocontact/`) and source code (`https://github.com/sonusapien/onevocontact`).
   - **Academic Ace Web** (`https://academicace-by-sonu-sapien-v1.netlify.app`), pharmaceutical formulation studies, and healthcare systems analysis.
   - Empty state with one-click filter reset.

4. **Academic Foundations (Education Dossiers)**:
   - 3 vertical book-cover style dossier cards:
     - **Bachelor of Pharmacy (B.Pharm)** — CBS College of Pharmacy & Technology (Pt. B.D. Sharma UHS, Rohtak)
     - **Completed 12th (Senior Secondary)** — CBSE Board
     - **Completed 10th (Secondary)** — CBSE Board

5. **Skills & Competencies**:
   - Two balanced panels: *Academic Focus* (Pharmaceutical Sciences, Formulations, Pharmacology, etc.) and *Interests & Additional Skills* (Web Development, Productivity Systems, Digital Tools).
   - Zero fabricated percentage bars.

6. **Achievements & Milestones**:
   - 3 clean white recognition cards covering undergraduate milestone, Academic Ace launch, and CBSE certifications.

7. **Contact Section**:
   - Direct `mailto:sonustudent2807@gmail.com` link.
   - Residence: Badarpur, New Delhi, India.
   - Sonu's portrait positioned inside an organic soft sky-blue curved frame on the right.

8. **Navigation & Performance**:
   - Sticky floating navigation bar with scroll state transition.
   - Active section highlight via `IntersectionObserver`.
   - Accessible mobile drawer menu with hamburger toggle.
   - Back-to-top floating button.
   - Smooth scroll with exact header offset compensation.
   - Strict adherence to `prefers-reduced-motion`.
   - Zero heavy external JavaScript dependencies or node build steps required.

---

## 📁 Project Structure

```
portfolio/
│
├── index.html                  # Main semantic HTML5 document
│
├── css/
│   ├── style.css               # Core styling, design tokens & layout
│   ├── responsive.css          # Breakpoints (Mobile, Tablet, Laptop, Desktop)
│   └── animations.css          # Keyframes, transitions & reduced-motion rules
│
├── js/
│   ├── main.js                 # Application bootstrap & accessibility
│   ├── navigation.js           # Sticky header, mobile menu, scrollspy
│   └── interactions.js         # Search, category filter, dynamic year
│
├── assets/
│   ├── images/
│   │   └── sonu-portrait.jpg   # Original high-resolution portrait
│   └── icons/
│       └── favicon.svg         # SVG favicon
│
└── README.md                   # Documentation & setup guide
```

---

## 💻 Local Testing & Preview

To preview the website locally without any installation:

```bash
# Using Python 3's built-in HTTP server:
python -m http.server 8080

# Then open in your browser:
http://localhost:8080
```

---

## 🌐 Deployment to Netlify or GitHub Pages

### Netlify:
1. Drag and drop the `portfolio` folder directly into [Netlify Drop](https://app.netlify.com/drop).
2. Or connect the Git repository — no build command or publish directory configuration is required (static root).

### GitHub Pages:
1. Push the code to a GitHub repository.
2. Go to **Settings > Pages > Branch**, select `main` (root) and save.
