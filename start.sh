#!/bin/bash

# WEBSITE_LIVETIME Startup Script
# This script will start the website using the best available method

set -e

echo "🚀 WEBSITE_LIVETIME Startup Script"
echo "===================================="

# Check if running as root for Docker
check_docker() {
    if command -v docker &> /dev/null; then
        echo "✓ Docker found"
        return 0
    else
        echo "✗ Docker not found"
        return 1
    fi
}

# Check if docker-compose is available
check_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        echo "✓ docker-compose found"
        return 0
    elif docker compose version &> /dev/null 2>&1; then
        echo "✓ docker compose (plugin) found"
        return 0
    else
        echo "✗ docker-compose not found"
        return 1
    fi
}

# Check if Node.js is available
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        echo "✓ Node.js found ($NODE_VERSION)"
        return 0
    else
        echo "✗ Node.js not found"
        return 1
    fi
}

# Start with Docker Compose
start_with_docker_compose() {
    echo ""
    echo "Starting with Docker Compose..."
    if docker compose version &> /dev/null 2>&1; then
        docker compose up -d
    else
        docker-compose up -d
    fi
    echo "✓ Service started with Docker Compose"
    echo "Access the website at: http://localhost:3000"
}

# Start with Docker
start_with_docker() {
    echo ""
    echo "Starting with Docker..."

    # Build image if it doesn't exist
    if ! docker images | grep -q website-livetime; then
        echo "Building Docker image..."
        docker build -t website-livetime:latest .
    fi

    # Stop existing container if running
    if docker ps -a | grep -q website-livetime; then
        echo "Stopping existing container..."
        docker stop website-livetime 2>/dev/null || true
        docker rm website-livetime 2>/dev/null || true
    fi

    # Run new container
    docker run -d \
        --name website-livetime \
        --cpus="1" \
        --memory="2g" \
        -p 3000:3000 \
        -e NODE_ENV=production \
        --restart unless-stopped \
        website-livetime:latest

    echo "✓ Service started with Docker"
    echo "Access the website at: http://localhost:3000"
}

# Start with Node.js directly
start_with_node() {
    echo ""
    echo "Starting with Node.js..."

    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install
    fi

    # Start the server
    echo "Starting server..."
    export NODE_ENV=production
    export PORT=3000

    # Check if we should run in background or foreground
    if [ "$1" == "background" ]; then
        nohup npm start > server.log 2>&1 &
        echo $! > .pid
        echo "✓ Service started in background (PID: $(cat .pid))"
        echo "Logs: tail -f server.log"
    else
        npm start
    fi

    echo "Access the website at: http://localhost:3000"
}

# Main logic
echo ""
echo "Checking available tools..."

if check_docker && check_docker_compose; then
    start_with_docker_compose
elif check_docker; then
    start_with_docker
elif check_node; then
    echo ""
    echo "⚠️  Docker not available, using Node.js directly"
    read -p "Run in background? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        start_with_node background
    else
        start_with_node foreground
    fi
else
    echo ""
    echo "❌ ERROR: Neither Docker nor Node.js is available"
    echo ""
    echo "Please install one of the following:"
    echo "  1. Docker and Docker Compose (recommended)"
    echo "  2. Node.js (v18 or higher)"
    echo ""
    echo "See SETUP.md for installation instructions"
    exit 1
fi
