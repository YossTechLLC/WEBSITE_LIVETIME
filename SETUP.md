# SETUP GUIDE - WEBSITE_LIVETIME

## Quick Start

The easiest way to start the application is using the startup script:

```bash
# Make scripts executable
chmod +x start.sh stop.sh

# Start the application (auto-detects best method)
./start.sh

# Stop the application
./stop.sh
```

The startup script will automatically:
1. Check for Docker Compose → use it if available
2. Check for Docker → use it if available
3. Check for Node.js → use it if available
4. Provide installation instructions if none are found

---

## Installation Options

### Option 1: Install Docker & Docker Compose (Recommended)

#### Ubuntu/Debian

```bash
# Install Docker
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add your user to docker group (logout/login required)
sudo usermod -aG docker $USER

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
```

#### RHEL/CentOS/Fedora

```bash
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

#### macOS

```bash
# Install Docker Desktop
brew install --cask docker

# Or download from: https://www.docker.com/products/docker-desktop
```

---

### Option 2: Install Node.js

#### Ubuntu/Debian

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

#### RHEL/CentOS/Fedora

```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs
```

#### macOS

```bash
# Using Homebrew
brew install node@18

# Or using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### Using nvm (All platforms)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc  # or ~/.zshrc

# Install Node.js
nvm install 18
nvm use 18
```

---

## Manual Start Methods

### Method 1: Docker Compose (if installed)

```bash
# New syntax (Docker Compose V2)
docker compose up -d

# Or old syntax (Docker Compose V1)
docker-compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Method 2: Docker Only (if Docker Compose not available)

```bash
# Build image
docker build -t website-livetime:latest .

# Run container
docker run -d \
  --name website-livetime \
  --cpus="1" \
  --memory="2g" \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  website-livetime:latest

# Check status
docker ps | grep website-livetime

# View logs
docker logs -f website-livetime

# Stop
docker stop website-livetime
docker rm website-livetime
```

### Method 3: Node.js Directly (no Docker)

```bash
# Install dependencies
npm install

# Start in production mode
NODE_ENV=production npm start

# Or start in development mode (with auto-reload)
npm run dev

# Or run in background
NODE_ENV=production nohup npm start > server.log 2>&1 &

# View logs (if running in background)
tail -f server.log
```

---

## Troubleshooting

### Docker permission denied

```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Logout and login again, or run:
newgrp docker
```

### Port 3000 already in use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Or
sudo netstat -tulpn | grep 3000

# Kill the process
kill <PID>

# Or use a different port
PORT=8080 npm start
```

### Cannot find module errors (Node.js)

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Compose not found but Docker is installed

You have two options:

**Option A: Install Docker Compose V2 (Plugin)**
```bash
# Already included with newer Docker installations
docker compose version
```

**Option B: Install standalone Docker Compose**
```bash
# Download latest version
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

---

## Verification

After starting the application, verify it's running:

```bash
# Check health endpoint
curl http://localhost:3000/health

# Expected response:
# {"status":"healthy","timestamp":"...","uptime":...}

# Open in browser
# http://localhost:3000
```

---

## Resource Requirements

- **CPU**: 1 core
- **RAM**: 2GB
- **Disk**: ~500MB (including Docker image)
- **Port**: 3000

---

## Next Steps

1. Start the application using `./start.sh`
2. Access it at http://localhost:3000
3. Test the webhook at http://localhost:3000/webhook
4. Check health at http://localhost:3000/health

For deployment to production servers, see `DEPLOYMENT.md`.
