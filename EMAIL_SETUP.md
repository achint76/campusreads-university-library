# Email Setup with Gmail SMTP

This project now uses Nodemailer with Gmail SMTP instead of Resend for sending emails.

## Setup Instructions

### 1. Enable 2-Factor Authentication
First, enable 2-Factor Authentication on your Gmail account:
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### 2. Generate App Password
1. Go to your Google Account settings
2. Navigate to Security
3. Under "2-Step Verification", click on "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Generate the app password
6. Copy the 16-character password

### 3. Environment Variables
Add these environment variables to your `.env.local` file:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Comment out or remove the old Resend token
# RESEND_TOKEN=your-resend-token
```

### 4. Important Notes
- Use your Gmail address as `GMAIL_USER`
- Use the 16-character app password (not your regular Gmail password)
- The app password is different from your regular Gmail password
- Keep your app password secure and don't commit it to version control

### 5. Testing
You can test the email functionality by making a POST request to `/api/email`:

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "recipient@example.com",
    "subject": "Test Email",
    "message": "<h1>Hello!</h1><p>This is a test email.</p>"
  }'
```

### 6. Troubleshooting
- If you get authentication errors, make sure 2FA is enabled and you're using the app password
- If emails are not sending, check your Gmail account for any security alerts
- Make sure your Gmail account allows "less secure app access" or use app passwords

## Code Changes Made

1. **New Files Created:**
   - `lib/email.ts` - Nodemailer email service
   - `app/api/email/route.ts` - Email API endpoint for testing
   - `EMAIL_SETUP.md` - This setup guide

2. **Files Modified:**
   - `lib/config.ts` - Added Gmail configuration, commented out Resend
   - `lib/workflow.ts` - Commented out Resend code, added Nodemailer integration

3. **Dependencies Added:**
   - `nodemailer` - For sending emails via SMTP
   - `@types/nodemailer` - TypeScript types for Nodemailer

The existing email functionality in your workflows and authentication will continue to work as before, but now using Gmail SMTP instead of Resend. 