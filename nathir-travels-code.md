# Nathir Travels - Complete Source Code

This document contains all the source code for the Nathir Travels website project.

## Project Structure

```
nathir-travels/
├── src/
│   ├── components/
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── Packages.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── server.js
├── package.json
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── eslint.config.js
```

## Frontend Code

### src/App.tsx
```tsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Packages />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
```

### src/main.tsx
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
```

### src/components/Navbar.tsx
```tsx
import React from 'react';
import { Plane } from 'lucide-react';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Plane className="text-emerald-400 w-8 h-8" />
          <span className="text-white text-2xl font-bold">Nathir Travels</span>
        </div>
        <ul className="flex gap-8">
          <li>
            <button
              onClick={() => scrollToSection('packages')}
              className="text-white hover:text-emerald-400 transition-colors duration-200 text-lg"
            >
              Packages
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-emerald-400 transition-colors duration-200 text-lg"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
```

### src/components/Hero.tsx
```tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1450340/pexels-photo-1450340.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight" style={{ fontFamily: '"Dancing Script", "Brush Script MT", cursive, fantasy' }}>
          Explore East Africa with Nathir Travels
        </h1>
      </div>
    </section>
  );
};

export default Hero;
```

### src/components/Packages.tsx
```tsx
import React from 'react';
import { Plane, Building, Camera } from 'lucide-react';

const packages = [
  {
    icon: Plane,
    title: 'Flights',
    description: 'Book flights to destinations across East Africa and beyond with competitive rates and flexible scheduling.',
    features: ['Direct routes', 'Best prices', 'Flexible dates'],
  },
  {
    icon: Building,
    title: 'Hotels',
    description: 'Stay at top-rated hotels and resorts with exceptional amenities and world-class service.',
    features: ['5-star properties', 'Prime locations', 'Special rates'],
  },
  {
    icon: Camera,
    title: 'Safari Tours',
    description: 'Experience the majesty of African wildlife with our expertly guided safari adventures.',
    features: ['Expert guides', 'Wildlife viewing', 'Cultural experiences'],
  },
];

const Packages: React.FC = () => {
  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated selection of travel experiences designed to create lasting memories.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-200">
                  <IconComponent className="w-8 h-8 text-emerald-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {pkg.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {pkg.description}
                </p>
                
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;
```

### src/components/Contact.tsx
```tsx
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  packageType: string;
  travelDate: string;
  comments: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    packageType: '',
    travelDate: '',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Your booking request has been sent successfully! We will contact you soon.');
        setMessageType('success');
        setFormData({ name: '', email: '', packageType: '', travelDate: '', comments: '' });
      } else {
        setMessage(data.message || 'There was an error sending your request.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Unable to connect to server. Please try again later.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Next Adventure
          </h2>
          <p className="text-xl text-gray-600">
            Ready to explore East Africa? Fill out the form below and we'll help you plan the perfect trip.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="packageType" className="block text-sm font-semibold text-gray-700 mb-2">
                Package Type *
              </label>
              <select
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              >
                <option value="">Select Package Type</option>
                <option value="Flight">Flight</option>
                <option value="Hotel">Hotel</option>
                <option value="Safari">Safari Tour</option>
              </select>
            </div>

            <div>
              <label htmlFor="travelDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Travel Date *
              </label>
              <input
                type="date"
                id="travelDate"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none"
                placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {isSubmitting ? 'Sending Request...' : 'Send Request'}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="font-medium">{message}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

### src/components/Footer.tsx
```tsx
import React from 'react';
import { Mail, MapPin, Plane } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Plane className="text-emerald-400 w-8 h-8" />
              <span className="text-2xl font-bold">Nathir Travels</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Your trusted partner for exploring the beauty of East Africa. 
              We create unforgettable travel experiences with personalized service and expert guidance.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">Contact Information</h3>
            
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <a 
                  href="mailto:info@nathirtravels.com" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  info@nathirtravels.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-300 leading-relaxed">
                  Town House, 3rd floor room 1A,<br />
                  Kaunda Street, Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Nathir Travels. All rights reserved. | Explore East Africa with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## Backend Code

### server.js
```javascript
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Contact form endpoint
app.post('/send', async (req, res) => {
  const { name, email, packageType, travelDate, comments } = req.body;

  // Validation
  if (!name || !email || !packageType || !travelDate) {
    return res.status(400).json({ 
      message: 'Please fill in all required fields (Name, Email, Package Type, and Travel Date).' 
    });
  }

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Nathir Travels Website" <${process.env.EMAIL_USER}>`,
      to: 'info@nathirtravels.com',
      subject: `New Booking Request from ${name} - ${packageType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Booking Request - Nathir Travels
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Package Type:</strong> ${packageType}</p>
            <p><strong>Travel Date:</strong> ${new Date(travelDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>

          ${comments ? `
            <div style="background-color: #fefefe; padding: 20px; border-left: 4px solid #059669; margin: 20px 0;">
              <h3 style="color: #065f46; margin-top: 0;">Additional Details</h3>
              <p style="line-height: 1.6;">${comments}</p>
            </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 15px; background-color: #ecfdf5; border-radius: 8px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                timeZone: 'Africa/Nairobi',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} (EAT)
            </p>
          </div>
        </div>
      `,
      text: `
        New Booking Request - Nathir Travels
        
        Customer Information:
        Name: ${name}
        Email: ${email}
        Package Type: ${packageType}
        Travel Date: ${new Date(travelDate).toLocaleDateString()}
        
        ${comments ? `Additional Details:\n${comments}\n` : ''}
        
        Submitted: ${new Date().toLocaleString()}
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      message: 'Your booking request has been sent successfully! We will contact you soon.' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      message: 'There was an error sending your request. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Nathir Travels server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.EMAIL_USER || 'Not configured'}`);
});
```

## Configuration Files

### package.json
```json
{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "server": "node server.js",
    "dev:full": "concurrently \"npm run dev\" \"npm run server\"",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "lucide-react": "^0.344.0",
    "nodemailer": "^7.0.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "concurrently": "^8.2.2",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nathir Travels - Explore East Africa</title>
    <meta name="description" content="Discover East Africa with Nathir Travels. Book flights, hotels, and safari tours for unforgettable adventures." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

### eslint.config.js
```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
```

## Environment Setup

### .env (Create this file)
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

## Installation & Setup Instructions

1. **Clone or create the project directory**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory
   - Add your Gmail credentials and app password
   - Configure Gmail to allow app passwords

4. **Run the development server:**
   ```bash
   npm run dev:full
   ```
   This runs both the frontend (Vite) and backend (Express) servers concurrently.

5. **Build for production:**
   ```bash
   npm run build
   ```

## Features

- **Modern React with TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with responsive design
- **Lucide React Icons**: Beautiful, consistent iconography
- **Express.js Backend**: RESTful API for form handling
- **Nodemailer Integration**: Email functionality for contact forms
- **Responsive Design**: Mobile-first approach with smooth animations
- **Professional UI/UX**: Clean, modern design with hover effects and transitions

## Project Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + Nodemailer
- **Styling**: Tailwind CSS with custom animations and transitions
- **Icons**: Lucide React for consistent iconography
- **Email**: Gmail SMTP with HTML templates
- **Development**: Hot reload with concurrent frontend/backend development

This is a complete, production-ready travel website with modern web technologies and best practices.