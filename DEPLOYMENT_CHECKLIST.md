# 📋 Deployment Checklist

## Before Deploying to Render

### ✅ Backend Fixes Applied:
- [x] Added default value for `AI_SERVICE_URL` in production
- [x] Fixed CORS configuration to use environment variables
- [x] Removed hardcoded profile selection
- [x] Added better logging to AIClientService
- [x] Fixed database driver configuration

### 🔧 Required Environment Variables on Render:

Copy these to your Render service:

```bash
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=<from-render-postgres>
DATABASE_USERNAME=<from-render-postgres>
DATABASE_PASSWORD=<from-render-postgres>
AI_SERVICE_URL=https://ameera09-ai-service.hf.space/analyze
ALLOWED_ORIGINS=https://deepwork-ai-one.vercel.app
PORT=8081
JAVA_TOOL_OPTIONS=-Xmx512m -Xms256m
```

### 📝 Steps to Redeploy:

1. **Commit and push the fixes:**
   ```bash
   cd d:\deepwork-ai
   git add .
   git commit -m "fix: add default AI service URL and improve production config"
   git push origin main
   ```

2. **Render will auto-deploy** (if auto-deploy is enabled)
   - Or manually click "Deploy latest commit" in Render dashboard

3. **Wait for deployment** (check logs)

4. **Verify health:**
   ```bash
   curl https://your-backend-url.onrender.com/actuator/health
   ```

5. **Test API:**
   ```bash
   curl https://your-backend-url.onrender.com/api/meetings
   ```

---

## 🐛 Common Errors & Solutions

### Error 500: Internal Server Error

**Likely causes:**
1. Missing environment variable → Check all required vars are set
2. Database connection failed → Verify DATABASE_URL
3. AI service unreachable → Check AI_SERVICE_URL

**How to diagnose:**
1. Check Render logs (Dashboard → Your Service → Logs)
2. Look for error messages during startup
3. Verify environment variables are set correctly

### Error: "Could not resolve placeholder"

**Solution:** Add the missing environment variable in Render

Example error:
```
Could not resolve placeholder 'AI_SERVICE_URL' in value "${AI_SERVICE_URL}"
```

**Fix:** Go to Render → Environment → Add Variable:
```
AI_SERVICE_URL=https://ameera09-ai-service.hf.space/analyze
```

### Error: Database connection failed

**Check:**
1. DATABASE_URL format: `postgresql://user:password@host:port/database`
2. Use **Internal Database URL** from Render (not External)
3. Username and password match exactly
4. Database exists

### Slow startup / Timeout

**Render free tier limitations:**
- Services spin down after 15 minutes
- Cold start takes 30-60 seconds
- Health check grace period: set to 300 seconds

---

## ✅ Post-Deployment Verification

### 1. Health Check
```bash
curl https://your-backend-url.onrender.com/actuator/health
```
Expected: `{"status":"UP"}`

### 2. Get Meetings
```bash
curl https://your-backend-url.onrender.com/api/meetings
```
Expected: `[]` or list of meetings

### 3. CORS Test
Open browser console on your frontend and check for CORS errors

### 4. Upload Test
Try uploading a small audio file through the frontend

---

## 🔄 If Still Getting 500 Error

### Immediate Actions:

1. **Check Render Logs:**
   - Dashboard → Your Service → Logs
   - Look for the actual error message

2. **Verify ALL environment variables are set:**
   ```
   ✓ SPRING_PROFILES_ACTIVE
   ✓ DATABASE_URL
   ✓ DATABASE_USERNAME  
   ✓ DATABASE_PASSWORD
   ✓ AI_SERVICE_URL
   ```

3. **Test database connection separately:**
   Use Render's database shell to verify it's accessible

4. **Test AI service URL:**
   ```bash
   curl https://ameera09-ai-service.hf.space/health
   ```

5. **Check for typos:**
   - Environment variable names (case-sensitive!)
   - Database credentials
   - URLs (no trailing spaces)

---

## 📞 Next Steps

After deployment is successful:

1. Update frontend `.env.production` with new backend URL
2. Test complete flow: upload → process → view results
3. Monitor Render logs for any issues
4. Set up uptime monitoring (optional)

---

**🎯 Goal: See this in Render logs:**
```
Started DeepworkAiApplication in X.XXX seconds
Tomcat started on port 8081 (http) with context path '/'
```

**Then your 500 error should be gone!** ✅
