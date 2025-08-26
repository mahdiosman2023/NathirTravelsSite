# Nathir Travels Website

A modern travel website built with React, TypeScript, and Express.js for booking flights, hotels, and safari tours in East Africa.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Gmail account for email functionality

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd nathir-travels
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=5000
   ```

   **Important:** You need to:
   - Enable 2-factor authentication on your Gmail account
   - Generate an "App Password" for this application
   - Use the app password (not your regular Gmail password) in the `.env` file

### Running the Application

#### Option 1: Run both frontend and backend together (Recommended)
```bash
npm run dev:full
```

#### Option 2: Run separately
Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🛠️ Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
nathir-travels/
├── src/
│   ├── components/
│   │   ├── Contact.tsx      # Contact form with email functionality
│   │   ├── Footer.tsx       # Footer with company info
│   │   ├── Hero.tsx         # Hero section with background image
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── Packages.tsx     # Travel packages display
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── server.js                # Express.js backend server
├── package.json             # Dependencies and scripts
└── .env                     # Environment variables (create this)
```

## 🔧 Troubleshooting

### Blank Page Issues
1. **Check if both servers are running:**
   - Frontend should be on http://localhost:5173
   - Backend should be on http://localhost:5000

2. **Check browser console for errors:**
   - Open Developer Tools (F12)
   - Look for any JavaScript errors

3. **Verify environment setup:**
   - Make sure `.env` file exists with correct Gmail credentials
   - Ensure Gmail app password is configured

### Contact Form Not Working
1. **Verify backend is running:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Check email configuration:**
   - Gmail 2FA must be enabled
   - Use app password, not regular password
   - Verify EMAIL_USER and EMAIL_PASS in `.env`

### Common Issues
- **Port conflicts:** Change PORT in `.env` if 5000 is occupied
- **CORS errors:** Make sure backend is running on localhost:5000
- **Build errors:** Run `npm install` to ensure all dependencies are installed

## 🌟 Features

- **Modern React with TypeScript** - Type-safe development
- **Responsive Design** - Mobile-first approach
- **Email Integration** - Contact form sends emails via Gmail
- **Professional UI** - Clean design with animations
- **Travel Packages** - Flights, Hotels, Safari tours
- **Contact System** - Booking request functionality

## 📧 Email Configuration

To enable email functionality:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env file** with your Gmail and app password

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Frontend
The `dist` folder contains the built frontend that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Deploy Backend
The backend (`server.js`) can be deployed to:
- Heroku
- Railway
- DigitalOcean
- Any Node.js hosting service

## 📝 License

This project is private and proprietary to Nathir Travels.

## 🤝 Support

For support or questions, contact: info@nathirtravels.com