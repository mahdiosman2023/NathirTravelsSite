# Ubuntu 22.04.3 LTS Setup Guide

## Prerequisites

Make sure you have Node.js and npm installed:

```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, install Node.js (version 16 or higher)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Installation Steps

1. **Clone your repository:**
   ```bash
   git clone <your-new-repo-url>
   cd <your-repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # The .env file is already created, just update it with your Gmail credentials
   nano .env
   ```
   
   Update these values:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password (not regular password)

4. **Gmail Setup (Required for contact form):**
   - Enable 2-factor authentication on your Gmail account
   - Go to Google Account settings → Security → 2-Step Verification → App passwords
   - Generate an app password for "Mail"
   - Use this app password in the `.env` file

5. **Run the application:**
   ```bash
   # This runs both frontend and backend servers
   npm run dev:full
   ```

6. **Access the website:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Troubleshooting

### If you get "command not found" errors:
```bash
# Make sure all dependencies are installed
npm install

# If concurrently is missing:
npm install concurrently --save-dev
```

### If ports are already in use:
```bash
# Check what's using the ports
sudo lsof -i :5173
sudo lsof -i :5000

# Kill processes if needed
sudo kill -9 <PID>
```

### If the website shows a blank page:
1. Make sure both servers are running (you should see both frontend and backend startup messages)
2. Check browser console for errors (F12)
3. Verify the backend is responding: `curl http://localhost:5000/health`

## Alternative: Run servers separately

If `npm run dev:full` doesn't work, run in two separate terminals:

**Terminal 1 (Backend):**
```bash
npm run server
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## Project Structure

```
nathir-travels/
├── src/                 # React frontend source
├── server.js           # Express.js backend
├── package.json        # Dependencies and scripts
├── .env               # Environment variables
└── README.md          # Documentation
```

The project is now fully compatible with Ubuntu 22.04.3 LTS!