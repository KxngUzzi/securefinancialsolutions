const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { name, email, phone, service, message } = data;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'All fields are required',
        }),
      };
    }

    // Service name mapping
    const serviceNames = {
      'debt-review': 'Debt Review',
      'debt-review-removal': 'Debt Review Removal',
      'debt-mediation': 'Debt Mediation',
      'general': 'General Inquiry',
    };

    const serviceName = serviceNames[service] || service;

    // Configure email transporter using GoDaddy email hosting
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtpout.secureserver.net',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || 'admin@Securefinancial.co.za',
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create email content for admin notification
    const adminMailOptions = {
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

    // Create auto-reply email for customer
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

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(autoReplyOptions);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Thank you! Your inquiry has been submitted successfully. We will contact you shortly.',
      }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error.message || 'An error occurred while processing your request. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      }),
    };
  }
};
