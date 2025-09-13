#!/usr/bin/env node

/**
 * Nathir Travels Email Setup Helper
 * This script helps you verify your email configuration
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

const testEmailConfiguration = async () => {
  console.log('🔧 Nathir Travels Email Setup Helper\n');
  
  // Check environment variables
  const emailUser = process.env.EMAIL_USER || 'nathirtravels25@gmail.com';
  const emailPass = process.env.EMAIL_PASS;
  
  console.log('📋 Configuration Check:');
  console.log(`   EMAIL_USER: ${emailUser}`);
  console.log(`   EMAIL_PASS: ${emailPass ? '✅ Set' : '❌ Not set'}`);
  
  if (!emailPass) {
    console.log('\n❌ EMAIL_PASS is not set!');
    console.log('\n📝 To fix this:');
    console.log('   1. Create a .env.local file in your project root');
    console.log('   2. Add: EMAIL_PASS=your_gmail_app_password');
    console.log('   3. See EMAIL_SETUP.md for detailed instructions');
    return;
  }
  
  console.log('\n🧪 Testing Gmail SMTP connection...');
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
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
    await transporter.verify();
    console.log('✅ Gmail SMTP connection successful!');
    
    // Send test email
    console.log('\n📧 Sending test email...');
    const testEmail = {
      from: `"Nathir Travels Test" <${emailUser}>`,
      to: 'nathirtravels25@gmail.com',
      subject: 'Test Email from Nathir Travels Setup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">✅ Email Setup Successful!</h2>
          <p>This is a test email from your Nathir Travels website setup.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>If you received this email, your configuration is working correctly!</p>
        </div>
      `,
      text: 'Email setup test - configuration is working correctly!'
    };
    
    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${result.messageId}`);
    console.log('\n📬 Check nathirtravels25@gmail.com for the test email');
    
  } catch (error) {
    console.log('❌ Email test failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication failed. This usually means:');
      console.log('   - You\'re using your regular Gmail password instead of App Password');
      console.log('   - 2-Factor Authentication is not enabled');
      console.log('   - App Password is incorrect');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Connection failed. This usually means:');
      console.log('   - Network connectivity issues');
      console.log('   - Gmail SMTP server is unreachable');
    }
    
    console.log('\n📖 See EMAIL_SETUP.md for detailed troubleshooting');
  }
};

// Run the test
testEmailConfiguration();
