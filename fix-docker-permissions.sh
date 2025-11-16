#!/bin/bash

# Docker Permissions Fix Script
# Adds current user to docker group and fixes socket permissions

echo "🔧 Docker Permissions Fix Script"

# Get current user
CURRENT_USER=$(whoami)

# Add user to docker group
if groups ${CURRENT_USER} | grep -q '\bdocker\b'; then
    echo "✓ User '${CURRENT_USER}' is already in docker group"
else
    echo "Adding user '${CURRENT_USER}' to docker group..."
    sudo usermod -aG docker ${CURRENT_USER}
    echo "✓ User added to docker group"
    echo "⚠️  You may need to log out and log back in for this to take effect"
fi

# Check docker socket permissions
echo ""
echo "Current Docker socket permissions:"
ls -l /var/run/docker.sock

# Offer to fix socket permissions temporarily
echo ""
echo "If you're still having issues, you can temporarily fix socket permissions:"
echo "sudo chmod 666 /var/run/docker.sock"
echo ""
echo "Note: This is a temporary fix and will reset on reboot."

# Test Docker access
echo "Testing Docker access..."
if docker ps &> /dev/null; then
    echo "✅ Docker is working correctly!"
else
    echo "⚠️  Docker access still denied"
    echo "Try running: sudo chmod 666 /var/run/docker.sock"
    echo "Or log out and log back in if you were just added to the docker group"
fi

echo ""
echo "================================="
echo "✓ Setup complete!"
