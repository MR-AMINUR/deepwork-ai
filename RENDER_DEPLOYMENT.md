# 🚀 Render Deployment Guide for DeepWork AI

## 📋 Prerequisites

1. **Render Account**: Sign up at https://render.com
2. **GitHub Repository**: Push your code to GitHub
3. **HuggingFace Space** (for AI service): Already deployed at `https://ameera09-ai-service.hf.space`

---

## 🗄️ Step 1: Create PostgreSQL Database

1. Go to Render Dashboard → **New** → **PostgreSQL**
2. Configure:
   - **Name**: `deepwork-ai-db`
   - **Database**: `deepwork_ai`
   - **User**: (auto-generated)
   - **Region**: Choose nearest to you
   - **Plan**: Free tier is fine for testing
3. Click **Create Database**
4. **Copy the connection details** (you'll need these):
   - Internal Database URL
   - External Database URL
   - Username
   - Password

---

## 🌐 Step 2: Deploy Backend to Render

### Create Web Service

1. Go to Render Dashboard → **New** → **Web Service**
2. Connect your GitHub repository
3. Configure the service:

#### Basic Settings:
- **Name**: `deepwork-ai-backend`
- **Region**: Same as database
- **Branch**: `main`
- **Root Directory**: `backend/deepwork-ai`
- **Environment**: `Docker` or `Java`

#### Build Settings (if using Java):
- **Build Command**: `./mvnw clean package -DskipTests`
- **Start Command**: `java -jar target/deepwork-ai-0.0.1-SNAPSHOT.jar`

#### Build Settings (if using Docker):
- **Dockerfile Path**: `backend/deepwork-ai/Dockerfile`

### Environment Variables

Click **Advanced** → **Add Environment Variable** and add these:

```
# Required
SPRING_PROFILES_ACTIVE=prod

# Database - TWO OPTIONS:

# OPTION 1: Use Render's URL as-is (Automatic conversion)
# Our code will auto-convert postgres:// to jdbc:postgresql://
DATABASE_URL=postgresql://deepwork_ai_db_6d2c_user:PEaYO5fDQnFjxip0aOLjsf2EE7DH8KpW@dpg-d8rli96gvqtc73f772bg-a/deepwork_ai_db_6d2c

# OPTION 2: Manually add jdbc: prefix
# DATABASE_URL=jdbc:postgresql://deepwork_ai_db_6d2c_user:PEaYO5fDQnFjxip0aOLjsf2EE7DH8KpW@dpg-d8rli96gvqtc73f772bg-a/deepwork_ai_db_6d2c

# Username and password (optional if included in URL)
DATABASE_USERNAME=<your-db-username>
DATABASE_PASSWORD=<your-db-password>

AI_SERVICE_URL=https://ameera09-ai-service.hf.space/analyze

# Optional
PORT=8081
ALLOWED_ORIGINS=https://deepwork-ai-one.vercel.app

# Important for Render free tier
JAVA_TOOL_OPTIONS=-Xmx512m -Xms256m
```

#### 💡 Database URL Auto-Conversion

Our `DatabaseConfig` class **automatically converts** Render's URL format:

- **Render gives**: `postgres://user:pass@host/db` or `postgresql://user:pass@host/db`
- **Spring needs**: `jdbc:postgresql://user:pass@host/db`
- **Our code**: Automatically adds `jdbc:` prefix in production mode

So you can use Render's Internal Database URL **directly without modification**!

### Health Check Path:
- **Path**: `/actuator/health`
- **Grace Period**: 300 seconds (first startup is slow)

4. Click **Create Web Service**

---

## 🔍 Step 3: Verify Deployment

### Check Logs
1. Go to your service → **Logs** tab
2. Look for:
   ```
   Started DeepworkAiApplication in X seconds
   Tomcat started on port 8081
   ```

### Common Startup Errors:

#### Error: "Failed to configure a DataSource"
**Solution**: Check your `DATABASE_URL` environment variable

#### Error: "Connection refused" to AI service
**Solution**: Verify `AI_SERVICE_URL` is correct and accessible

#### Error: "Out of memory"
**Solution**: Add to environment variables:
```
JAVA_TOOL_OPTIONS=-Xmx512m -Xms256m
```

### Test Endpoints

Once deployed, test these endpoints (replace with your Render URL):

```bash
# Health check
curl https://deepwork-ai-backend.onrender.com/actuator/health

# Get meetings
curl https://deepwork-ai-backend.onrender.com/api/meetings

# Expected response for health:
{"status":"UP"}
```

---

## 🎨 Step 4: Update Frontend

Update your frontend `.env.production`:

```
VITE_API_BASE_URL=https://deepwork-ai-backend.onrender.com/api
```

Redeploy your frontend (Vercel will auto-deploy on git push).

---

## 📊 Step 5: Configure Database

Your database should auto-create tables on first run (thanks to `hibernate.ddl-auto=update`).

To verify:
1. Go to Render Dashboard → Your Database → **Connect**
2. Use the Web Shell or external tool
3. Check tables:
   ```sql
   \dt
   ```
   You should see: `meeting`, `summary`, `task`

---

## ⚙️ Environment Variables Reference

### Required:
| Variable | Example | Description |
|----------|---------|-------------|
| `SPRING_PROFILES_ACTIVE` | `prod` | Activates production profile |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | PostgreSQL connection |
| `DATABASE_USERNAME` | `postgres_user` | Database user |
| `DATABASE_PASSWORD` | `secret123` | Database password |
| `AI_SERVICE_URL` | `https://ai-service.hf.space/analyze` | AI service endpoint |

### Optional:
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8081` | Server port (Render sets this) |
| `ALLOWED_ORIGINS` | `https://deepwork-ai-one.vercel.app` | CORS origins (comma-separated) |
| `JAVA_TOOL_OPTIONS` | - | JVM options for memory |

---

## 🐛 Troubleshooting

### Issue: 500 Internal Server Error

**Check logs for:**

1. **Missing Environment Variable**
   ```
   Error: Could not resolve placeholder 'AI_SERVICE_URL'
   ```
   **Fix**: Add the missing environment variable

2. **Database Connection Failed**
   ```
   Unable to connect to database
   ```
   **Fix**: Verify DATABASE_URL, USERNAME, PASSWORD

3. **Out of Memory**
   ```
   java.lang.OutOfMemoryError
   ```
   **Fix**: Add JAVA_TOOL_OPTIONS with smaller heap

### Issue: Slow First Request (Render Free Tier)

Render free tier **spins down after 15 minutes** of inactivity.
- First request after spin-down takes 30-60 seconds
- Keep service active with uptime monitors (UptimeRobot, Cron-Job.org)

### Issue: Upload Timeout

Large files (>100MB) may timeout on Render free tier.
**Solutions**:
- Reduce file size limit in `application-prod.properties`
- Upgrade to paid tier with better resources
- Use background job processing

---

## 📈 Performance Tips

### 1. Database Connection Pooling
Add to `application-prod.properties`:
```properties
spring.datasource.hikari.maximum-pool-size=5
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.connection-timeout=30000
```

### 2. Reduce Startup Time
```properties
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false
logging.level.org.hibernate=WARN
```

### 3. Enable Response Compression
```properties
server.compression.enabled=true
server.compression.mime-types=application/json,application/xml,text/html,text/xml,text/plain
```

---

## 🔐 Security Checklist

Before going to production:

- [ ] All sensitive data in environment variables
- [ ] CORS restricted to your frontend domains only
- [ ] Database uses strong password
- [ ] SSL/HTTPS enabled (Render provides this automatically)
- [ ] File upload size limits configured
- [ ] Health check endpoint enabled
- [ ] Logging configured appropriately

---

## 🔄 Redeployment

### Manual Redeploy:
1. Push changes to GitHub
2. Render will auto-detect and redeploy

### Force Redeploy:
1. Go to your service in Render
2. Click **Manual Deploy** → **Deploy latest commit**

### Rollback:
1. Go to **Events** tab
2. Find previous successful deploy
3. Click **Rollback**

---

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Review environment variables
3. Test database connectivity
4. Verify AI service is accessible
5. Check GitHub issues for similar problems

---

**Your backend should now be successfully deployed to Render! 🎉**

**Live URL**: `https://your-service-name.onrender.com`
**Health Check**: `https://your-service-name.onrender.com/actuator/health`
