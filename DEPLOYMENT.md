# Vercel Deployment Guide

## Overview

This project has been configured to deploy on Vercel with serverless functions. The Express.js server (`server.js`) has been converted to Vercel serverless functions in the `/api` folder.

## What Changed

1. **Created `vercel.json`** - Configuration file for Vercel deployment
2. **Created `/api` folder** - Contains serverless functions:
   - `api/send.js` - Handles contact form submissions (replaces Express server)
   - `api/health.js` - Health check endpoint
3. **Updated `package.json`** - Added `vercel-build` script
4. **Frontend already configured** - Contact component automatically detects environment

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect the configuration

## Environment Variables

**IMPORTANT**: You must set up Gmail App Password for email functionality to work.

### Setting up Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**:
   - Go to Security > 2-Step Verification > App passwords
   - Select "Mail" as the app
   - Copy the 16-character password generated

3. **Set Environment Variables in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add these variables:
     - `EMAIL_USER`: `nathirtravels25@gmail.com`
     - `EMAIL_PASS`: `your_16_character_app_password`

### Local Development

For local testing, create a `.env.local` file in your project root:
```bash
EMAIL_USER=nathirtravels25@gmail.com
EMAIL_PASS=your_app_password_here
```

## API Endpoints

After deployment, your API will be available at:
- `https://your-domain.vercel.app/api/send` - Contact form submission
- `https://your-domain.vercel.app/api/health` - Health check

## Local Development

For local development with the serverless functions:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel dev`
3. This will start both the frontend and API functions locally

## Troubleshooting

### Email Not Working

**Common Issues & Solutions:**

1. **"Invalid login" error**:
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify 2-Factor Authentication is enabled on your Gmail account

2. **"Less secure app access" error**:
   - This is normal - Gmail requires App Passwords for SMTP
   - Use the App Password generated from Google Account settings

3. **"Connection timeout" error**:
   - Check your Vercel environment variables are set correctly
   - Verify the EMAIL_USER and EMAIL_PASS variables

4. **Emails not received**:
   - Check your spam/junk folder
   - Verify the recipient email is correct: `nathirtravels25@gmail.com`

**Testing Email Functionality:**
- Use the test script: `node test-api.js`
- Check Vercel function logs for detailed error messages

### CORS Issues
- CORS is already configured in the serverless functions
- If you encounter issues, check the CORS headers in `/api/send.js`

### Build Errors
- Ensure all dependencies are in `package.json`
- Check that the build script runs successfully: `npm run build`

## Alternative: Keep Express Server

If you prefer to keep the Express server running separately:

1. Deploy the frontend to Vercel
2. Deploy the Express server to:
   - Railway
   - Render
   - Heroku
   - DigitalOcean App Platform
   - AWS EC2

Then update the API URL in the Contact component to point to your server's URL.
