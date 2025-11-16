# DEPLOYMENT GUIDE - WEBSITE_LIVETIME

## Resource Specifications
- **CPU**: 1 CPU core
- **RAM**: 2GB memory
- **Port**: 3000 (internal), 80 (external)

---

## Prerequisites
- Docker installed
- Docker Compose installed (for Docker Compose deployment)
- kubectl configured (for Kubernetes deployment)
- Git configured for webhooks

---

## Deployment Options

### Option 1: Docker Deployment (Recommended for Quick Start)

#### Build and Run

```bash
# Build the Docker image
docker build -t website-livetime:latest .

# Run with resource limits (1 CPU, 2GB RAM)
docker run -d \
  --name website-livetime \
  --cpus="1" \
  --memory="2g" \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  website-livetime:latest

# Check container status
docker ps | grep website-livetime

# View logs
docker logs -f website-livetime

# Check health
curl http://localhost:3000/health
```

#### Stop and Remove

```bash
docker stop website-livetime
docker rm website-livetime
```

---

### Option 2: Docker Compose Deployment (Recommended for Production)

#### Deploy

```bash
# Start the service with resource limits
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Restart service
docker-compose restart

# Stop service
docker-compose down
```

#### Rebuild and Deploy

```bash
# Rebuild and restart
docker-compose up -d --build
```

---

### Option 3: Kubernetes Deployment

#### Deploy to Kubernetes

```bash
# Build and tag image (adjust registry as needed)
docker build -t website-livetime:latest .

# If using a registry, tag and push
docker tag website-livetime:latest your-registry/website-livetime:latest
docker push your-registry/website-livetime:latest

# Apply Kubernetes configuration
kubectl apply -f kubernetes-deployment.yaml

# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/website-livetime

# Check pod resources
kubectl top pod -l app=website-livetime
```

#### Scale Deployment

```bash
# Scale to multiple replicas
kubectl scale deployment website-livetime --replicas=3

# Auto-scale based on CPU usage
kubectl autoscale deployment website-livetime --cpu-percent=70 --min=1 --max=5
```

#### Update Deployment

```bash
# Update image
kubectl set image deployment/website-livetime website-livetime=website-livetime:v2

# Rollback if needed
kubectl rollout undo deployment/website-livetime
```

---

## Webhook Configuration

### GitHub Webhook Setup (Auto-Deploy on Push)

#### 1. Install Webhook Listener (Using webhook package)

```bash
# On your server, install webhook listener
npm install -g webhook

# Create webhook configuration file
cat > hooks.json << 'EOF'
[
  {
    "id": "deploy-website",
    "execute-command": "/path/to/deploy.sh",
    "command-working-directory": "/home/user/WEBSITE_LIVETIME",
    "response-message": "Deploying website...",
    "trigger-rule": {
      "match": {
        "type": "payload-hash-sha1",
        "secret": "YOUR_WEBHOOK_SECRET",
        "parameter": {
          "source": "header",
          "name": "X-Hub-Signature"
        }
      }
    }
  }
]
EOF

# Start webhook listener
webhook -hooks hooks.json -port 9000 -verbose
```

#### 2. Create Deployment Script

Create `/path/to/deploy.sh`:

```bash
#!/bin/bash
set -e

echo "Starting deployment..."

# Navigate to project directory
cd /home/user/WEBSITE_LIVETIME

# Pull latest changes
git pull origin claude/review-website-livetime-01H4kVgqe8B7sii7NrymGRKk

# Rebuild and restart with Docker Compose
docker-compose down
docker-compose up -d --build

echo "Deployment completed successfully!"
```

Make it executable:

```bash
chmod +x /path/to/deploy.sh
```

#### 3. Configure GitHub Webhook

1. Go to your GitHub repository settings
2. Navigate to **Webhooks** → **Add webhook**
3. Set **Payload URL**: `http://your-server-ip:9000/hooks/deploy-website`
4. Set **Content type**: `application/json`
5. Set **Secret**: `YOUR_WEBHOOK_SECRET` (same as in hooks.json)
6. Select **Just the push event**
7. Click **Add webhook**

---

### Application Webhook Endpoint

The application includes a webhook receiver endpoint:

```bash
# Test webhook endpoint
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": "hello"}'
```

**Webhook URL**: `http://your-domain:3000/webhook`

**Method**: POST

**Response**: JSON confirmation with timestamp

---

## Cloud Platform Deployments

### AWS ECS with 1 CPU, 2GB RAM

```bash
# Task definition snippet
{
  "containerDefinitions": [{
    "name": "website-livetime",
    "image": "website-livetime:latest",
    "cpu": 1024,
    "memory": 2048,
    "portMappings": [{
      "containerPort": 3000,
      "protocol": "tcp"
    }]
  }]
}
```

### Google Cloud Run

```bash
gcloud run deploy website-livetime \
  --image gcr.io/your-project/website-livetime \
  --platform managed \
  --region us-central1 \
  --cpu 1 \
  --memory 2Gi \
  --port 3000 \
  --allow-unauthenticated
```

### Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name website-livetime \
  --image website-livetime:latest \
  --cpu 1 \
  --memory 2 \
  --ports 3000 \
  --dns-name-label website-livetime \
  --restart-policy Always
```

### DigitalOcean App Platform

```yaml
# app.yaml
name: website-livetime
services:
- name: web
  source:
    repo: your-repo-url
    branch: claude/review-website-livetime-01H4kVgqe8B7sii7NrymGRKk
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xs  # 1 CPU, 2GB RAM
  http_port: 3000
  health_check:
    http_path: /health
```

Deploy:
```bash
doctl apps create --spec app.yaml
```

---

## Monitoring & Verification

### Health Check

```bash
# Check if service is running
curl http://localhost:3000/health

# Expected response:
# {"status":"healthy","timestamp":"2024-11-16T01:13:00.000Z","uptime":123}
```

### Resource Monitoring

```bash
# Docker stats
docker stats website-livetime

# Kubernetes resources
kubectl top pod -l app=website-livetime
```

### Test Webhook

```bash
# Test webhook endpoint
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "deployment",
    "source": "github",
    "timestamp": "2024-11-16T01:13:00Z"
  }'
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs website-livetime

# Inspect container
docker inspect website-livetime
```

### Resource limits exceeded

```bash
# Check current resource usage
docker stats website-livetime

# Adjust limits in docker-compose.yml or kubernetes-deployment.yaml
```

### Webhook not triggering

```bash
# Check webhook listener logs
# Verify GitHub webhook delivery in repository settings
# Test webhook endpoint manually with curl
```

---

## Security Recommendations

1. **Use HTTPS** for webhook endpoints in production
2. **Validate webhook signatures** to ensure requests are from GitHub
3. **Use environment variables** for secrets (never commit them)
4. **Implement rate limiting** on webhook endpoints
5. **Run containers as non-root user** in production

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start service |
| `docker-compose down` | Stop service |
| `docker-compose logs -f` | View logs |
| `docker-compose restart` | Restart service |
| `kubectl apply -f kubernetes-deployment.yaml` | Deploy to K8s |
| `kubectl get pods` | Check pod status |
| `curl http://localhost:3000/health` | Health check |
| `curl -X POST http://localhost:3000/webhook` | Test webhook |

---

## Next Steps

1. Choose your deployment method (Docker, Docker Compose, or Kubernetes)
2. Build and deploy using commands above
3. Configure webhooks for auto-deployment (optional)
4. Monitor health endpoint and logs
5. Scale as needed based on traffic

**Note**: All configurations include 1 CPU and 2GB RAM limits as specified.
