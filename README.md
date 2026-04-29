# 🚀 Trainer Rahul's Pokédex Portfolio

A modern, Pokémon-themed portfolio showcasing my full-stack web development skills. Fully static, responsive, and packed with Pokémon references!

**🔗 Live Demo:** [https://rahul-meena01.github.io/mydex-portfolio/](https://rahul-meena01.github.io/mydex-portfolio/)

---

## 🌟 Features

- 🎨 Pokémon-inspired interactive UI: Framed as a Pokédex Entry
- 📧 Contact form powered by Formspree
- ❤️ localStorage-based Like counter
- 📱 Fully responsive & mobile-first (CSS Grid, Flexbox)
- 📊 Type-Chart structured Skills section
- 🎯 Pokédex Hero Section with scanning animations
- 🖨️ Print-friendly resume section
- 🔍 SEO & social sharing optimized (Open Graph meta tags)
- ⚡ Performance optimized (lazy loading, async decoding, deferred scripts)
- 🎮 Hidden Pokéball Easter Egg!

---

## 🛠️ Tech Stack

This project is **100% Static** (Vanilla Web Technologies) with no backend required, making it incredibly fast and free to host anywhere.

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling, CSS Grid, animations, variables
- **JavaScript (ES6+)** - Vanilla JS, DOM manipulation, localStorage

### Third-Party Integrations
- **Formspree** - Serverless contact form handling
- **Canvas-Confetti** - Easter egg animations
- **Google Fonts** - *Press Start 2P* and *Inter*
- **FontAwesome** - Vector icons

---

## 🚀 Quick Start

Since this project has zero backend dependencies, setting it up is incredibly simple.

### 1. Clone the Repository
```bash
git clone https://github.com/Rahul-Meena01/mydex-portfolio.git
cd mydex-portfolio
```

### 2. Configure Formspree (Contact Form)
To make the contact form work:
1. Go to [Formspree](https://formspree.io/) and create a free account.
2. Create a new form and copy your unique Form ID.
3. Open `docs/js/config.js`
4. Replace `xyzformid` with your actual Formspree ID:
   ```javascript
   const CONFIG = {
     FORMSPREE_URL: "https://formspree.io/f/YOUR_FORM_ID",
     // ...
   };
   ```

### 3. Run Locally
You can use any local web server. Here are a few options:

**Using VS Code Live Server:**
- Right-click `docs/index.html` → "Open with Live Server"

**Using Node.js (npx):**
```bash
npx http-server docs -p 3000
```

**Using Python:**
```bash
cd docs
python -m http.server 3000
```

The site will be available at `http://localhost:3000`

---

## 🌐 Deployment (GitHub Pages)

Deploying is natively supported via GitHub Pages since the code lives in the `/docs` folder.

1. Commit and push your changes to the `main` branch.
2. Go to your GitHub repository **Settings** → **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/docs`
4. Click **Save**.
5. Your portfolio is now live!

---

## 📂 Project Structure

```text
mydex-portfolio/
├── docs/                   # Frontend application (Served by GitHub Pages)
│   ├── index.html          # Main HTML file (Pokédex layout)
│   ├── css/
│   │   └── styles.css      # All styles, grid layouts, animations
│   ├── js/
│   │   ├── config.js       # Configuration (Formspree URL, feature flags)
│   │   └── script.js       # Main application logic (Rendering, events, easter eggs)
│   └── assets/
│       └── images/         # Project screenshots and assets
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 📞 Contact & Support

- **GitHub:** [@Rahul-Meena01](https://github.com/Rahul-Meena01)
- **LinkedIn:** [rahul-meena-m3401](https://linkedin.com/in/rahul-meena-m3401)
- **Instagram:** [@why______dude](https://instagram.com/why______dude)

---

## 📄 License

MIT License — Free to use and adapt for your own portfolio. Make sure to replace my details and projects with your own!

---

**Made with ❤️ by Rahul Meena**

⭐ If you like this project, give it a star!
