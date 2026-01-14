# Secure Financial Solutions Website

A modern, professional website for a debt review call center specializing in debt review, debt review removal, and debt mediation services.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Service Sections**: Detailed information about all three core services
- **Contact Form**: Functional contact form for client inquiries
- **Smooth Navigation**: Fixed navigation bar with smooth scrolling
- **Mobile Menu**: Hamburger menu for mobile devices
- **Performance Optimized**: Lightweight and fast-loading

## Services Offered

1. **Debt Review**: Comprehensive debt review services with creditor negotiations and structured repayment plans
2. **Debt Review Removal**: Expert assistance in removing debt review status and restoring credit profile
3. **Debt Mediation**: Professional mediation services for resolving creditor disputes

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- An email account for sending notifications (Gmail, Outlook, or any SMTP server)

### Installation

1. Clone or download this repository
2. Open a terminal in the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment example file:
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux: `cp .env.example .env`)
5. Configure your email settings in the `.env` file (see Email Configuration below)
6. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```
7. Open your browser and navigate to `http://localhost:3000`

### File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All CSS styling
├── script.js           # Frontend JavaScript
├── server.js           # Backend Express server
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── .env                # Your environment variables (create this)
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Customization

### Contact Information

Update the contact details in `index.html`:
- Phone numbers (lines 157-158)
- Email addresses (lines 167-168)
- Office hours (lines 177-179)

### Colors

Modify the CSS variables in `styles.css` (lines 5-14) to change the color scheme:
- `--primary-color`: Main brand color
- `--secondary-color`: Accent color
- Other color variables for text and backgrounds

### Content

All content can be edited directly in `index.html`:
- Hero section text
- Service descriptions
- About section
- Statistics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Backend Setup

### Email Configuration

The backend uses Nodemailer to send email notifications. Configure your email settings in the `.env` file:

#### For Gmail:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Create an app password for "Mail"
3. Add to `.env`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password-here
   # For GoDaddy Workspace Email / Microsoft 365:
   EMAIL_HOST=smtp.office365.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=admin@securefinancial.co.za
   EMAIL_PASS=your-email-password
   EMAIL_FROM="Secure Financial Solutions <admin@securefinancial.co.za>"
   EMAIL_TO=admin@securefinancial.co.za
   
   # Alternative for GoDaddy Email Hosting:
   # EMAIL_HOST=smtpout.secureserver.net
   # EMAIL_PORT=587
   # EMAIL_SECURE=false
   # EMAIL_USER=admin@securefinancial.co.za
   ```

#### For Other Email Providers:

Update the SMTP settings in `.env` according to your provider:
- **Outlook/Hotmail**: `smtp-mail.outlook.com`, port 587
- **Yahoo**: `smtp.mail.yahoo.com`, port 587
- **Custom SMTP**: Use your provider's SMTP settings

### API Endpoints

- **POST `/api/contact`** - Submit contact form
  - Validates form data
  - Sends email notification to admin
  - Sends auto-reply to customer
  - Returns success/error response

- **GET `/api/health`** - Health check endpoint

### Form Validation

The backend validates:
- Name: 2-100 characters
- Email: Valid email format
- Phone: 10-20 characters
- Service: Must be selected
- Message: 10-1000 characters

### Email Features

- **Admin Notification**: Sends formatted email with all form details
- **Auto-Reply**: Sends confirmation email to customer
- **HTML & Plain Text**: Emails sent in both formats
- **Error Handling**: Gracefully handles email failures

### Development Mode

For development without email configuration, the server will:
- Still accept form submissions
- Log submissions to console
- Return success responses
- Display warning about email configuration

### Production Deployment

For production deployment:

1. Set all environment variables in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name secure-financial
   ```
3. Set up reverse proxy (nginx, Apache) if needed
4. Configure SSL/HTTPS
5. Update API URL in `script.js` if using different domain

### Troubleshooting

**Email not sending?**
- Check `.env` file exists and has correct values
- Verify email credentials are correct
- For Gmail, ensure App Password is used (not regular password)
- Check firewall/network allows SMTP connections

**Form submission fails?**
- Check browser console for errors
- Verify server is running on correct port
- Check CORS settings if frontend/backend on different domains
- Verify API endpoint URL in `script.js`

## License

This project is open source and available for use.

## Support

For questions or support, please contact the development team.
