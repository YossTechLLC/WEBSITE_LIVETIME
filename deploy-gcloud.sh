#!/bin/bash

# Emily B Realty - Google Cloud Run Deployment Script
# This script builds and deploys the website to Google Cloud Run

set -e  # Exit on error

# Configuration
PROJECT_ID="telepay-459221"
SERVICE_NAME="emily-b-realty"
REGION="us-east1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
CPU="1"
MEMORY="2Gi"
MAX_INSTANCES="10"
MIN_INSTANCES="0"

echo "🚀 Deploying ${SERVICE_NAME} to Google Cloud Run"
echo "Project: ${PROJECT_ID}"
echo "Service: ${SERVICE_NAME}"
echo "Region: ${REGION}"
echo "Resources: ${CPU} CPU, ${MEMORY} RAM"
echo ""

# Check prerequisites
echo "Checking prerequisites..."
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK."
    exit 1
fi
echo "✓ gcloud found"

if ! command -v docker &> /dev/null; then
    echo "❌ docker not found. Please install Docker."
    exit 1
fi
echo "✓ docker found"

# Test Docker access
if ! docker ps &> /dev/null; then
    echo "❌ Docker access denied. Run ./fix-docker-permissions.sh first."
    exit 1
fi
echo "✓ Docker access verified"
echo ""

# Set the project
echo "Setting project to ${PROJECT_ID}..."
gcloud config set project ${PROJECT_ID}
echo ""

# Configure Docker authentication
echo "Configuring Docker authentication..."
gcloud auth configure-docker gcr.io
echo ""

# Check if Dockerfile exists
if [ ! -f "Dockerfile" ]; then
    echo "❌ Dockerfile not found in current directory"
    echo "Please ensure you're in the project root directory with a Dockerfile"
    exit 1
fi

# Build the Docker image
echo "Building Docker image: ${IMAGE_NAME}..."
docker build -t ${IMAGE_NAME}:latest .
echo "✓ Docker image built successfully"
echo ""

# Push the image to Google Container Registry
echo "Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}:latest
echo "✓ Image pushed successfully"
echo ""

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME}:latest \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --cpu ${CPU} \
    --memory ${MEMORY} \
    --max-instances ${MAX_INSTANCES} \
    --min-instances ${MIN_INSTANCES} \
    --port 8080 \
    --timeout 300 \
    --set-env-vars "NODE_ENV=production"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your service is now live at:"
gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)'
echo ""
echo "To view logs: gcloud run services logs read ${SERVICE_NAME} --region ${REGION}"
echo "To view in console: https://console.cloud.google.com/run/detail/${REGION}/${SERVICE_NAME}"
