const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Configure Nodemailer transporter
const createTransporter = () => {
  // For production, use your email service credentials
  // For Gmail, you'll need an App Password
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  
  // For development/testing, use Ethereal Email (fake SMTP)
  return nodemailer.createTransporter({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass',
    },
  });
};

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Please provide a valid phone number'),
  body('service')
    .notEmpty()
    .withMessage('Please select a service'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
];

// Contact form submission endpoint
app.post('/api/contact', contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Service name mapping
    const serviceNames = {
      'debt-review': 'Debt Review',
      'debt-review-removal': 'Debt Review Removal',
      'debt-mediation': 'Debt Mediation',
      'general': 'General Inquiry',
    };

    const serviceName = serviceNames[service] || service;

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Secure Financial Solutions" <admin@Securefinancial.co.za>`,
      to: process.env.EMAIL_TO || 'admin@Securefinancial.co.za',
      replyTo: email,
      subject: `New Contact Form Submission - ${serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            This email was sent from the Secure Financial Solutions contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${serviceName}

Message:
${message}
      `,
    };

    // Send email
    const transporter = createTransporter();
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);

      // Send auto-reply to customer
      const autoReplyOptions = {
        from: process.env.EMAIL_FROM || `"Secure Financial Solutions" <admin@Securefinancial.co.za>`,
        to: email,
        subject: 'Thank you for contacting Secure Financial Solutions',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank You for Your Inquiry</h2>
            <p>Dear ${name},</p>
            <p>Thank you for contacting Secure Financial Solutions. We have received your inquiry regarding <strong>${serviceName}</strong> and will get back to you as soon as possible.</p>
            <p>Our team typically responds within 24-48 hours during business days.</p>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your Inquiry Details:</strong></p>
              <p>Service: ${serviceName}</p>
              <p>Phone: ${phone}</p>
            </div>
            <p>If you have any urgent questions, please feel free to call us at:</p>
            <p><strong>0832759626</strong></p>
            <p>Best regards,<br>Secure Financial Solutions Team</p>
          </div>
        `,
        text: `
Thank You for Your Inquiry

Dear ${name},

Thank you for contacting Secure Financial Solutions. We have received your inquiry regarding ${serviceName} and will get back to you as soon as possible.

Our team typically responds within 24-48 hours during business days.

Your Inquiry Details:
Service: ${serviceName}
Phone: ${phone}

If you have any urgent questions, please feel free to call us at: 0832759626

Best regards,
Secure Financial Solutions Team
        `,
      };

      await transporter.sendMail(autoReplyOptions);
      console.log('Auto-reply sent to customer');

      // Success response
      res.json({
        success: true,
        message: 'Thank you! Your inquiry has been submitted successfully. We will contact you shortly.',
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      
      // Even if email fails, we still log the submission
      console.log('Form submission received:', {
        name,
        email,
        phone,
        service: serviceName,
        message,
        timestamp: new Date().toISOString(),
      });

      // Return success but log the email error
      res.json({
        success: true,
        message: 'Thank you! Your inquiry has been received. We will contact you shortly.',
        warning: 'Email notification may be delayed. Your submission has been logged.',
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Contact form endpoint: http://localhost:${PORT}/api/contact`);
  
  if (!process.env.EMAIL_HOST) {
    console.log('\n⚠️  Email configuration not found in .env file');
    console.log('   The server will run but emails will not be sent.');
    console.log('   Please configure your email settings in .env file.\n');
  }
});
