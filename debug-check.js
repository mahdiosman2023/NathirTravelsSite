#!/usr/bin/env node

console.log('🔍 Debugging Nathir Travels Setup...\n');

// Check Node.js version
console.log('Node.js version:', process.version);

// Check if required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'index.html',
  'server.js',
  '.env'
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Check .env file content
console.log('\n📧 Checking .env configuration:');
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const hasEmailUser = envContent.includes('EMAIL_USER=') && !envContent.includes('EMAIL_USER=your-gmail');
  const hasEmailPass = envContent.includes('EMAIL_PASS=') && !envContent.includes('EMAIL_PASS=your-gmail');
  const hasPort = envContent.includes('PORT=');
  
  console.log(`  ${hasEmailUser ? '✅' : '❌'} EMAIL_USER configured`);
  console.log(`  ${hasEmailPass ? '✅' : '❌'} EMAIL_PASS configured`);
  console.log(`  ${hasPort ? '✅' : '❌'} PORT configured`);
} else {
  console.log('  ❌ .env file missing');
}

// Check package.json
console.log('\n📦 Checking package.json:');
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`  ✅ Name: ${pkg.name}`);
  console.log(`  ${pkg.type ? '⚠️' : '✅'} Module type: ${pkg.type || 'CommonJS (good for Ubuntu)'}`);
  console.log(`  ✅ Scripts available: ${Object.keys(pkg.scripts).join(', ')}`);
}

console.log('\n🚀 Next steps:');
console.log('1. Run: npm run dev:full');
console.log('2. Check both servers start (frontend on :5173, backend on :5000)');
console.log('3. Open: http://localhost:5173');
console.log('4. Check browser console (F12) for any errors');
console.log('\n💡 If still blank, run: curl http://localhost:5173');