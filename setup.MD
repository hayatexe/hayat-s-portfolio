# 🚀 Contact Form Setup Guide

This guide will help you set up the contact form for your portfolio.

## Prerequisites

- A GitHub account
- An EmailJS account (free tier available)
- Basic knowledge of HTML/JavaScript

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
2. Set Up EmailJS
Go to EmailJS and create a free account

Add Email Service:

Go to Email Services
Click "Add New Service"
Choose your email provider (Gmail, Outlook, etc.)
Follow the connection steps
Note down your Service ID
Create Email Template:

Go to Email Templates
Click "Create New Template"
Use these template variables:
text

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Message: {{message}}
Note down your Template ID
Get Your Public Key:

Go to Account → General
Copy your Public Key
3. Configure Your Application
Option A: Using config.js (Recommended for Client-Side)
Copy the example config:

Bash

cp config.example.js config.js
Edit config.js and replace the placeholder values:

JavaScript

emailjs: {
    publicKey: 'your_actual_public_key',
    serviceId: 'your_actual_service_id',
    templateId: 'your_actual_template_id',
    // ...
},
contact: {
    email: 'your-email@example.com'
}
The config.js file is already in .gitignore and won't be committed

Option B: Using .env (For Build Process)
Copy the example env:

Bash

cp .env.example .env
Edit .env and fill in your values:

env

EMAILJS_PUBLIC_KEY=your_actual_public_key
EMAILJS_SERVICE_ID=your_actual_service_id
EMAILJS_TEMPLATE_ID=your_actual_template_id
CONTACT_EMAIL=your-email@example.com
You'll need a build process to inject these into your config.js

4. Test the Contact Form
Open your website locally or deploy it
Fill out the contact form
Submit and check:
Browser console for any errors
Your email inbox for the message
EmailJS dashboard for sent emails
5. Troubleshooting
EmailJS Not Loading
Check browser console for errors
Verify EmailJS script is loaded in HTML
Check your Public Key is correct
Email Not Sending
Verify Service ID and Template ID are correct
Check EmailJS dashboard for error logs
Ensure template variables match your code
Form Validation Issues
Check browser console for validation errors
Verify all form field IDs match your config
🔒 Security Notes
✅ Never commit config.js or .env to version control
✅ Your .gitignore is already set up to prevent this
✅ EmailJS Public Key is safe to expose (it's meant for client-side)
✅ Keep your EmailJS account password secure
✅ Use EmailJS dashboard to monitor and limit requests
📝 Customization
You can customize various aspects in config.js:

Validation rules: Minimum lengths, regex patterns
UI timing: Animation durations, delays
Messages: Success/error messages, validation text
Confetti: Colors, count, animation
Spam protection: Honeypot field name, minimum form time