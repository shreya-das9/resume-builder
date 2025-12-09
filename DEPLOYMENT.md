# Resume Builder - Deployment Guide

## Quick Deployment (Vercel + Render + MongoDB Atlas)

### Prerequisites
- GitHub account (to push your code)
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (already have this ✓)

---

## STEP 1: Push Your Project to GitHub

1. Initialize git and push to GitHub:
```bash
cd d:\Resume-Builder
git init
git add .
git commit -m "Initial commit - Resume Builder"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-builder.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## STEP 2: Deploy Backend to Render

1. Go to **https://render.com**
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Select the `backend` folder as the root directory
6. Fill in:
   - **Name**: `resume-builder-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Region**: Choose closest to you

7. Click **"Advanced"** and add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `PORT`: 8000
   - `NODE_ENV`: production
   - `CLIENT_URL`: (Leave blank for now, update after frontend deployment)

8. Click **"Create Web Service"**
9. Wait for deployment (~5 minutes)
10. Copy the deployed URL (e.g., `https://resume-builder-api.onrender.com`)

---

## STEP 3: Deploy Frontend to Vercel

1. Go to **https://vercel.com**
2. Sign up/Login with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select your `resume-builder` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `resume-builder` (select this folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variable:
   - **Name**: `VITE_API_URL` or update in code
   - **Value**: Your Render backend URL (from Step 2)

7. Click **"Deploy"**
8. Wait for deployment (~2-3 minutes)
9. Copy the deployed frontend URL (e.g., `https://resume-builder-xxx.vercel.app`)

---

## STEP 4: Update Backend CORS

1. Go back to **Render Dashboard**
2. Select your backend service
3. Go to **"Environment"**
4. Update `CLIENT_URL` with your Vercel frontend URL
5. Your backend will auto-redeploy

---

## STEP 5: Update Frontend API URL

Update your frontend to use the backend URL:

**File**: `resume-builder/src/utils/apiPaths.js`

```javascript
export const BASE_URL = "https://resume-builder-api.onrender.com";
// Replace with your actual Render backend URL
```

Then push to GitHub:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Vercel will auto-redeploy.

---

## STEP 6: Test Your Deployment

1. Open your Vercel frontend URL in browser
2. Try signing up with a new account
3. The data should be saved to MongoDB Atlas
4. Try logging back in - it should work!

---

## What You Can Share

Once deployed, share this link with anyone:
```
https://your-resume-builder-xxx.vercel.app
```

They can:
- Create an account
- Build their resume
- Download as PDF
- All data is saved to your MongoDB database

---

## Troubleshooting

### Frontend not connecting to backend:
- Check that `BASE_URL` in `apiPaths.js` matches your Render URL
- Check CORS settings in backend `server.js`
- Check browser console for errors

### Backend deployment fails:
- Check that all required environment variables are set
- Check the deployment logs on Render dashboard
- Verify MongoDB connection string is correct

### MongoDB connection issues:
- Verify IP whitelist on MongoDB Atlas (allow 0.0.0.0/0 for any IP)
- Check connection string has correct username/password
- Check network connectivity

---

## Optional: Custom Domain

Want a custom domain like `myresume.com`?
1. Buy domain from Godaddy, Namecheap, etc.
2. Update DNS records to point to Vercel
3. Add domain in Vercel settings

---

## Cost Breakdown

- **Vercel Frontend**: FREE tier (included)
- **Render Backend**: FREE tier (includes 750 compute hours/month)
- **MongoDB Atlas**: FREE tier (512 MB storage)
- **Total**: $0 per month (unless you need more)

---

## Next Steps

1. Create GitHub repository
2. Push your code
3. Deploy backend on Render
4. Deploy frontend on Vercel
5. Share the link!

Need help with any step? Let me know!
