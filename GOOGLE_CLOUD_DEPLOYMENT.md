# Google Cloud Run Deployment - Emily B Realty

## Configuration

- **Project ID**: `telepay-459221`
- **Service Name**: `emily-b-realty`
- **Region**: `us-east1`
- **Resources**: 1 CPU, 2GB RAM
- **Access**: Public (anyone with URL can access)

---

## Prerequisites

### 1. Install Google Cloud SDK

If you don't have `gcloud` installed:

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash

# Restart your shell
exec -l $SHELL

# Initialize gcloud
gcloud init
```

### 2. Authenticate

```bash
# Login to Google Cloud
gcloud auth login

# Set your project
gcloud config set project telepay-459221

# Enable required APIs (first time only)
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 3. Configure Docker

```bash
# Configure Docker to use gcloud credentials
gcloud auth configure-docker
```

---

## Quick Deployment

### One-Command Deploy

```bash
# Make script executable
chmod +x deploy-gcloud.sh

# Deploy
./deploy-gcloud.sh
```

The script will:
1. ✓ Build Docker image
2. ✓ Push to Google Container Registry
3. ✓ Deploy to Cloud Run with 1 CPU & 2GB RAM
4. ✓ Make it publicly accessible
5. ✓ Return your public URL

**Expected URL format**: `https://emily-b-realty-xxxxx-ue.a.run.app`

---

## Manual Deployment Steps

If you prefer manual control:

### Step 1: Build Docker Image

```bash
docker build -t gcr.io/telepay-459221/emily-b-realty:latest .
```

### Step 2: Push to Container Registry

```bash
docker push gcr.io/telepay-459221/emily-b-realty:latest
```

### Step 3: Deploy to Cloud Run

```bash
gcloud run deploy emily-b-realty \
    --image gcr.io/telepay-459221/emily-b-realty:latest \
    --platform managed \
    --region us-east1 \
    --allow-unauthenticated \
    --cpu 1 \
    --memory 2Gi \
    --port 3000 \
    --max-instances 10 \
    --set-env-vars "NODE_ENV=production,PORT=3000"
```

### Step 4: Get Your URL

```bash
gcloud run services describe emily-b-realty \
    --region us-east1 \
    --format 'value(status.url)'
```

---

## Update Deployment

When you make changes to the code:

```bash
# Pull latest changes
git pull

# Redeploy (rebuilds and pushes automatically)
./deploy-gcloud.sh
```

Or manually:

```bash
docker build -t gcr.io/telepay-459221/emily-b-realty:latest .
docker push gcr.io/telepay-459221/emily-b-realty:latest
gcloud run deploy emily-b-realty \
    --image gcr.io/telepay-459221/emily-b-realty:latest \
    --region us-east1
```

---

## Monitoring & Management

### View Logs

```bash
# Tail logs in real-time
gcloud run services logs tail emily-b-realty --region us-east1

# Read recent logs
gcloud run services logs read emily-b-realty --region us-east1 --limit 50
```

### Check Service Status

```bash
# Get service details
gcloud run services describe emily-b-realty --region us-east1

# List all Cloud Run services
gcloud run services list --region us-east1
```

### View Metrics

```bash
# Open Cloud Console
gcloud run services describe emily-b-realty --region us-east1 --format 'value(status.url)'

# Or visit: https://console.cloud.google.com/run
```

### Test Endpoints

```bash
# Get your URL
URL=$(gcloud run services describe emily-b-realty --region us-east1 --format 'value(status.url)')

# Test health endpoint
curl $URL/health

# Test webhook
curl -X POST $URL/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"test","data":"hello from phone"}'
```

---

## Cost Estimation

Cloud Run pricing (as of 2024):
- **First 2 million requests/month**: FREE
- **CPU**: $0.00002400 per vCPU-second
- **Memory**: $0.00000250 per GiB-second
- **Requests**: $0.40 per million requests

**Estimated monthly cost** for low traffic:
- ~1000 requests/month: **FREE** (within free tier)
- ~10,000 requests/month: **< $1**
- ~100,000 requests/month: **< $10**

Cloud Run only charges when processing requests (scales to zero).

---

## Scaling Configuration

Current settings:
- **Min instances**: 0 (scales to zero when idle)
- **Max instances**: 10
- **Concurrency**: 80 requests per instance
- **Timeout**: 300 seconds

### Adjust Scaling

```bash
# Increase max instances
gcloud run services update emily-b-realty \
    --region us-east1 \
    --max-instances 20

# Keep minimum 1 instance (faster response, but costs more)
gcloud run services update emily-b-realty \
    --region us-east1 \
    --min-instances 1
```

---

## Custom Domain (Optional)

### Add Custom Domain

```bash
# Map custom domain
gcloud run domain-mappings create \
    --service emily-b-realty \
    --domain your-domain.com \
    --region us-east1

# Follow DNS configuration instructions provided
```

---

## Webhook Setup for GitHub Auto-Deploy

### Option 1: Cloud Build Trigger (Recommended)

```bash
# Connect your GitHub repository
gcloud builds triggers create github \
    --name=emily-b-realty-deploy \
    --repo-name=WEBSITE_LIVETIME \
    --repo-owner=YossTechLLC \
    --branch-pattern="^main$|^claude/.*" \
    --build-config=cloudbuild.yaml
```

Create `cloudbuild.yaml`:

```yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/telepay-459221/emily-b-realty:latest', '.']

  # Push the container image to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/telepay-459221/emily-b-realty:latest']

  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'emily-b-realty'
      - '--image=gcr.io/telepay-459221/emily-b-realty:latest'
      - '--region=us-east1'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--cpu=1'
      - '--memory=2Gi'

images:
  - 'gcr.io/telepay-459221/emily-b-realty:latest'
```

---

## Troubleshooting

### Permission Denied

```bash
# Re-authenticate
gcloud auth login

# Check project
gcloud config get-value project

# Enable APIs if not enabled
gcloud services enable run.googleapis.com containerregistry.googleapis.com
```

### Docker Push Fails

```bash
# Reconfigure Docker
gcloud auth configure-docker

# Check you're logged in
gcloud auth list
```

### Service Not Accessible

```bash
# Ensure public access
gcloud run services add-iam-policy-binding emily-b-realty \
    --region=us-east1 \
    --member="allUsers" \
    --role="roles/run.invoker"
```

### Check Service Logs

```bash
# View recent errors
gcloud run services logs read emily-b-realty \
    --region us-east1 \
    --limit 100 \
    | grep ERROR
```

---

## Cleanup / Delete Service

```bash
# Delete the Cloud Run service
gcloud run services delete emily-b-realty --region us-east1

# Delete container images (optional)
gcloud container images delete gcr.io/telepay-459221/emily-b-realty:latest
```

---

## Quick Reference Commands

```bash
# Deploy/Update
./deploy-gcloud.sh

# Get URL
gcloud run services describe emily-b-realty --region us-east1 --format 'value(status.url)'

# View logs
gcloud run services logs tail emily-b-realty --region us-east1

# Delete service
gcloud run services delete emily-b-realty --region us-east1
```

---

## Access Your Website

After deployment, you'll receive a URL like:

**`https://emily-b-realty-xxxxx-ue.a.run.app`**

You can:
- ✓ Visit this URL from any device
- ✓ Access from your phone's browser
- ✓ Share with others
- ✓ Use the `/webhook` endpoint for integrations
- ✓ Check health at `/health`

**The website is publicly accessible - no authentication needed!**
