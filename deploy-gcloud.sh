#!/bin/bash

# Emily B Realty - Google Cloud Run Deployment Script
# This script builds and deploys the application to Google Cloud Run

set -e  # Exit on error

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-telepay-459221}"
SERVICE_NAME="${SERVICE_NAME:-emily-b-realty}"
REGION="${GCP_REGION:-us-east1}"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
CPU="${CPU:-1}"
MEMORY="${MEMORY:-2Gi}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "${BLUE}🚀 Deploying ${SERVICE_NAME} to Google Cloud Run${NC}"
    echo "Project: ${PROJECT_ID}"
    echo "Service: ${SERVICE_NAME}"
    echo "Region: ${REGION}"
    echo "Resources: ${CPU} CPU, ${MEMORY} RAM"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

check_command() {
    if command -v $1 &> /dev/null; then
        print_success "$1 found"
        return 0
    else
        print_error "$1 not found"
        return 1
    fi
}

check_docker_access() {
    if docker ps &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Main script
print_header

# Check prerequisites
echo "Checking prerequisites..."

if ! check_command gcloud; then
    print_error "gcloud CLI is not installed"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! check_command docker; then
    print_error "Docker is not installed"
    echo "Install from: https://docs.docker.com/engine/install/"
    exit 1
fi

# Check Docker access
if ! check_docker_access; then
    print_error "Cannot access Docker daemon"
    echo ""
    print_warning "Docker permission denied!"
    echo ""
    echo "This usually means your user doesn't have permission to access Docker."
    echo ""
    echo "Quick fixes:"
    echo "  1. Run: ./fix-docker-permissions.sh"
    echo "  2. Or add yourself to docker group: sudo usermod -aG docker \$USER"
    echo "  3. Or run this script with sudo: sudo ./deploy-gcloud.sh"
    echo ""
    echo "See DOCKER_PERMISSIONS_FIX.md for detailed instructions"
    exit 1
fi

print_success "Docker access verified"
echo ""

# Set GCP project
echo "Setting project to ${PROJECT_ID}..."
gcloud config set project ${PROJECT_ID}
echo ""

# Configure Docker for GCR
echo "Configuring Docker authentication..."
gcloud auth configure-docker gcr.io --quiet
echo ""

# Check if Dockerfile exists
if [ ! -f "Dockerfile" ]; then
    print_error "Dockerfile not found in current directory"
    echo "Please ensure you're in the project root directory with a Dockerfile"
    exit 1
fi

# Build Docker image
echo "Building Docker image..."
docker build -t ${IMAGE_NAME}:latest .
print_success "Docker image built successfully"
echo ""

# Push to Google Container Registry
echo "Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}:latest
print_success "Image pushed to GCR"
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
  --port 8080

echo ""
print_success "Deployment complete!"
echo ""

# Get service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)')
echo -e "${GREEN}🌐 Service URL: ${SERVICE_URL}${NC}"
echo ""
echo "To view logs:"
echo "  gcloud run logs read ${SERVICE_NAME} --region ${REGION}"
echo ""
echo "To view service details:"
echo "  gcloud run services describe ${SERVICE_NAME} --region ${REGION}"
