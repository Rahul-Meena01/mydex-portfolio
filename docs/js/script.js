// --- Configuration ---
// Note: CONFIG is loaded from config.js
const API_BASE_URL =
  typeof CONFIG !== "undefined"
    ? CONFIG.API_BASE_URL
    : "http://localhost:5000/api";

// --- Visitors Count Fetch ---
function fetchVisitorsCount() {
  if (
    typeof CONFIG !== "undefined" &&
    !CONFIG.FEATURES.VISITORS_COUNT_ENABLED
  ) {
    return;
  }

  fetch(`${API_BASE_URL}/analytics/visitors`)
    .then((res) => res.json())
    .then((data) => {
      const visitorCountElement = document.getElementById("visitors-count");
      if (visitorCountElement) {
        visitorCountElement.textContent = data.count || 0;
      }
    })
    .catch((err) => {
      console.warn("Failed to fetch visitors count:", err);
      const visitorCountElement = document.getElementById("visitors-count");
      if (visitorCountElement) {
        visitorCountElement.textContent = "N/A";
      }
    });
}

// --- Contact Form Submission ---
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  if (typeof CONFIG !== "undefined" && !CONFIG.FEATURES.CONTACT_FORM_ENABLED) {
    console.log("Contact form disabled in configuration");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("contact-status");

    if (status) {
      status.textContent = "Sending...";
      status.style.color = "#3182ce";
    }

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (status) {
          if (data.success) {
            status.textContent = "Message sent successfully!";
            status.style.color = "#48bb78";
            form.reset();
          } else {
            status.textContent = data.message || "Failed to send message.";
            status.style.color = "#f56565";
          }
        }
      })
      .catch((err) => {
        console.error("Error sending message:", err);
        if (status) {
          status.textContent = "Error sending message. Please try again.";
          status.style.color = "#f56565";
        }
      });
  });
}

// --- Section Navigation: Add Contact Tab ---
document.addEventListener("DOMContentLoaded", function () {
  try {
    fetchVisitorsCount();
    setupContactForm();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
});
// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");

  // Null check for particles container
  if (!particlesContainer) {
    console.warn("Particles container not found");
    return;
  }

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random animation duration
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;

    // Random delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }
}

