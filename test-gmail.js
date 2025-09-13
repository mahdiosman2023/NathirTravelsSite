#!/usr/bin/env node

/**
 * Test Gmail App Password Configuration
 * Run this to verify your Gmail setup works
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

const testGmail = async () => {
  console.log('🧪 Testing Gmail App Password Configuration\n');
  
  // Check environment variables
  const emailUser = process.env.EMAIL_USER || 'nathirtravels25@gmail.com';
  const emailPass = process.env.EMAIL_PASS;
  
  console.log('📋 Configuration:');
  console.log(`   EMAIL_USER: ${emailUser}`);
  console.log(`   EMAIL_PASS: ${emailPass ? '✅ Set (' + emailPass.length + ' chars)' : '❌ Not set'}`);
  
  if (!emailPass) {
    console.log('\n❌ EMAIL_PASS is not set!');
    console.log('\n📝 To fix this:');
    console.log('   1. Create a .env.local file in your project root');
    console.log('   2. Add: EMAIL_PASS=your_gmail_app_password');
    console.log('   3. Make sure to use the 16-character App Password, not your regular password');
    return;
  }
  
  if (emailPass.length !== 16) {
    console.log('\n⚠️  EMAIL_PASS should be 16 characters long');
    console.log('   Make sure you\'re using the App Password, not your regular Gmail password');
    return;
  }
  
  console.log('\n🔧 Testing Gmail SMTP connection...');
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // Verify connection
    console.log('   Verifying SMTP connection...');
    await transporter.verify();
    console.log('   ✅ Gmail SMTP connection successful!');
    
    // Send test email
    console.log('\n📧 Sending test email...');
    const testEmail = {
      from: `"Nathir Travels Test" <${emailUser}>`,
      to: 'nathirtravels25@gmail.com',
      subject: '✅ Gmail Test - Configuration Working!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">✅ Gmail Configuration Test Successful!</h2>
          <p>Your Gmail App Password is working correctly.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>You can now deploy to Vercel and the contact form will work!</p>
        </div>
      `,
      text: 'Gmail configuration test successful! Your contact form will now work.'
    };
    
    const result = await transporter.sendMail(testEmail);
    console.log('   ✅ Test email sent successfully!');
    console.log(`   📧 Message ID: ${result.messageId}`);
    console.log('\n📬 Check nathirtravels25@gmail.com for the test email');
    console.log('\n🎉 Your Gmail configuration is working! You can now deploy to Vercel.');
    
  } catch (error) {
    console.log('   ❌ Gmail test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication failed. This usually means:');
      console.log('   - You\'re using your regular Gmail password instead of App Password');
      console.log('   - 2-Factor Authentication is not enabled');
      console.log('   - App Password is incorrect or expired');
      console.log('\n🔧 To fix:');
      console.log('   1. Go to https://myaccount.google.com/security');
      console.log('   2. Enable 2-Factor Authentication');
      console.log('   3. Generate a new App Password for "Mail"');
      console.log('   4. Use the 16-character App Password (not your regular password)');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Connection failed. Check your internet connection.');
    } else {
      console.log('\n💡 Error details:', error);
    }
  }
};

// Run the test
testGmail();
