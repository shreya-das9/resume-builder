# 🚀 Resume Builder - Complete Deployment Guide

## Overview
Your Resume Builder is now ready to deploy! Follow these steps to make it live and shareable.

## What We've Prepared

✅ **Backend ready for Render**
- Environment variables documented in `.env.example`
- CORS configured for production
- MongoDB connection set up

✅ **Frontend ready for Vercel**
- Environment-aware API configuration
- Auto-detects dev vs production
- Support for environment variables

✅ **Database ready**
- MongoDB Atlas already configured
- All user data will be persisted

---

## Deployment Steps (15 minutes)

### Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
cd d:\Resume-Builder
git init
git add .
git commit -m "Resume Builder - Initial commit"

# Create a new repository on GitHub.com, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
git push -u origin main
```

### Step 2: Deploy Backend on Render (5 minutes)

1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub and select your `resume-builder` repo
4. Configure:
   ```
   Root Directory: backend
   Build Command: npm install
   Start Command: node server.js
   ```
5. Add Environment Variables (copy from your `.env` file):
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: 8000
   - `NODE_ENV`: production

6. Click **"Create Web Service"** and wait for deployment
7. **Copy your backend URL** (e.g., `https://resume-builder-api.onrender.com`)

### Step 3: Deploy Frontend on Vercel (5 minutes)

1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repo
4. Configure:
   ```
   Framework: Vite
   Root Directory: resume-builder
   Build Command: npm run build
   Output Directory: dist
   ```
5. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: Your Render backend URL from Step 2
   
6. Click **"Deploy"**
7. **Copy your frontend URL** when deployed (e.g., `https://resume-builder-xxx.vercel.app`)

### Step 4: Update Backend CORS (1 minute)

1. Go back to Render dashboard
2. Select your backend service
3. Go to **Environment** → Add/Update:
   - `CLIENT_URL`: Your Vercel frontend URL from Step 3
4. Render will auto-redeploy

### Step 5: Test

1. Open your Vercel frontend URL
2. Try signing up → should work!
3. Try logging in → should work!
4. Create a resume → data saved to MongoDB

---

## Share Your App

Once deployed, share this link:
```
https://your-frontend-url.vercel.app
```

Anyone can:
- Create their own account
- Build their resume
- Download as PDF
- All data is secure and persistent

---

## Free Tier Limits

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | Unlimited deployments | $0 |
| Render | 750 compute hours/month | $0 |
| MongoDB Atlas | 512 MB storage | $0 |
| **Total** | **Everything** | **$0/month** |

---

## Troubleshooting

**Frontend can't connect to backend:**
- Check `VITE_API_URL` environment variable in Vercel
- Verify Render backend is running (check Render dashboard)

**Login/Signup not working:**
- Check MongoDB connection in Render environment variables
- Verify `CLIENT_URL` in backend is set to your frontend URL

**Slow uploads:**
- Use Render's paid tier for faster performance
- Or optimize image sizes in frontend

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy backend on Render
3. ✅ Deploy frontend on Vercel
4. ✅ Test everything
5. ✅ Share with friends!

---

## Support

If you encounter issues:
1. Check Render deployment logs (Render dashboard)
2. Check Vercel deployment logs (Vercel dashboard)
3. Check browser console for frontend errors
4. Verify all environment variables are correct

Good luck! 🎉
