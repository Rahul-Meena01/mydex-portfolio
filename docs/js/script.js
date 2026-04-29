// Configuration - loaded from config.js
const API_BASE_URL = typeof CONFIG !== "undefined" ? CONFIG.API_BASE_URL : null;
const FORMSPREE_URL = typeof CONFIG !== "undefined" ? CONFIG.FORMSPREE_URL : "";

// Particles animation
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  const particleCount = CONFIG.UI ? CONFIG.UI.PARTICLES_COUNT : 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = posX + "%";
    particle.style.top = posY + "%";
    const size = Math.random() * 3 + 1;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = duration + "s";
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + "s";
    particlesContainer.appendChild(particle);
  }
}

// Portfolio data
const portfolioData = {
  projects: [
    {
      id: 1,
      number: "#001",
      name: "TimeZoneBuddy",
      shortDesc:
        "Visual timezone mapping & meeting overlap scheduling tool for remote teams.",
      image: "assets/images/ss/timexonebuddy.png",
      featured: true,
      complexity: 4,
      type: { name: "Web App", class: "water" },
      techStack: ["HTML", "CSS", "JavaScript"],
      demoLink: "https://rahul-meena01.github.io/TimeZoneBuddy/",
      githubLink: "https://github.com/Rahul-Meena01/TimeZoneBuddy",
    },
    {
      id: 2,
      number: "#002",
      name: "Life & Death Calculator",
      shortDesc:
        "Real-time life countdown and age calculation based on birth/death dates.",
      image: "assets/images/ss/LifrAndDeath.png",
      featured: false,
      complexity: 2,
      type: { name: "Tool", class: "grass" },
      techStack: ["HTML", "CSS", "JavaScript"],
      demoLink: "https://rahul-meena01.github.io/birth-and-death-calculator/",
      githubLink: "https://github.com/Rahul-Meena01/birth-and-death-calculator",
    },
    {
      id: 3,
      number: "#003",
      name: "E-Commerce Website",
      shortDesc:
        "Full-stack e-commerce platform with product catalog and modern UI.",
      image: "assets/images/ss/website.png",
      featured: true,
      complexity: 5,
      type: { name: "Web App", class: "fire" },
      techStack: ["HTML", "CSS", "JavaScript", "Collab"],
      demoLink: "",
      githubLink: "https://github.com/Rahul-Meena01/my-web-project",
    },
    {
      id: 4,
      number: "#004",
      name: "E-Commerce Login",
      shortDesc: "Glassmorphism responsive login page for Shopper e-commerce.",
      image: "assets/images/ss/login.png",
      featured: false,
      complexity: 3,
      type: { name: "UI", class: "psychic" },
      techStack: ["HTML", "CSS", "JavaScript"],
      demoLink: "",
      githubLink: "https://github.com/Rahul-Meena01/ecommerce-login",
    },
    {
      id: 5,
      number: "#005",
      name: "Tic-Tac-Toe Game",
      shortDesc:
        "Classic game with interactive gameplay, win detection and score tracking.",
      image: "assets/images/ss/TikTakToe.png",
      featured: false,
      complexity: 3,
      type: { name: "Game", class: "electric" },
      techStack: ["HTML", "CSS", "JavaScript"],
      demoLink: "https://rahul-meena01.github.io/New-Tic-Tac-Toe/",
      githubLink: "https://github.com/Rahul-Meena01/New-Tic-Tac-Toe",
    },
    {
      id: 6,
      number: "#006",
      name: "Bubbly Game",
      shortDesc:
        "Interactive bubble-popping game showcasing DOM manipulation & events.",
      image: "assets/images/ss/bubbly.png",
      featured: false,
      complexity: 4,
      type: { name: "Game", class: "psychic" },
      techStack: ["HTML", "CSS", "JavaScript"],
      demoLink: "https://rahul-meena01.github.io/bubbly/",
      githubLink: "https://github.com/Rahul-Meena01/bubbly",
    },
    {
      id: 7,
      number: "#007",
      name: "AfterMe",
      shortDesc:
        "Secure digital estate planner for organizing passwords, assets & final messages.",
      image: "assets/images/ss/afterme.png",
      featured: true,
      complexity: 5,
      type: { name: "Security", class: "electric" },
      techStack: ["TypeScript", "React", "Vercel"],
      demoLink: "https://after-me-woad.vercel.app",
      githubLink: "https://github.com/Rahul-Meena01/AfterMe",
    },
    {
      id: 8,
      number: "#008",
      name: "Vyqora",
      shortDesc:
        "Smart personal finance dashboard with AI-powered insights & analytics.",
      image: "assets/images/ss/vyqora.png",
      featured: true,
      complexity: 4,
      type: { name: "Finance", class: "water" },
      techStack: ["JavaScript", "React", "Analytics"],
      demoLink: "https://rahul-meena01.github.io/Vyqora/",
      githubLink: "https://github.com/Rahul-Meena01/Vyqora",
    },
    {
      id: 9,
      number: "#009",
      name: "KnowledgeOS",
      shortDesc:
        "Offline-first personal knowledge management with wikilinks & graph views.",
      image: "assets/images/ss/knowledgeos.png",
      featured: true,
      complexity: 5,
      type: { name: "Productivity", class: "grass" },
      techStack: ["React", "TypeScript", "Local Storage"],
      demoLink: "https://rahul-meena01.github.io/KnowledgeOS/",
      githubLink: "https://github.com/Rahul-Meena01/KnowledgeOS",
    },
    {
      id: 10,
      number: "#010",
      name: "HoloBoard",
      shortDesc:
        "Futuristic collaborative whiteboard with real-time PeerJS collaboration.",
      image: "assets/images/ss/holoboard.png",
      featured: true,
      complexity: 5,
      type: { name: "Collaboration", class: "psychic" },
      techStack: ["React", "JavaScript", "Canvas", "PeerJS"],
      demoLink: "https://rahul-meena01.github.io/holoboard/",
      githubLink: "https://github.com/Rahul-Meena01/holoboard",
    },
  ],
  skills: {
    fire: {
      category: "Core / Passionate",
      color: "#EE8130",
      icon: "🔥",
      items: [
        "React.js",
        "Node.js",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "Tailwind CSS",
      ],
    },
    water: {
      category: "Adaptable",
      color: "#6390F0",
      icon: "💧",
      items: ["REST APIs", "MongoDB", "SQL", "Express.js", "Firebase"],
    },
    electric: {
      category: "Fast / Modern",
      color: "#F7D02C",
      icon: "⚡",
      items: [
        "Git",
        "GitHub",
        "VS Code",
        "Postman",
        "Docker",
        "Netlify",
        "Vercel",
        "Figma",
      ],
    },
    psychic: {
      category: "Problem Solving",
      color: "#F95587",
      icon: "🔮",
      items: [
        "Algorithms",
        "System Design",
        "Debugging",
        "Architecture",
        "Agile",
        "Team Collab",
      ],
    },
  },
  education: [
    {
      title: "Bachelor of Computer Applications (BCA)",
      subtitle: "JE CRC University",
      date: "2023 – 2026",
      description:
        "Currently pursuing degree with focus on software development, database management, and web technologies.",
    },
    {
      title: "Senior Secondary (XII), Science",
      subtitle: "RBSC – Sant Narayan Senior Secondary School",
      date: "2021 – 2023 | 87%",
      description:
        "Completed senior secondary education with focus on Physics, Chemistry, and Mathematics.",
    },
  ],
  experience: [
    {
      title: "Freelance Web Developer",
      subtitle: "Self-Employed",
      date: "2022 – Present",
      description:
        "Developed and maintained websites for various clients, implemented responsive designs, and integrated third-party APIs.",
    },
    {
      title: "Web Development Intern",
      subtitle: "Tech Solutions Inc.",
      date: "Summer 2022",
      description:
        "Assisted in developing web applications, performed code reviews, and collaborated with senior developers on project features.",
    },
  ],
};

