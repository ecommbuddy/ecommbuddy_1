# ecommBuddy

Your end-to-end ecommerce growth partner — from stunning websites to SEO, ads, and beyond.

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library for data visualization
- **React Hook Form** - Form state management
- **React Scroll** - Smooth scrolling navigation
- **Lucide React** - Icon library
- **Headless UI** - Accessible UI components

## 📁 Project Structure

```
ecombudy/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── FreeAudit.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── AnimatedSection.jsx
│   │       ├── Button.jsx
│   │       ├── ServiceCard.jsx
│   │       └── TeamCard.jsx
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── data/
│   │   ├── services.js
│   │   ├── team.js
│   │   └── stats.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## 🛠️ Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎨 Design System

- **Primary Color:** `#000000` (Black)
- **Secondary Color:** `#FFFFFF` (White)
- **Font Family:** Inter (weights: 300-900)
- **Style:** Gen Z / Modern Professional (GoDaddy-inspired)

## 📱 Features

- ✅ Fully responsive design (mobile-first)
- ✅ Smooth scroll navigation
- ✅ Animated sections on scroll
- ✅ Interactive charts (Line & Pie)
- ✅ Contact form with validation
- ✅ Free audit request form
- ✅ Scroll progress indicator
- ✅ Back-to-top button
- ✅ Lazy loading for performance
- ✅ SEO-friendly structure

## 🌐 Deployment

The project is configured for deployment on platforms like Vercel, Netlify, or any static hosting service.

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will automatically detect Vite and configure build settings

### Netlify Deployment

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📝 License

All rights reserved © 2025 ecommBuddy

---

Made with ❤️ in India
