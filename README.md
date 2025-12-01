# 🚀 Trainer Rahul's Pokédex Portfolio

A modern, Pokémon-themed portfolio showcasing my full-stack web development skills. Features a contact form, visitor analytics, and a responsive, animated UI.

[![Portfolio Screenshot](docs/assets/images/ss/portfo.png)](https://rahul-meena01.github.io/mydex-portfolio/)

**🔗 Live Demo:** [https://rahul-meena01.github.io/mydex-portfolio/](https://rahul-meena01.github.io/mydex-portfolio/)

---

## 🌟 Features

- 🎨 Pokémon-inspired interactive UI with animations
- 📧 Contact form with MongoDB backend and email notifications
- 📊 Visitor analytics (unique visitors, page views, sessions)
- 📱 Fully responsive & accessible design (ARIA labels, keyboard navigation)
- ❤️ Real-time like counter
- 🎯 Smooth animations and modal dialogs
- 🖨️ Print-friendly resume section
- 🔍 SEO & social sharing optimized (meta tags, Open Graph)
- 🔒 Security headers with Helmet.js
- 🚦 Rate limiting on analytics endpoints
- ⚡ Performance optimized (lazy loading, async decoding, deferred scripts)

---

## 🛠️ Tech Stack

### Frontend

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with animations and gradients
- **JavaScript (ES6+)** - Vanilla JS with async/await

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Helmet** - Security headers middleware
- **Express Rate Limit** - API rate limiting
- **Nodemailer** - Email notifications
- **GeoIP-Lite** - IP geolocation
- **UA-Parser-JS** - User agent parsing

### Development Tools

- Git & GitHub
- VS Code
- Postman (API testing)

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier works perfectly)
- Git

### Automated Setup (Recommended)

**Windows:**

```bash
# Double-click start.bat
# OR run in terminal:
start.bat
```

**Mac/Linux:**

```bash
chmod +x start.sh
./start.sh
```

The script will:

1. Install dependencies
2. Create .env file if missing
3. Start backend server
4. Start frontend server
5. Open browser automatically

### Manual Setup

```bash
git clone https://github.com/Rahul-Meena01/mydex-portfolio.git
cd mydex-portfolio
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# See "Environment Variables" section below
```

### 3️⃣ Configure Environment Variables

Edit `backend/.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pokedex-portfolio

# Email (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=your_email@gmail.com
SEND_AUTO_REPLY=false

# CORS (Add your frontend URL)
CORS_ORIGINS=http://localhost:3000,https://yourusername.github.io
```

**📝 Getting MongoDB URI:**

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string from "Connect" → "Connect your application"
5. Replace `<password>` with your database user password

**📧 Gmail App Password Setup:**

1. Enable 2-Factor Authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this as `EMAIL_PASS` in .env

### 4️⃣ Start Backend Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Server will run at `http://localhost:5000`

### 5️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Edit js/config.js and update production API URL
# Update line 6 with your deployed backend URL
```

**For Local Development:**

```bash
# Option 1: Using Python
python -m http.server 3000

# Option 2: Using Node.js http-server
npx http-server -p 3000

# Option 3: Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Frontend will be available at `http://localhost:3000`

---

## � Documentation

- **[README.md](README.md)** - This file (project overview & quick start)
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide for production
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development guide with examples
- **[CODE_REVIEW_SUMMARY.md](CODE_REVIEW_SUMMARY.md)** - Code review and improvements summary

---

## �📂 Project Structure

```
project9/
├── docs/                    # Frontend application (GitHub Pages)
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # All styles with animations
│   ├── js/
│   │   ├── config.js       # Configuration (API URLs, feature flags)
│   │   ├── script.js       # Main application logic
│   │   └── analytics-tracker.js  # Client-side analytics tracking
│   └── assets/
│       └── images/         # Project screenshots
│
├── backend/                 # Backend API
│   ├── server.js           # Express server setup
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment variables template
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── models/             # Mongoose models
│   │   ├── Contact.js
│   │   ├── Like.js
│   │   └── Visit.js
│   ├── controllers/        # Request handlers
│   │   ├── contactController.js
│   │   └── analyticsController.js
│   ├── routes/             # API routes
│   │   ├── contact.js
│   │   ├── analytics.js
│   │   ├── likes.js
│   │   └── health.js
│   ├── middleware/
│   │   ├── analyticsMiddleware.js
│   │   └── databaseMiddleware.js
│   └── utils/
│       └── emailService.js # Email functionality
│
├── .gitignore              # Git ignore rules
├── start.bat               # Windows quick start script
├── start.sh                # Mac/Linux quick start script
├── README.md               # This file
├── DEPLOYMENT.md           # Deployment guide
├── DEVELOPMENT.md          # Development guide
└── CODE_REVIEW_SUMMARY.md  # Code review summary
```

---

## 🌐 Deployment

### Deploy Backend (Render.com - Recommended)

1. **Create Render Account**

   - Sign up at [Render.com](https://render.com)

2. **Create New Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` folder as root directory

3. **Configure Service**

   ```
   Name: pokedex-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**

   - Add all variables from `.env.example`
   - Use your MongoDB Atlas connection string
   - Set `NODE_ENV=production`

5. **Deploy**
   - Click "Create Web Service"
   - Copy the deployed URL (e.g., `https://your-app.onrender.com`)

### Deploy Frontend (GitHub Pages)

1. **Configuration is Auto-Detected**

   - `docs/js/config.js` automatically detects production environment
   - Update production API URL if using custom backend:

   ```javascript
   // docs/js/config.js (line 9)
   : "https://your-custom-backend.com/api"
   ```

2. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Deploy portfolio updates"
   git push origin main
   ```

3. **Enable GitHub Pages**

   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/docs`
   - Click Save
   - Your site will be live at `https://yourusername.github.io/mydex-portfolio/`

4. **Update CORS in Backend**
   - Add your GitHub Pages URL to backend `.env` or Render environment variables:
   ```env
   CORS_ORIGINS=https://yourusername.github.io,https://yourusername.github.io/mydex-portfolio
   ```

---

## 🔧 Configuration

### Frontend Configuration (`docs/js/config.js`)

```javascript
const CONFIG = {
  // Auto-detects localhost vs production
  API_BASE_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://mydex-portfolio-backend.onrender.com/api",

  FEATURES: {
    ANALYTICS_ENABLED: true,
    LIKE_BUTTON_ENABLED: true,
    CONTACT_FORM_ENABLED: true,
    VISITORS_COUNT_ENABLED: true,
  },

  ANALYTICS: {
    SESSION_DURATION: 30 * 60 * 1000, // 30 minutes
    DEBUG: window.location.hostname === "localhost",
  },
};
```

### Backend Environment Variables

See `backend/.env.example` for all available options.

---

## 📡 API Endpoints

### Health Check

- `GET /api/health` - Server health status
- `GET /api/health/ping` - Simple ping test

### Contact Form

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/stats` - Get contact statistics
- `PUT /api/contact/:id/status` - Update message status
- `DELETE /api/contact/:id` - Delete message

### Analytics

- `POST /api/analytics/track` - Track page visit
- `GET /api/analytics/visitors` - Get total visitor count
- `GET /api/analytics/summary` - Get analytics summary
- `GET /api/analytics/popular-pages` - Get popular pages
- `GET /api/analytics/active` - Get active visitors

### Likes

- `GET /api/likes` - Get like count
- `POST /api/likes` - Increment like count

---

## 🧪 Testing

### Test Backend Locally

```bash
# Check server health
curl http://localhost:5000/api/health

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'

# Get visitor count
curl http://localhost:5000/api/analytics/visitors
```

### Test Frontend

1. Open browser console (F12)
2. Check for any JavaScript errors
3. Test contact form submission
4. Verify like button functionality
5. Check visitor counter updates

---

## 🐛 Troubleshooting

### Backend Issues

**"MongoDB Connection Error"**

- Verify MongoDB URI in `.env`
- Check IP whitelist in MongoDB Atlas (allow all: `0.0.0.0/0`)
- Ensure database user credentials are correct

**"CORS Error"**

- Add frontend URL to `CORS_ORIGINS` in `.env`
- Restart backend server after changing .env

**"Email Not Sending"**

- Check Gmail App Password is correct
- Verify 2FA is enabled on Google account
- Set `SEND_AUTO_REPLY=false` if not needed

### Frontend Issues

**"API Request Failed"**

- Check `js/config.js` has correct API URL
- Verify backend server is running
- Check browser console for errors

**"Like Button Not Working"**

- Ensure backend is running
- Check MongoDB connection
- Verify API URL in config.js

---

## 📞 Contact & Support

- **GitHub:** [@Rahul-Meena01](https://github.com/Rahul-Meena01)
- **Email:** Contact via portfolio form
- **Issues:** [GitHub Issues](https://github.com/Rahul-Meena01/mydex-portfolio/issues)

---

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

## 🙏 Acknowledgments

- Pokémon theme inspiration
- MongoDB Atlas for free database hosting
- Render.com for free backend hosting
- GitHub Pages for frontend hosting

---

**Made with ❤️ by Rahul Meena**

- **LinkedIn:** [rahul-meena-m3401](https://linkedin.com/in/rahul-meena-m3401)
- **Instagram:** [@why**\_\_**dude](https://instagram.com/why______dude)

---

## 📝 License

MIT License — Free to use and adapt for your own portfolio.

---

**⭐ If you like this project, give it a star!**

## 🔐 Security Features

- Helmet.js for HTTP security headers
- Rate limiting on analytics endpoints (100 req/15min per IP)
- Input validation with express-validator
- MongoDB injection protection via Mongoose
- Trust proxy configuration for accurate IP tracking
- CORS with configurable allowed origins

_Last updated: December 2025 — Production Ready & Hardened_