// DOM Elements
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

// Navigation
navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const targetSection = button.getAttribute("data-section");
    navButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    sections.forEach(function (section) {
      section.classList.remove("active");
      if (section.id === targetSection) section.classList.add("active");
    });
  });
});

// Render Projects
function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) return;
  projectsGrid.innerHTML = "";

  portfolioData.projects.forEach(function (project) {
    const diffColor =
      project.complexity >= 4
        ? "#e74c3c"
        : project.complexity === 3
          ? "#f1c40f"
          : "#4caf50";
    const diffWidth = (project.complexity / 5) * 100;

    const card = document.createElement("div");
    card.className = "project-card " + (project.featured ? "featured" : "");
    card.innerHTML =
      '<div class="project-card-inner">' +
      '<div class="project-number">' +
      project.number +
      "</div>" +
      '<h3 class="project-name">' +
      project.name +
      "</h3>" +
      '<div class="catch-difficulty" title="Complexity: ' +
      project.complexity +
      '/5"><div class="catch-bar" style="width: ' +
      diffWidth +
      "%; background-color: " +
      diffColor +
      ';"></div></div>' +
      '<div class="project-image"><img src="' +
      project.image +
      '" alt="' +
      project.name +
      '" loading="lazy"></div>' +
      '<div class="project-meta"><span class="type-tag ' +
      project.type.class +
      '">' +
      project.type.name +
      "</span></div>" +
      '<p class="project-desc">' +
      project.shortDesc +
      "</p>" +
      '<div class="tech-stack-pills">' +
      project.techStack
        .map(function (t) {
          return '<span class="tech-pill">' + t + "</span>";
        })
        .join("") +
      "</div>" +
      '<div class="project-links">' +
      (project.demoLink
        ? '<a href="' +
          project.demoLink +
          '" class="project-link demo-link" target="_blank">Live Demo</a>'
        : "") +
      '<a href="' +
      project.githubLink +
      '" class="project-link gh-link" target="_blank">GitHub</a></div>' +
      "</div>";

    projectsGrid.appendChild(card);
  });
}