// Data for the portfolio
const portfolioData = {
  projects: [
    {
      id: 1,
      number: "#001",
      name: "TimeZoneBuddy",
      description:
        "Add your favorite cities to track their time zones and find the perfect overlap for meetings. A comprehensive web application designed to help remote teams coordinate across different time zones with visual timezone mapping and meeting scheduling.",
      image: "assets/images/ss/timexonebuddy.png", // Correct path
      theme: "water-theme",
      types: [
        { name: "HTML", class: "type-fire" },
        { name: "CSS", class: "type-water" },
        { name: "JavaScript", class: "type-psychic" },
      ],
      abilities: [
        "Responsive UI",
        "Timezone tracking",
        "Meeting overlap finder",
        "Real-time updates",
      ],
      stats: {
        performance: 85,
        uiux: 90,
        scalability: 70,
        creativity: 80,
      },
      demoLink: "https://rahul-meena01.github.io/TimeZoneBuddy/",
      githubLink: "https://github.com/Rahul-Meena01/TimeZoneBuddy",
    },
    {
      id: 2,
      number: "#002",
      name: "Life & Death Calculator",
      description:
        "A web app built with HTML, CSS, and JavaScript where users enter their birth date and expected death date. It instantly shows their current age and a live countdown of the remaining time in days, hours, minutes, and seconds with real-time updates.",
      image: "assets/images/ss/LifrAndDeath.png", // Correct path
      theme: "grass-theme",
      types: [
        { name: "HTML", class: "type-water" },
        { name: "CSS", class: "type-water" },
        { name: "JavaScript", class: "type-psychic" },
      ],
      abilities: [
        "Real-time countdown",
        "Age calculation",
        "Responsive design",
        "Live updates",
      ],
      stats: {
        performance: 90,
        uiux: 85,
        scalability: 60,
        creativity: 85,
      },
      demoLink: "https://rahul-meena01.github.io/birth-and-death-calculator/",
      githubLink: "https://github.com/Rahul-Meena01/birth-and-death-calculator",
    },
    {
      id: 3,
      number: "#003",
      name: "E-Commerce Website",
      description:
        "Contributing with a teammate for the final year project of an e-commerce website. A full-stack e-commerce platform with product catalog, shopping cart, and modern user interface for online shopping experience.",
      image: "assets/images/ss/website.png", // Correct path
      theme: "fire-theme",
      types: [
        { name: "HTML", class: "type-fire" },
        { name: "CSS", class: "type-water" },
        { name: "JavaScript", class: "type-psychic" },
        { name: "Collaboration", class: "type-grass" },
      ],
      abilities: [
        "Product catalog",
        "Shopping cart",
        "Team collaboration",
        "Modern UI design",
      ],
      stats: {
        performance: 80,
        uiux: 75,
        scalability: 85,
        creativity: 70,
      },
      demoLink: "",
      githubLink: "https://github.com/Rahul-Meena01/my-web-project",
    },
    {
      id: 4,
      number: "#004",
      name: "E-Commerce Login",
      description:
        "Modern responsive login page with glassmorphism design for Shopper e-commerce. Features stunning visual effects, smooth animations, and a contemporary user interface with glass-morphic styling for enhanced user experience.",
      image: "assets/images/ss/login.png", // Correct path
      theme: "psychic-theme",
      types: [
        { name: "HTML", class: "type-fire" },
        { name: "CSS", class: "type-water" },
        { name: "JavaScript", class: "type-psychic" },
        { name: "Glassmorphism", class: "type-ice" },
      ],
      abilities: [
        "Glassmorphism design",
        "Responsive layout",
        "Modern animations",
        "User authentication UI",
      ],
      stats: {
        performance: 85,
        uiux: 90,
        scalability: 70,
        creativity: 95,
      },
      demoLink: "",
      githubLink: "https://github.com/Rahul-Meena01/ecommerce-login",
    },
    {
      id: 5,
      number: "#005",
      name: "Tic-Tac-Toe Game",
      description:
        "A classic Tic-Tac-Toe game built with modern web technologies. Features interactive gameplay, win detection, score tracking, and a clean, responsive user interface for an engaging gaming experience.",
      image: "assets/images/ss/TikTakToe.png", // Correct path
      theme: "electric-theme",
      types: [
        { name: "HTML", class: "type-fire" },
        { name: "CSS", class: "type-water" },
        { name: "JavaScript", class: "type-psychic" },
        { name: "Game Logic", class: "type-electric" },
      ],
      abilities: [
        "Interactive gameplay",
        "Win detection",
        "Score tracking",
        "Responsive design",
      ],
      stats: {
        performance: 90,
        uiux: 80,
        scalability: 65,
        creativity: 75,
      },
      demoLink: "https://rahul-meena01.github.io/New-Tic-Tac-Toe/",
      githubLink: "https://github.com/Rahul-Meena01/New-Tic-Tac-Toe",
    },
    {
      id: 6,
      number: "#006",
      name: "Bubbly Game",
      description:
        "An interactive bubble-popping game with engaging animations and gameplay mechanics. Built with vanilla JavaScript, this project showcases DOM manipulation, event handling, and game development fundamentals.",
      image: "assets/images/ss/bubbly.png", // Correct path
      theme: "psychic-theme",
      types: [
        { name: "HTML", class: "type-fire" },
        { name: "CSS", class: "type-water" },
        { name: "JavaScript", class: "type-psychic" },
        { name: "Game Dev", class: "type-electric" },
      ],
      abilities: [
        "Interactive gameplay",
        "Animation effects",
        "DOM manipulation",
        "Event handling",
      ],
      stats: {
        performance: 85,
        uiux: 75,
        scalability: 60,
        creativity: 80,
      },
      demoLink: "https://rahul-meena01.github.io/bubbly/",
      githubLink: "https://github.com/Rahul-Meena01/bubbly",
    },
  ],
  badges: [
    {
      id: 1,
      name: "Web Dev Bootcamp",
      description:
        "Successfully completed an intensive 6-month MERN stack web development bootcamp, mastering front-end and back-end technologies through hands-on projects and collaborative learning.",
      icon: "💻",
    },
    {
      id: 2,
      name: "Programming Skills",
      description:
        "Self-taught programming expertise developed through dedicated practice, online courses, and building multiple projects. Proficient in JavaScript, Python, and various web technologies.",
      icon: "🚀",
    },
    {
      id: 3,
      name: "Video Editing",
      description:
        "Skilled in content creation and video editing for social media platforms. Experience with Adobe Premiere Pro, After Effects, and creating engaging digital content.",
      icon: "🎬",
    },
    {
      id: 4,
      name: "Social Media Influencer",
      description:
        "Established social media presence with active audience engagement and content creation. Experience in building online communities and creating viral content.",
      icon: "📱",
    },
    {
      id: 5,
      name: "Open Source Contributor",
      description:
        "Active contributor to open source projects on GitHub. Experience with collaborative development, code reviews, and maintaining project documentation.",
      icon: "🔓",
    },
    {
      id: 6,
      name: "Hackathon Winner",
      description:
        "Awarded first place in a local coding hackathon for developing an innovative solution to a real-world problem within a 48-hour timeframe.",
      icon: "🏆",
    },
  ],
  moves: {
    frontend: [
      {
        name: "HTML5 Mastery",
        description:
          "Semantic markup, accessibility features, and modern HTML5 APIs",
      },
      {
        name: "CSS3 Wizardry",
        description:
          "Flexbox, Grid, animations, transitions, and responsive design",
      },
      {
        name: "JavaScript ES6+",
        description:
          "Modern JavaScript features, async programming, and DOM manipulation",
      },
      {
        name: "React Development",
        description:
          "Component-based architecture, hooks, state management, and React Router",
      },
      {
        name: "Next.js Framework",
        description:
          "Server-side rendering, static site generation, and API routes",
      },
      {
        name: "Responsive Design",
        description:
          "Mobile-first approach, media queries, and cross-browser compatibility",
      },
      {
        name: "UI/UX Principles",
        description: "User-centered design, prototyping, and usability testing",
      },
    ],
    backend: [
      {
        name: "Node.js Runtime",
        description:
          "Event-driven architecture, non-blocking I/O, and NPM ecosystem",
      },
      {
        name: "Express.js Framework",
        description: "RESTful API development, middleware, and routing",
      },
      {
        name: "Database Design",
        description:
          "Data modeling, relationships, and optimization techniques",
      },
      {
        name: "API Development",
        description: "REST API design, authentication, and documentation",
      },
      {
        name: "Authentication Systems",
        description:
          "JWT, OAuth, session management, and security best practices",
      },
      {
        name: "Server Deployment",
        description: "Cloud platforms, containerization, and CI/CD pipelines",
      },
    ],
    tools: [
      {
        name: "Git Version Control",
        description:
          "Branching strategies, collaboration workflows, and code review",
      },
      {
        name: "GitHub Platform",
        description:
          "Repository management, pull requests, and project organization",
      },
      {
        name: "VS Code Mastery",
        description: "Extensions, debugging, and productivity enhancements",
      },
      {
        name: "Chrome DevTools",
        description: "Debugging, performance analysis, and network monitoring",
      },
      {
        name: "Postman Testing",
        description: "API testing, documentation, and automated testing suites",
      },
      {
        name: "Figma Design",
        description: "UI design, prototyping, and design system implementation",
      },
    ],
    softSkills: [
      {
        name: "Problem Solving",
        description: "Analytical thinking, debugging, and algorithmic approach",
      },
      {
        name: "Communication",
        description:
          "Technical documentation, team collaboration, and client interaction",
      },
      {
        name: "Project Management",
        description:
          "Agile methodologies, task prioritization, and deadline management",
      },
      {
        name: "Continuous Learning",
        description:
          "Staying updated with latest technologies and industry trends",
      },
      {
        name: "Team Collaboration",
        description: "Code reviews, pair programming, and knowledge sharing",
      },
    ],
  },
  skills: {
    frontend: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React.js", level: 75 },
      { name: "Next.js", level: 70 },
      { name: "Bootstrap", level: 80 },
      { name: "Tailwind CSS", level: 75 },
    ],
    backend: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 70 },
      { name: "REST APIs", level: 80 },
      { name: "GraphQL", level: 60 },
      { name: "MongoDB", level: 70 },
      { name: "SQL", level: 65 },
      { name: "Firebase", level: 70 },
    ],
    other: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 85 },
      { name: "Docker", level: 50 },
      { name: "AWS", level: 40 },
      { name: "Netlify", level: 75 },
      { name: "Vercel", level: 70 },
      { name: "Figma", level: 65 },
      { name: "Postman", level: 80 },
    ],
  },
  education: [
    {
      title: "Bachelor of Computer Applications (BCA)",
      subtitle: "JE CRC University",
      date: "2023 – 2026",
      description:
        "Currently pursuing degree in Computer Applications with focus on software development, database management, and web technologies.",
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

// DOM Elements with null checks
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");
const projectsGrid = document.querySelector(".projects-grid");
const badgesGrid = document.querySelector(".badges-grid");
const projectModal = document.querySelector(".project-modal");
const badgeModal = document.querySelector(".badge-modal");
if (projectModal) {
  projectModal.setAttribute("role", "dialog");
  projectModal.setAttribute("aria-modal", "true");
}
if (badgeModal) {
  badgeModal.setAttribute("role", "dialog");
  badgeModal.setAttribute("aria-modal", "true");
}
const closeModalButtons = document.querySelectorAll(
  ".close-modal, .close-badge-modal"
);
const easterEgg = document.querySelector(".easter-egg");
const closeEasterEgg = document.getElementById("close-easter-egg");

// Navigation functionality with error handling
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSection = button.getAttribute("data-section");

    // Update active button
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show target section
    sections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === targetSection) {
        section.classList.add("active");
      }
    });

    // Animate skill bars when skills section is opened
    if (targetSection === "skills") {
      setTimeout(animateSkillBars, 300);
    }

    // Animate project stats when projects section is opened
    if (targetSection === "projects") {
      setTimeout(animateProjectStats, 300);
    }
  });
});

