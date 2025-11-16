# WEBSITE_LIVETIME - Emily B Realty

Deployment infrastructure and scripts for Emily B Realty website on Google Cloud Run.

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/engine/install/) installed and running
- [Google Cloud SDK (gcloud)](https://cloud.google.com/sdk/docs/install) installed
- Google Cloud project with billing enabled
- Proper Docker permissions (see below)

### Deployment

1. **Fix Docker Permissions** (if needed):
   ```bash
   ./fix-docker-permissions.sh
   ```

2. **Deploy to Google Cloud Run**:
   ```bash
   ./deploy-gcloud.sh
   ```

## Docker Permission Issues

If you encounter the error:
```
ERROR: permission denied while trying to connect to the Docker daemon socket
```

See [DOCKER_PERMISSIONS_FIX.md](DOCKER_PERMISSIONS_FIX.md) for detailed troubleshooting steps.

**Quick fix:**
```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Apply the change
newgrp docker

# Or log out and log back in
```

## Configuration

The deployment script uses these environment variables (with defaults):

- `GCP_PROJECT_ID` - Google Cloud project ID (default: `telepay-459221`)
- `SERVICE_NAME` - Cloud Run service name (default: `emily-b-realty`)
- `GCP_REGION` - Deployment region (default: `us-east1`)
- `CPU` - CPU allocation (default: `1`)
- `MEMORY` - Memory allocation (default: `2Gi`)

Example with custom configuration:
```bash
GCP_PROJECT_ID=my-project SERVICE_NAME=my-app ./deploy-gcloud.sh
```

## Files

- `deploy-gcloud.sh` - Main deployment script for Google Cloud Run
- `fix-docker-permissions.sh` - Helper script to fix Docker permission issues
- `DOCKER_PERMISSIONS_FIX.md` - Comprehensive guide for Docker permission issues
- `Dockerfile.example` - Example Dockerfile template

## Troubleshooting

### Docker daemon not accessible
Run the fix script:
```bash
./fix-docker-permissions.sh
```

### gcloud not authenticated
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Deployment fails
Check logs:
```bash
gcloud run logs read emily-b-realty --region us-east1
```

## Support

For issues and questions:
1. Check [DOCKER_PERMISSIONS_FIX.md](DOCKER_PERMISSIONS_FIX.md) for Docker issues
2. Review Cloud Run logs for deployment issues
3. Verify all prerequisites are installed correctly
