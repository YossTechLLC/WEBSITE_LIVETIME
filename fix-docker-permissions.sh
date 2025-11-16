#!/bin/bash

# Docker Permissions Fix Script
# This script fixes the common "permission denied" error when accessing Docker daemon

set -e

echo "🔧 Docker Permissions Fix Script"
echo "================================="
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "⚠️  Running as root. You can run Docker commands directly with sudo."
    echo ""
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker first: https://docs.docker.com/engine/install/"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "⚠️  Docker daemon is not running or not accessible."
    echo ""
    echo "Attempting to start Docker daemon..."

    # Try to start Docker service
    if command -v systemctl &> /dev/null; then
        sudo systemctl start docker
        sudo systemctl enable docker
        echo "✓ Docker service started via systemctl"
    elif command -v service &> /dev/null; then
        sudo service docker start
        echo "✓ Docker service started via service command"
    else
        echo "❌ Could not start Docker service automatically."
        echo "Please start Docker manually for your system."
        exit 1
    fi
fi

# Get current user
CURRENT_USER=$(whoami)

if [ "$CURRENT_USER" = "root" ]; then
    echo "✓ Running as root - Docker access should work"
    echo ""
    echo "Testing Docker access..."
    if docker ps &> /dev/null; then
        echo "✅ Docker is working correctly!"
    else
        echo "❌ Docker still not accessible. Please check Docker installation."
        exit 1
    fi
else
    # Check if docker group exists
    if ! getent group docker &> /dev/null; then
        echo "Creating docker group..."
        sudo groupadd docker
        echo "✓ Docker group created"
    fi

    # Check if user is in docker group
    if ! groups $CURRENT_USER | grep -q docker; then
        echo "Adding user '$CURRENT_USER' to docker group..."
        sudo usermod -aG docker $CURRENT_USER
        echo "✓ User added to docker group"
        echo ""
        echo "⚠️  IMPORTANT: You need to log out and log back in for group changes to take effect!"
        echo "   Or run: newgrp docker"
        echo ""
        echo "After logging back in, run this script again to verify."
        exit 0
    else
        echo "✓ User '$CURRENT_USER' is already in docker group"
    fi

    # Alternative: Fix socket permissions (temporary solution)
    if [ -e /var/run/docker.sock ]; then
        echo ""
        echo "Current Docker socket permissions:"
        ls -la /var/run/docker.sock
        echo ""
        echo "If you're still having issues, you can temporarily fix socket permissions:"
        echo "  sudo chmod 666 /var/run/docker.sock"
        echo ""
        echo "Note: This is a temporary fix and will reset on reboot."
    fi

    # Test Docker access
    echo "Testing Docker access..."
    if docker ps &> /dev/null; then
        echo "✅ Docker is working correctly!"
    else
        echo "⚠️  Docker access test failed."
        echo ""
        echo "Quick fixes:"
        echo "1. Log out and log back in (for group changes to take effect)"
        echo "2. Run: newgrp docker"
        echo "3. Temporary fix: sudo chmod 666 /var/run/docker.sock"
        echo "4. Run with sudo: sudo docker ..."
    fi
fi

echo ""
echo "================================="
echo "✓ Setup complete!"