// Render Skills
function renderSkills() {
  const skillsGrid = document.getElementById("type-chart-grid");
  if (!skillsGrid) return;
  skillsGrid.innerHTML = "";

  Object.keys(portfolioData.skills).forEach(function (key) {
    const typeData = portfolioData.skills[key];
    const card = document.createElement("div");
    card.className = "type-chart-card";
    card.style.borderColor = typeData.color;
    card.style.setProperty("--theme-color", typeData.color);
    card.innerHTML =
      '<div class="type-card-header" style="background-color: ' +
      typeData.color +
      ';">' +
      '<span class="type-icon">' +
      typeData.icon +
      "</span>" +
      '<span class="type-name">' +
      key.toUpperCase() +
      "</span>" +
      '<span class="type-category">' +
      typeData.category +
      "</span></div>" +
      '<div class="type-card-body">' +
      typeData.items
        .map(function (i) {
          return '<span class="type-skill-pill">' + i + "</span>";
        })
        .join("") +
      "</div>";

    skillsGrid.appendChild(card);
  });
}

// Render Resume
function renderResume() {
  const col1 = document.getElementById("resume-col-1");
  const col2 = document.getElementById("resume-col-2");
  if (!col1 || !col2) return;

  col1.innerHTML =
    '<div class="resume-section"><h3 class="resume-title"><i class="fas fa-graduation-cap"></i> Education</h3>' +
    portfolioData.education
      .map(function (e) {
        return (
          '<div class="resume-item"><div class="item-title">' +
          e.title +
          '</div><div class="item-subtitle">' +
          e.subtitle +
          '</div><div class="item-date">' +
          e.date +
          '</div><div class="item-desc">' +
          e.description +
          "</div></div>"
        );
      })
      .join("") +
    "</div>";

  col2.innerHTML =
    '<div class="resume-section"><h3 class="resume-title"><i class="fas fa-briefcase"></i> Experience</h3>' +
    portfolioData.experience
      .map(function (e) {
        return (
          '<div class="resume-item"><div class="item-title">' +
          e.title +
          '</div><div class="item-subtitle">' +
          e.subtitle +
          '</div><div class="item-date">' +
          e.date +
          '</div><div class="item-desc">' +
          e.description +
          "</div></div>"
        );
      })
      .join("") +
    "</div>";
}

// Like button
function setupLikes() {
  const likeBtn = document.getElementById("like-btn");
  const likeCount = document.getElementById("like-count");
  if (!likeBtn || !likeCount || !CONFIG.FEATURES.LIKE_BUTTON_ENABLED) return;

  let likes =
    parseInt(localStorage.getItem("pokedex-likes")) || CONFIG.LIKE_SEED;
  let hasLiked = localStorage.getItem("pokedex-has-liked") === "true";

  likeCount.textContent = likes;
  if (hasLiked) {
    likeBtn.classList.add("liked");
    document.getElementById("like-heart").textContent = "♥";
  }

  likeBtn.addEventListener("click", function () {
    if (hasLiked) return;
    likes++;
    hasLiked = true;
    localStorage.setItem("pokedex-likes", likes);
    localStorage.setItem("pokedex-has-liked", "true");
    likeCount.textContent = likes;
    likeBtn.classList.add("liked");
    document.getElementById("like-heart").textContent = "♥";
    if (typeof confetti === "function") {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
    }
  });
}