// Render projects
function renderProjects() {
  // Null check for projectsGrid
  if (!projectsGrid) {
    console.warn("Projects grid not found");
    return;
  }

  projectsGrid.innerHTML = "";
  portfolioData.projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = `project-card ${project.theme}`;
    projectCard.setAttribute("data-id", project.id);

    projectCard.innerHTML = `
            <div class="project-number">${project.number}</div>
            <div class="project-name">${project.name}</div>
            <div class="project-image">
              <img src="${project.image}" alt="${project.name} Project Screenshot" loading="lazy" decoding="async">
            </div>
            <div class="project-types">
                ${project.types
                  .map(
                    (type) =>
                      `<span class="type-tag ${type.class}">${type.name}</span>`
                  )
                  .join("")}
            </div>
            <div class="project-abilities">
                ${project.abilities
                  .map(
                    (ability) => `<span class="ability-tag">${ability}</span>`
                  )
                  .join("")}
            </div>
            <div class="project-stats">
                <div class="stat">
                    <span class="stat-name">Performance</span>
                    <div class="stat-bar">
                        <div class="stat-fill" data-value="${
                          project.stats.performance
                        }"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat-name">UI/UX</span>
                    <div class="stat-bar">
                        <div class="stat-fill" data-value="${
                          project.stats.uiux
                        }"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat-name">Scalability</span>
                    <div class="stat-bar">
                        <div class="stat-fill" data-value="${
                          project.stats.scalability
                        }"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat-name">Creativity</span>
                    <div class="stat-bar">
                        <div class="stat-fill" data-value="${
                          project.stats.creativity
                        }"></div>
                    </div>
                </div>
            </div>
            <div class="project-links">
                ${
                  project.demoLink
                    ? `<a href="${project.demoLink}" class="project-link" target="_blank" rel="noopener noreferrer">Demo</a>`
                    : ""
                }
                <a href="${
                  project.githubLink
                }" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        `;

    projectsGrid.appendChild(projectCard);

    // Add click event to open project details
    projectCard.addEventListener("click", () => {
      openProjectModal(project);
    });
  });
}

