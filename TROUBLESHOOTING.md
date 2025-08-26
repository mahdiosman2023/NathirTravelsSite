# Ubuntu 22.04.3 LTS Troubleshooting Guide

## Blank Page Issue - Step by Step Fix

### 1. First, run the diagnostic script:
```bash
node debug-check.js
```

### 2. Check if both servers are running:
When you run `npm run dev:full`, you should see BOTH:
```
[0] 
[0]   VITE v5.4.2  ready in 500 ms
[0] 
[0]   ➜  Local:   http://localhost:5173/
[0]   ➜  Network: http://192.168.x.x:5173/
[1] 🚀 Nathir Travels server running on port 5000
[1] 📧 Email service configured for: your-email@gmail.com
```

### 3. Test the servers individually:

**Test Frontend:**
```bash
curl http://localhost:5173
```
Should return HTML content.

**Test Backend:**
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"Server is running","timestamp":"..."}`

### 4. Common Issues & Fixes:

#### Issue: Only backend starts, no frontend
**Solution:** Make sure you have all dependencies:
```bash
npm install --save-dev @vitejs/plugin-react
npm install react react-dom
```

#### Issue: Frontend starts but shows blank page
**Solution:** Check browser console (F12) for errors. Common fixes:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install

# Try running with explicit host
npm run dev -- --host 0.0.0.0
```

#### Issue: Permission errors
**Solution:**
```bash
sudo chown -R $USER:$USER .
chmod +x debug-check.js
```

#### Issue: Port already in use
**Solution:**
```bash
# Kill processes on ports
sudo lsof -ti:5173 | xargs kill -9
sudo lsof -ti:5000 | xargs kill -9

# Or change ports in .env
echo "PORT=3001" >> .env
```

### 5. Manual Testing Steps:

1. **Stop all processes:** Ctrl+C
2. **Run backend only:**
   ```bash
   npm run server
   ```
   Should show: "🚀 Nathir Travels server running on port 5000"

3. **In new terminal, run frontend only:**
   ```bash
   npm run dev
   ```
   Should show Vite dev server starting

4. **Test the website:** Open http://localhost:5173

### 6. If still blank page:

**Check these files exist and have content:**
- `src/App.tsx` - Main React component
- `src/main.tsx` - React entry point  
- `index.html` - HTML template
- `src/index.css` - Styles

**Check browser developer tools:**
1. Press F12
2. Go to Console tab
3. Look for any red errors
4. Go to Network tab, refresh page
5. Check if files are loading (should see index.html, main.tsx, etc.)

### 7. Nuclear Option - Complete Reset:

```bash
# Remove everything
rm -rf node_modules package-lock.json

# Reinstall with specific versions
npm install react@18.3.1 react-dom@18.3.1
npm install @vitejs/plugin-react@4.3.1 vite@5.4.2
npm install express@5.1.0 cors@2.8.5 nodemailer@7.0.5 dotenv@17.2.1
npm install concurrently@8.2.2 --save-dev

# Try again
npm run dev:full
```

### 8. Alternative: Run with different commands

Instead of `npm run dev:full`, try:
```bash
# Terminal 1
node server.js

# Terminal 2  
npx vite --host 0.0.0.0
```

The website should now work at http://localhost:5173!