// Resume download
function setupResumeDownload() {
  const downloadBtn = document.getElementById("download-resume-btn");
  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const lines = [
      "TRAINER RAHUL - POKÉDEX ENTRY #001",
      "═══════════════════════════════════════════════════════════",
      "",
      "FULL-STACK DEVELOPER | MERN STACK SPECIALIST",
      "📍 Jaipur Region | Level 21 Trainer",
      "",
      "═══════════════════════════════════════════════════════════",
      "OVERVIEW",
      "═══════════════════════════════════════════════════════════",
      "Passionate Full-Stack Developer specializing in MERN stack.",
      "Known for creating high-performance web applications with clean code.",
      "",
      "═══════════════════════════════════════════════════════════",
      "TECHNICAL SKILLS",
      "═══════════════════════════════════════════════════════════",
      "CORE & PASSIONATE: React.js | Node.js | JavaScript | HTML5 | CSS3",
      "ADAPTABLE: REST APIs | MongoDB | SQL | Express.js | Firebase",
      "FAST & MODERN: Git | GitHub | VS Code | Postman | Docker | Netlify",
      "PROBLEM SOLVING: Algorithms | System Design | Debugging | Architecture",
      "",
      "═══════════════════════════════════════════════════════════",
      "PROJECTS",
      "═══════════════════════════════════════════════════════════",
    ];
    portfolioData.projects.forEach(function (p) {
      lines.push(p.number + " " + p.name);
      lines.push(p.shortDesc);
      lines.push("");
    });
    lines.push("═══════════════════════════════════════════════════════════");
    lines.push("EDUCATION");
    lines.push("═══════════════════════════════════════════════════════════");
    portfolioData.education.forEach(function (e) {
      lines.push(e.title);
      lines.push(e.subtitle + " | " + e.date);
      lines.push(e.description);
      lines.push("");
    });
    lines.push("═══════════════════════════════════════════════════════════");
    lines.push("EXPERIENCE");
    lines.push("═══════════════════════════════════════════════════════════");
    portfolioData.experience.forEach(function (e) {
      lines.push(e.title);
      lines.push(e.subtitle + " | " + e.date);
      lines.push(e.description);
      lines.push("");
    });
    lines.push("═══════════════════════════════════════════════════════════");
    lines.push("Generated: " + new Date().toLocaleDateString());

    const resumeText = lines.join("\n");
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Trainer_Rahul_Resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

// Contact form
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  if (!form || !CONFIG.FEATURES.CONTACT_FORM_ENABLED) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!FORMSPREE_URL) {
      status.textContent = "Error: Contact form not configured properly.";
      status.style.color = "#e53e3e";
      return;
    }

    status.textContent = "Sending message...";
    status.style.color = "#3182ce";
    const submitBtn = document.getElementById("contact-submit");
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(FORMSPREE_URL, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          status.textContent = "Message sent successfully!";
          status.style.color = "#48bb78";
          form.reset();
        } else {
          status.textContent =
            "Oops! There was a problem sending your message.";
          status.style.color = "#e53e3e";
        }
      })
      .catch(function (error) {
        status.textContent =
          "Oops! There was a problem. Please try again later.";
        status.style.color = "#e53e3e";
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
}

// Easter egg
function setupEasterEgg() {
  const btn = document.getElementById("pokeball-ee");
  const toast = document.getElementById("pokeball-toast");
  const yesBtn = document.getElementById("toast-yes-btn");
  if (!btn || !toast || !yesBtn) return;

  const isCaught = localStorage.getItem("pokedex-trainer-caught") === "true";
  if (isCaught) btn.classList.add("caught");

  btn.addEventListener("click", function () {
    if (btn.classList.contains("caught")) return;
    btn.classList.add("wobble");
    setTimeout(function () {
      btn.classList.remove("wobble");
      toast.classList.add("show");
    }, 1500);
  });

  yesBtn.addEventListener("click", function () {
    toast.classList.remove("show");
    btn.classList.add("caught");
    localStorage.setItem("pokedex-trainer-caught", "true");
    if (typeof confetti === "function") {
      const end = Date.now() + 1500;
      const colors = ["#EE1515", "#ffffff", "#222222"];
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  });
}

// Initialize
function init() {
  createParticles();
  renderProjects();
  renderSkills();
  renderResume();
  setupLikes();
  setupResumeDownload();
  setupContactForm();
  setupEasterEgg();
  console.log("Pokédex Portfolio initialized successfully!");
}

document.addEventListener("DOMContentLoaded", init);
