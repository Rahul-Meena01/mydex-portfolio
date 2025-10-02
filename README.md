# 🚀 Trainer Rahul's Pokédex Portfolio

## 🌐 Live Demo

**🔗 View Live Portfolio:** [https://rahul-meena01.github.io/mydex-portfolio/](https://rahul-meena01.github.io/mydex-portfolio/)

[![Portfolio Screenshot](ss/portfo.png)](https://rahul-meena01.github.io/mydex-portfolio/)

*Click the image above to visit the live portfolio!*

---

## 📖 About This Portfolio

An interactive Pokémon-themed portfolio showcasing my projects, skills, and achievements with smooth animations and full accessibility support. Built with pure HTML, CSS, and JavaScript.

### ✨ Key Features

- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **Smooth Animations** - Professional transitions and effects
- ✅ **Keyboard Navigation** - Fully accessible for all users
- ✅ **Modal Dialogs** - Detailed project and badge views
- ✅ **Skill Bars** - Animated progress indicators
- ✅ **Floating Particles** - Beautiful decorative background
- ✅ **Easter Egg** - Hidden Konami code feature (↑↑↓↓←→←→BA)
- ✅ **Print Friendly** - Resume section optimized for printing
- ✅ **SEO Optimized** - Ready for search engines
- ✅ **Social Sharing** - Open Graph meta tags included

---

## 🎯 How to Use

### Opening the Portfolio Locally
1. Clone this repository or download the files
2. Open `index.html` in any modern web browser
3. Navigate through different sections using the top navigation buttons

### Navigation
- **Trainer Card** - Profile and basic information
- **Projects** - Portfolio of projects with details
- **Badges** - Achievements and certifications
- **Moves List** - Technical skills organized by category
- **Skills** - Visual representation of skill levels
- **Resume** - Education and experience

### Interactive Features
- Click any project card to see detailed information
- Click any badge to view achievement details
- Press **ESC** to close modals
- Click outside modals to close them
- Try the **Konami Code** for a surprise! (↑↑↓↓←→←→BA)

---

## 🔧 Customization Guide

### 1. Update Personal Information

In `index.html`, find the trainer card section:
```html
<h2 class="trainer-name-enhanced">Rahul</h2>
<p class="trainer-title-enhanced">Full-Stack Web Developer</p>
```

### 2. Update Social Links

In `index.html`, update your social media links:
```html
<a href="https://github.com/YOUR-USERNAME" target="_blank" ...>
<a href="https://linkedin.com/in/YOUR-PROFILE" target="_blank" ...>
```

### 3. Add/Edit Projects

In `script.js`, modify the `portfolioData.projects` array:
```javascript
projects: [
    {
        id: 1,
        number: "#001",
        name: "Your Project Name",
        description: "Project description...",
        image: "ss/your-image.png",
        // ... other properties
    }
]
```

### 4. Update Skills

In `script.js`, modify the `portfolioData.skills` object:
```javascript
skills: {
    frontend: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        // Add more skills...
    ]
}
```

### 5. Change Theme Colors

In `styles.css`, modify the CSS variables:
```css
:root {
    --pokedex-red: #e3350d;
    --pokedex-blue: #30a7d7;
    --pokedex-yellow: #f7d02c;
    /* Change these to your preferred colors */
}
```

---

## 📸 Adding Project Screenshots

1. Place your screenshots in the `ss/` folder
2. Reference them in `script.js`:
```javascript
image: "ss/your-project-screenshot.png"
```

**Image Recommendations:**
- Size: 600x400px or similar ratio
- Format: PNG or JPG
- Keep file size under 500KB

---

## 🌐 Deployment

### GitHub Pages (Free & Easy)

1. Push your code to GitHub
2. Go to repository **Settings** → **Pages**
3. Select **main** branch as source
4. Click **Save**
5. Your site will be live at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

### Alternative Hosting Options

- **Netlify**: Drag and drop deployment
- **Vercel**: One-click deployment
- **Surge**: Simple command-line deployment

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

---

## 📁 Project Structure

```
mydex-portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── ss/                 # Screenshots folder
    ├── portfo.png
    ├── timexonebuddy.png
    ├── LifrAndDeath.png
    ├── website.png
    ├── login.png
    ├── TikTakToe.png
    └── bubbly.png
```

---

## 🧪 Testing

Before deploying, make sure to:

- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check for console errors (F12)
- [ ] Test keyboard navigation
- [ ] Verify images load correctly
- [ ] Test all interactive features
- [ ] Validate HTML/CSS at [W3C Validator](https://validator.w3.org/)

---

## 🎨 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

---

## 📝 License

This project is open source and available for personal and educational use.

---

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

## 📞 Contact

- **GitHub**: [@Rahul-Meena01](https://github.com/Rahul-Meena01)
- **LinkedIn**: [Rahul Meena](https://linkedin.com/in/rahul-meena-m3401)
- **Instagram**: [@why______dude](https://instagram.com/why______dude)

---

## 🎉 Acknowledgments

Inspired by the Pokémon franchise and modern web design trends. Built with passion for creating engaging user experiences.

---

**⭐ If you like this portfolio, please give it a star!**

---

**Last Updated:** October 2, 2025  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
