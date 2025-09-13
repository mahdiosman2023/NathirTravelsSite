const nodemailer = require('nodemailer');

// Gmail SMTP configuration with proper authentication
const createMailTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || 'nathirtravels25@gmail.com',
      pass: process.env.EMAIL_PASS // App password for Gmail
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email using Gmail SMTP
const sendEmailViaSMTP = async (formData) => {
  try {
    const transporter = createMailTransporter();
    
    const mailOptions = {
      from: `"Nathir Travels Website" <${process.env.EMAIL_USER || 'nathirtravels25@gmail.com'}>`,
      to: 'nathirtravels25@gmail.com',
      subject: `New Booking Request from ${formData.name} - ${formData.packageType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Nathir Travels</h1>
            <p style="color: #ecfdf5; margin: 10px 0 0 0; font-size: 16px;">New Booking Request</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #059669;">
              <h2 style="color: #065f46; margin-top: 0; font-size: 20px;">Customer Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #6b7280;"><a href="mailto:${formData.email}" style="color: #059669; text-decoration: none;">${formData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Package:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${formData.packageType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Travel Date:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${new Date(formData.travelDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</td>
                </tr>
              </table>
            </div>

            ${formData.comments ? `
              <div style="background-color: #fefefe; padding: 25px; border-left: 4px solid #059669; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <h3 style="color: #065f46; margin-top: 0; font-size: 18px;">Additional Details</h3>
                <p style="line-height: 1.6; color: #374151; margin: 0;">${formData.comments}</p>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-radius: 8px; text-align: center;">
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
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the Nathir Travels website contact form.</p>
          </div>
        </div>
      `,
      text: `
        New Booking Request - Nathir Travels
        
        Customer Information:
        Name: ${formData.name}
        Email: ${formData.email}
        Package Type: ${formData.packageType}
        Travel Date: ${new Date(formData.travelDate).toLocaleDateString()}
        
        ${formData.comments ? `Additional Details:\n${formData.comments}\n` : ''}
        
        Submitted: ${new Date().toLocaleString()}
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, packageType, travelDate, comments } = req.body;

  // Validation
  if (!name || !email || !packageType || !travelDate) {
    return res.status(400).json({ 
      message: 'Please fill in all required fields (Name, Email, Package Type, and Travel Date).' 
    });
  }

  try {
    // Send email using Gmail SMTP
    const emailData = { name, email, packageType, travelDate, comments };
    const result = await sendEmailViaSMTP(emailData);

    if (result.success) {
      console.log('✅ Email sent successfully to nathirtravels25@gmail.com');
      res.json({ 
        message: 'Your booking request has been sent successfully! We will contact you soon.' 
      });
    } else {
      throw new Error('Email sending failed');
    }

  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    // Log the error details for debugging
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response
    });
    
    res.status(500).json({ 
      message: 'There was an error sending your request. Please try again later or contact us directly at nathirtravels25@gmail.com' 
    });
  }
}