// Render badges
function renderBadges() {
  // Null check for badgesGrid
  if (!badgesGrid) {
    console.warn("Badges grid not found");
    return;
  }

  badgesGrid.innerHTML = "";
  portfolioData.badges.forEach((badge) => {
    const badgeElement = document.createElement("div");
    badgeElement.className = "badge";
    badgeElement.setAttribute("data-id", badge.id);
    badgeElement.setAttribute("role", "button");
    badgeElement.setAttribute("tabindex", "0");
    badgeElement.setAttribute("aria-label", `View details about ${badge.name}`);

    badgeElement.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        `;

    badgesGrid.appendChild(badgeElement);

    // Add click event to open badge details
    const openBadge = () => openBadgeModal(badge);
    badgeElement.addEventListener("click", openBadge);
    badgeElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBadge();
      }
    });
  });
}

// Render moves
function renderMoves() {
  // Frontend moves
  const frontendMoves = document.querySelector(
    "#moves .moves-category:nth-child(1) .moves-grid"
  );
  portfolioData.moves.frontend.forEach((move) => {
    const moveElement = document.createElement("div");
    moveElement.className = "move-item";
    moveElement.innerHTML = `
            <div class="move-name">${move.name}</div>
            <div class="move-description">${move.description}</div>
        `;
    frontendMoves.appendChild(moveElement);
  });

  // Backend moves
  const backendMoves = document.querySelector(
    "#moves .moves-category:nth-child(2) .moves-grid"
  );
  portfolioData.moves.backend.forEach((move) => {
    const moveElement = document.createElement("div");
    moveElement.className = "move-item";
    moveElement.innerHTML = `
            <div class="move-name">${move.name}</div>
            <div class="move-description">${move.description}</div>
        `;
    backendMoves.appendChild(moveElement);
  });

  // Tool moves
  const toolMoves = document.querySelector(
    "#moves .moves-category:nth-child(3) .moves-grid"
  );
  portfolioData.moves.tools.forEach((move) => {
    const moveElement = document.createElement("div");
    moveElement.className = "move-item";
    moveElement.innerHTML = `
            <div class="move-name">${move.name}</div>
            <div class="move-description">${move.description}</div>
        `;
    toolMoves.appendChild(moveElement);
  });

  // Soft skill moves
  const softSkillMoves = document.querySelector(
    "#moves .moves-category:nth-child(4) .moves-grid"
  );
  portfolioData.moves.softSkills.forEach((move) => {
    const moveElement = document.createElement("div");
    moveElement.className = "move-item";
    moveElement.innerHTML = `
            <div class="move-name">${move.name}</div>
            <div class="move-description">${move.description}</div>
        `;
    softSkillMoves.appendChild(moveElement);
  });
}

// Render skills
function renderSkills() {
  const skillsContainer = document.querySelector(".skills-container");

  // Null check for skillsContainer
  if (!skillsContainer) {
    console.warn("Skills container not found");
    return;
  }

  skillsContainer.innerHTML = "";

  // Frontend skills
  const frontendSkills = document.createElement("div");
  frontendSkills.className = "skill-category";
  frontendSkills.innerHTML = `
        <h3 class="skill-category-title"><i class="fas fa-code"></i> Frontend Skills</h3>
        ${portfolioData.skills.frontend
          .map(
            (skill) => `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress frontend" data-level="${skill.level}"></div>
                </div>
            </div>
        `
          )
          .join("")}
    `;
  skillsContainer.appendChild(frontendSkills);

  // Backend skills
  const backendSkills = document.createElement("div");
  backendSkills.className = "skill-category";
  backendSkills.innerHTML = `
        <h3 class="skill-category-title"><i class="fas fa-server"></i> Backend Skills</h3>
        ${portfolioData.skills.backend
          .map(
            (skill) => `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress backend" data-level="${skill.level}"></div>
                </div>
            </div>
        `
          )
          .join("")}
    `;
  skillsContainer.appendChild(backendSkills);

  // Other skills
  const otherSkills = document.createElement("div");
  otherSkills.className = "skill-category";
  otherSkills.innerHTML = `
        <h3 class="skill-category-title"><i class="fas fa-tools"></i> Development Tools</h3>
        ${portfolioData.skills.other
          .map(
            (skill) => `
            <div class="skill-item">
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress other" data-level="${skill.level}"></div>
                </div>
            </div>
        `
          )
          .join("")}
    `;
  skillsContainer.appendChild(otherSkills);
}

// Render resume
function renderResume() {
  const resumeColumns = document.querySelectorAll(".resume-column");

  // Null check for resume columns
  if (!resumeColumns || resumeColumns.length < 2) {
    console.warn("Resume columns not found");
    return;
  }

  const resumeColumn1 = resumeColumns[0];
  const resumeColumn2 = resumeColumns[1];

  // Education
  const educationSection = document.createElement("div");
  educationSection.className = "resume-section";
  educationSection.innerHTML = `
        <h3 class="resume-title"><i class="fas fa-graduation-cap"></i> Education</h3>
        ${portfolioData.education
          .map(
            (edu) => `
            <div class="education-item">
                <div class="item-title">${edu.title}</div>
                <div class="item-subtitle">${edu.subtitle}</div>
                <div class="item-date">${edu.date}</div>
                <div class="item-description">${edu.description}</div>
            </div>
        `
          )
          .join("")}
    `;
  resumeColumn1.appendChild(educationSection);

  // Experience
  const experienceSection = document.createElement("div");
  experienceSection.className = "resume-section";
  experienceSection.innerHTML = `
        <h3 class="resume-title"><i class="fas fa-briefcase"></i> Experience</h3>
        ${portfolioData.experience
          .map(
            (exp) => `
            <div class="experience-item">
                <div class="item-title">${exp.title}</div>
                <div class="item-subtitle">${exp.subtitle}</div>
                <div class="item-date">${exp.date}</div>
                <div class="item-description">${exp.description}</div>
            </div>
        `
          )
          .join("")}
    `;
  resumeColumn1.appendChild(experienceSection);

  // Skills
  const skillsSection = document.createElement("div");
  skillsSection.className = "resume-section";

  // Combine all skills
  const allSkills = [
    ...portfolioData.skills.frontend,
    ...portfolioData.skills.backend,
    ...portfolioData.skills.other,
  ];

  // Sort by level (descending) and take top 15
  const topSkills = allSkills.sort((a, b) => b.level - a.level).slice(0, 15);

  skillsSection.innerHTML = `
        <h3 class="resume-title"><i class="fas fa-star"></i> Top Skills</h3>
        <div class="skills-list">
            ${topSkills
              .map(
                (skill) => `
                <span class="skill-tag">${skill.name}</span>
            `
              )
              .join("")}
        </div>
    `;
  resumeColumn2.appendChild(skillsSection);

  // Projects
  const projectsSection = document.createElement("div");
  projectsSection.className = "resume-section";
  projectsSection.innerHTML = `
        <h3 class="resume-title"><i class="fas fa-project-diagram"></i> Featured Projects</h3>
        ${portfolioData.projects
          .slice(0, 3)
          .map(
            (project) => `
            <div class="project-item">
                <div class="item-title">${project.name}</div>
                <div class="item-description">${project.description}</div>
                <div class="skills-list">
                    ${project.types
                      .map(
                        (type) => `<span class="skill-tag">${type.name}</span>`
                      )
                      .join("")}
                </div>
            </div>
        `
          )
          .join("")}
    `;
  resumeColumn2.appendChild(projectsSection);
}

// Open project modal
function openProjectModal(project) {
  if (!projectModal) {
    console.warn("Project modal not found");
    return;
  }

  const modalContent = document.querySelector(".project-modal .modal-content");
  if (!modalContent) {
    console.warn("Modal content container not found");
    return;
  }

  modalContent.innerHTML = `
        <span class="close-modal" role="button" tabindex="0" aria-label="Close project details">&times;</span>
        <div class="project-number">${project.number}</div>
        <h2 class="project-name" id="project-modal-title">${project.name}</h2>
        <div class="project-image">
            <img src="${project.image}" alt="${
    project.name
  } Project Screenshot" loading="lazy">
        </div>
        <p>${project.description}</p>
        <div class="project-types">
            ${project.types
              .map(
                (type) =>
                  `<span class="type-tag ${type.class}">${type.name}</span>`
              )
              .join("")}
        </div>
        <h3>Abilities</h3>
        <div class="project-abilities">
            ${project.abilities
              .map((ability) => `<span class="ability-tag">${ability}</span>`)
              .join("")}
        </div>
        <h3>Stats</h3>
        <div class="project-stats">
            <div class="stat">
                <span class="stat-name">Performance</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${
                      project.stats.performance
                    }%"></div>
                </div>
            </div>
            <div class="stat">
                <span class="stat-name">UI/UX</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${
                      project.stats.uiux
                    }%"></div>
                </div>
            </div>
            <div class="stat">
                <span class="stat-name">Scalability</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${
                      project.stats.scalability
                    }%"></div>
                </div>
            </div>
            <div class="stat">
                <span class="stat-name">Creativity</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${
                      project.stats.creativity
                    }%"></div>
                </div>
            </div>
        </div>
        <div class="project-links">
            ${
              project.demoLink
                ? `<a href="${project.demoLink}" class="project-link" target="_blank" rel="noopener noreferrer">Demo</a>`
                : ""
            }
            <a href="${
              project.githubLink
            }" class="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
    `;

  projectModal.classList.add("active");

  // Set focus to modal for accessibility
  modalContent.focus();

  // Re-attach close event
  const closeBtn = document.querySelector(".project-modal .close-modal");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
    closeBtn.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeProjectModal();
      }
    });
  }
}

// Open badge modal
function openBadgeModal(badge) {
  if (!badgeModal) {
    console.warn("Badge modal not found");
    return;
  }

  const modalContent = document.querySelector(
    ".badge-modal .badge-modal-content"
  );
  if (!modalContent) {
    console.warn("Badge modal content container not found");
    return;
  }

  modalContent.innerHTML = `
        <span class="close-badge-modal" role="button" tabindex="0" aria-label="Close badge details">&times;</span>
        <div class="badge-icon" style="font-size: 3rem;">${badge.icon}</div>
        <h2 id="badge-modal-title">${badge.name}</h2>
        <p>${badge.description}</p>
    `;

  badgeModal.classList.add("active");

  // Set focus to modal for accessibility
  modalContent.focus();

  // Re-attach close event
  const closeBtn = document.querySelector(".badge-modal .close-badge-modal");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeBadgeModal);
    closeBtn.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeBadgeModal();
      }
    });
  }
}

// Close project modal
function closeProjectModal() {
  if (projectModal) {
    projectModal.classList.remove("active");
  }
}

// Close badge modal
function closeBadgeModal() {
  if (badgeModal) {
    badgeModal.classList.remove("active");
  }
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const level = bar.getAttribute("data-level");
    // Use setTimeout to ensure animation triggers after DOM update
    setTimeout(() => {
      bar.style.width = `${level}%`;
    }, 10);
  });
}

// Animate project stats
function animateProjectStats() {
  const statBars = document.querySelectorAll(".stat-fill");
  statBars.forEach((bar) => {
    const value = bar.getAttribute("data-value");
    // Use setTimeout to ensure animation triggers after DOM update
    setTimeout(() => {
      bar.style.width = `${value}%`;
    }, 10);
  });
}

// Easter Egg functionality with error handling
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code);

  // Keep only the last 10 key presses
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  // Check if the sequence matches
  if (konamiCode.join(",") === konamiSequence.join(",")) {
    if (easterEgg) {
      easterEgg.classList.add("active");
    }
    konamiCode = []; // Reset the code
  }
});

// Close easter egg
if (closeEasterEgg) {
  closeEasterEgg.addEventListener("click", () => {
    if (easterEgg) {
      easterEgg.classList.remove("active");
    }
  });
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === projectModal) {
    closeProjectModal();
  }
  if (e.target === badgeModal) {
    closeBadgeModal();
  }
});

// Close modals with escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
    closeBadgeModal();
    if (easterEgg) {
      easterEgg.classList.remove("active");
    }
  }
});

// Initialize the portfolio
function initPortfolio() {
  try {
    createParticles();
    renderProjects();
    renderBadges();
    renderMoves();
    renderSkills();
    renderResume();

    // Close modal events
    closeModalButtons.forEach((button) => {
      if (button.classList.contains("close-modal")) {
        button.setAttribute("aria-label", "Close project modal");
        button.addEventListener("click", closeProjectModal);
      } else {
        button.setAttribute("aria-label", "Close badge modal");
        button.addEventListener("click", closeBadgeModal);
      }
    });

    // Initialize animations for active section
    if (document.querySelector("#skills").classList.contains("active")) {
      setTimeout(animateSkillBars, 300);
    }
    if (document.querySelector("#projects").classList.contains("active")) {
      setTimeout(animateProjectStats, 300);
    }

    console.log("Portfolio initialized successfully!");
  } catch (error) {
    console.error("Error initializing portfolio:", error);
  }
}

// Start the portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", initPortfolio);

// --- Like Button Logic ---
(async function () {
  const likeBtn = document.getElementById("like-btn");
  const likeHeart = document.getElementById("like-heart");
  const likeCount = document.getElementById("like-count");
  const likeLoading = document.getElementById("like-loading");

  // Check if like button is enabled
  if (typeof CONFIG !== "undefined" && !CONFIG.FEATURES.LIKE_BUTTON_ENABLED) {
    console.log("Like button disabled in configuration");
    return;
  }

  // Check if elements exist
  if (!likeBtn || !likeHeart || !likeCount || !likeLoading) {
    console.warn("Like button elements not found");
    return;
  }

  let isLoading = false;
  let liked = false;

  // Helper: Show loading
  function setLoading(state) {
    isLoading = state;
    likeLoading.style.display = state ? "inline" : "none";
    likeBtn.disabled = state;
  }

  // Fetch like count
  async function fetchLikeCount() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/likes`);
      const data = await res.json();
      if (data.success) {
        likeCount.textContent = data.count;
      } else {
        likeCount.textContent = "-";
      }
    } catch (e) {
      console.warn("Failed to fetch like count:", e);
      likeCount.textContent = "-";
    } finally {
      setLoading(false);
    }
  }

  // Optimistic UI update
  async function incrementLike() {
    if (isLoading) return;
    setLoading(true);
    const prevCount = parseInt(likeCount.textContent) || 0;
    likeCount.textContent = prevCount + 1;
    likeBtn.classList.add("liked");
    likeHeart.textContent = "♥";
    try {
      const res = await fetch(`${API_BASE_URL}/likes`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        likeCount.textContent = data.count;
      } else {
        likeCount.textContent = prevCount;
        likeBtn.classList.remove("liked");
        likeHeart.textContent = "♡";
        alert("Failed to like. Please try again.");
      }
    } catch (e) {
      console.error("Network error:", e);
      likeCount.textContent = prevCount;
      likeBtn.classList.remove("liked");
      likeHeart.textContent = "♡";
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch
  await fetchLikeCount();

  // Click handler
  likeBtn.addEventListener("click", async () => {
    if (isLoading) return;
    await incrementLike();
  });
})();
// --- End Like Button Logic ---
