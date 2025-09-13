# Email Setup Guide for Nathir Travels

This guide will help you set up email functionality so you receive booking requests from your website.

## 🎯 Goal
Configure Gmail to send emails from `nathirtravels25@gmail.com` when customers submit the contact form.

## 📋 Prerequisites
- Access to the Gmail account: `nathirtravels25@gmail.com`
- Admin access to your Vercel project

## 🔧 Step-by-Step Setup

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **2-Step Verification**
3. Follow the prompts to enable it (you'll need your phone)

### Step 2: Generate App Password

1. In Google Account Security, click on **App passwords**
2. Select **Mail** from the dropdown
3. Click **Generate**
4. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
5. **Save this password** - you'll need it for Vercel

### Step 3: Configure Vercel Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Nathir Travels project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

   **Variable 1:**
   - Name: `EMAIL_USER`
   - Value: `nathirtravels25@gmail.com`
   - Environment: Production, Preview, Development

   **Variable 2:**
   - Name: `EMAIL_PASS`
   - Value: `your_16_character_app_password` (from Step 2)
   - Environment: Production, Preview, Development

5. Click **Save** for each variable

### Step 4: Redeploy Your Project

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on your latest deployment
3. Wait for deployment to complete

## ✅ Testing

### Test the Contact Form
1. Visit your deployed website
2. Fill out the contact form
3. Submit it
4. Check `nathirtravels25@gmail.com` for the email

### Check Vercel Logs
1. Go to **Functions** tab in Vercel
2. Click on your latest deployment
3. Check the logs for any errors

## 🚨 Troubleshooting

### "Invalid login" Error
- ❌ You're using your regular Gmail password
- ✅ Use the App Password from Step 2

### "Less secure app access" Error
- ❌ This is normal - Gmail blocks regular passwords
- ✅ Use App Password instead

### No Emails Received
1. Check spam/junk folder
2. Verify environment variables are set correctly
3. Check Vercel function logs for errors

### Connection Timeout
1. Verify `EMAIL_USER` and `EMAIL_PASS` are set
2. Make sure you copied the App Password correctly
3. Try redeploying the project

## 📧 Email Template

When working, you'll receive beautifully formatted emails with:
- Customer name and email
- Package type selected
- Travel date
- Additional comments
- Timestamp in East Africa Time

## 🔒 Security Notes

- Never share your App Password
- The App Password is only for this website
- You can revoke it anytime from Google Account settings
- Environment variables are encrypted in Vercel

## 📞 Support

If you're still having issues:
1. Check the Vercel function logs
2. Verify all environment variables are set
3. Test with a simple email first
4. Contact support if needed

---

**Remember**: The email will be sent from `nathirtravels25@gmail.com` to `nathirtravels25@gmail.com` (your own email), so you'll receive all booking requests directly in your inbox!
