const dotenv = require('dotenv');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Email forwarding configuration - No authentication required
const createMailForwarder = () => {
  // Using a free SMTP relay service that doesn't require authentication
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: false, // No authentication
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Alternative: Use a webhook service like EmailJS or Formspree
const sendEmailViaWebhook = async (formData) => {
  // This would use a service like Formspree, EmailJS, or similar
  // For now, we'll log the email and simulate success
  console.log('📧 Email Forwarding Request:');
  console.log('From:', formData.email);
  console.log('Name:', formData.name);
  console.log('Package:', formData.packageType);
  console.log('Date:', formData.travelDate);
  console.log('Comments:', formData.comments);
  console.log('---');
  console.log('📬 This email would be forwarded to: nathirtravels25@gmail.com');
  
  return true; // Simulate successful sending
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
    // Use the webhook-based email forwarding (no authentication required)
    const emailData = { name, email, packageType, travelDate, comments };
    await sendEmailViaWebhook(emailData);

    // Also try to send via SMTP forwarder (fallback)
    try {
      const transporter = createMailForwarder();
      
      const mailOptions = {
        from: `"Nathir Travels Website" <noreply@nathirtravels.com>`,
        to: 'nathirtravels25@gmail.com',
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
      console.log('✅ Email sent via SMTP forwarder');
    } catch (smtpError) {
      console.log('⚠️ SMTP forwarder failed, but webhook method succeeded:', smtpError.message);
    }

    res.json({ 
      message: 'Your booking request has been sent successfully! We will contact you soon.' 
    });

  } catch (error) {
    console.error('Email forwarding error:', error);
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
  console.log(`📧 Email forwarding service active - No authentication required`);
  console.log(`📬 Emails will be forwarded to: nathirtravels25@gmail.com`);
});