# ✅ Resume Builder - Pre-Deployment Checklist

## Before You Deploy

### Backend Checks
- [x] MongoDB connection string set in `.env`
- [x] JWT_SECRET configured
- [x] PORT set to 8000
- [x] CORS enabled with flexible origin
- [x] All routes working locally
- [x] `.env.example` created

### Frontend Checks
- [x] API URL configured for both dev and production
- [x] Environment variables documented
- [x] Build works: `npm run build`
- [x] No console errors in development

### Database Checks
- [x] MongoDB Atlas cluster created
- [x] Database user created (shreya/Test123)
- [x] IP whitelist set (allow all: 0.0.0.0/0)
- [x] Connection string verified

---

## Deployment Sequence

### 1️⃣ GitHub (5 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/resume-builder
git push -u origin main
```

### 2️⃣ Render Backend (5 min)
- Create Web Service
- Select GitHub repo
- Root: `backend`
- Build: `npm install`
- Start: `node server.js`
- Set environment variables
- Deploy
- Copy backend URL

### 3️⃣ Vercel Frontend (3 min)
- Create Project
- Select GitHub repo
- Root: `resume-builder`
- Build: `npm run build`
- Output: `dist`
- Set `VITE_API_URL` to Render URL
- Deploy
- Copy frontend URL

### 4️⃣ Update Backend CORS (1 min)
- Go to Render backend
- Update `CLIENT_URL` with Vercel frontend URL
- Auto-redeploys

### 5️⃣ Test (2 min)
- Open frontend URL
- Sign up
- Login
- Create resume

---

## URLs After Deployment

**Frontend:** https://your-app.vercel.app
**Backend:** https://your-api.onrender.com

Share the frontend URL with anyone!

---

## Estimated Total Time: 20 minutes

Good luck! 🚀
