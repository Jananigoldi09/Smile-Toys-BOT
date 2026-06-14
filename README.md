# SmileToys Bot - Deployment Guide (Free with Google Gemini)

## Step 1: Get your FREE Gemini API Key

1. Go to **aistudio.google.com/app/apikey**
1. Sign in with any Google account (no payment needed!)
1. Click **“Create API Key”**
1. Copy the key (starts with `AIza...`)

## Step 2: Deploy to Railway (Free)

1. Go to **railway.app** and sign up with GitHub
1. Click **“New Project”** -> **“Deploy from GitHub repo”**
1. Upload these files to a GitHub repo first (see Step 2a below)
1. In Railway, go to your project -> Variables tab
1. Add: `GEMINI_API_KEY` = your key from Step 1
1. Railway auto-deploys and gives you a URL like `smiletoys.up.railway.app`

## Step 2a: Upload to GitHub

1. Go to **github.com** -> sign up if needed
1. Click **“New repository”** -> name it `smiletoys-bot`
1. Click **“uploading an existing file”**
1. Drag in: server.js, package.json, README.md, and the public folder (with index.html inside)
1. Click **“Commit changes”**

## Files in this project

- `server.js` - Backend (calls Gemini securely)
- `public/index.html` - The SmileToys bot frontend
- `package.json` - Dependencies

## Run locally (for testing)

```
npm install
GEMINI_API_KEY=your_key_here npm start
```

Then open <http://localhost:3000>

## Free tier limits

Gemini 1.5 Flash free tier: ~1,500 requests/day, 15 requests/minute.
More than enough for a small business chatbot!