#!/bin/bash

# Google Cloud Run Deployment Script for Emily B Realty Website
# Project: telepay-459221
# Region: us-east1
# Service: emily-b-realty

set -e

# Configuration
PROJECT_ID="telepay-459221"
SERVICE_NAME="emily-b-realty"
REGION="us-east1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
CPU="1"
MEMORY="2Gi"
PORT="3000"

echo "🚀 Deploying Emily B Realty to Google Cloud Run"
echo "================================================"
echo "Project: ${PROJECT_ID}"
echo "Service: ${SERVICE_NAME}"
echo "Region: ${REGION}"
echo "Resources: ${CPU} CPU, ${MEMORY} RAM"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ ERROR: gcloud CLI is not installed"
    echo ""
    echo "Install gcloud CLI:"
    echo "  curl https://sdk.cloud.google.com | bash"
    echo "  exec -l \$SHELL"
    echo "  gcloud init"
    exit 1
fi

echo "✓ gcloud CLI found"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ ERROR: Docker is not installed"
    echo ""
    echo "Install Docker first (see SETUP.md)"
    exit 1
fi

echo "✓ Docker found"

# Set the project
echo ""
echo "Setting project to ${PROJECT_ID}..."
gcloud config set project ${PROJECT_ID}

# Configure Docker to use gcloud as credential helper
echo ""
echo "Configuring Docker authentication..."
gcloud auth configure-docker --quiet

# Build the Docker image
echo ""
echo "Building Docker image..."
docker build -t ${IMAGE_NAME}:latest .

# Tag with timestamp for versioning
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:${TIMESTAMP}

echo "✓ Image built: ${IMAGE_NAME}:latest"
echo "✓ Image tagged: ${IMAGE_NAME}:${TIMESTAMP}"

# Push image to Google Container Registry
echo ""
echo "Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}:latest
docker push ${IMAGE_NAME}:${TIMESTAMP}

echo "✓ Image pushed successfully"

# Deploy to Cloud Run
echo ""
echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME}:latest \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --cpu ${CPU} \
    --memory ${MEMORY} \
    --port ${PORT} \
    --max-instances 10 \
    --min-instances 0 \
    --timeout 300 \
    --concurrency 80 \
    --set-env-vars "NODE_ENV=production,PORT=${PORT}" \
    --quiet

# Get the service URL
echo ""
echo "Getting service URL..."
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
    --region ${REGION} \
    --format 'value(status.url)')

echo ""
echo "============================================"
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "============================================"
echo ""
echo "🌐 Your website is live at:"
echo "   ${SERVICE_URL}"
echo ""
echo "📱 Access from your phone:"
echo "   ${SERVICE_URL}"
echo ""
echo "🔗 Webhook endpoint:"
echo "   ${SERVICE_URL}/webhook"
echo ""
echo "💚 Health check:"
echo "   ${SERVICE_URL}/health"
echo ""
echo "============================================"
echo ""
echo "Testing the deployment..."
curl -s "${SERVICE_URL}/health" | grep -q "healthy" && echo "✓ Health check passed!" || echo "⚠️  Health check failed"

echo ""
echo "View logs:"
echo "  gcloud run services logs tail ${SERVICE_NAME} --region ${REGION}"
echo ""
echo "Update deployment:"
echo "  ./deploy-gcloud.sh"
echo ""
