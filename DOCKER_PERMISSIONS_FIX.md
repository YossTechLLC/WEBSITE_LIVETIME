# Docker Permission Denied Error - Fix Guide

## Problem

When running `./deploy-gcloud.sh` or any Docker command, you encounter:

```
ERROR: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock:
Head "http://%2Fvar%2Frun%2Fdocker.sock/_ping": dial unix /var/run/docker.sock: connect: permission denied
```

## Root Cause

This error occurs because your user doesn't have permission to access the Docker daemon socket (`/var/run/docker.sock`). By default, only the `root` user and users in the `docker` group can access the Docker daemon.

## Solutions

### Option 1: Add User to Docker Group (Recommended)

This is the permanent and recommended solution:

```bash
# Run the fix script
chmod +x fix-docker-permissions.sh
./fix-docker-permissions.sh
```

Or manually:

```bash
# Add your user to the docker group
sudo usermod -aG docker $USER

# Apply the new group membership (pick one)
newgrp docker              # Option A: In current shell
# OR log out and log back in  # Option B: For all shells
```

**Important**: After adding yourself to the docker group, you must either:
- Log out and log back in, OR
- Run `newgrp docker` in your current terminal

Then verify it works:
```bash
docker ps
```

### Option 2: Use sudo (Quick Fix)

Run Docker commands with sudo:

```bash
sudo docker ps
sudo ./deploy-gcloud.sh
```

### Option 3: Fix Socket Permissions (Temporary)

This is a temporary fix that will reset on reboot:

```bash
sudo chmod 666 /var/run/docker.sock
```

**Warning**: This makes the Docker socket accessible to all users on the system, which has security implications.

### Option 4: Start Docker Daemon (If Not Running)

If the Docker daemon isn't running:

```bash
# For systemd-based systems (Ubuntu, Debian, etc.)
sudo systemctl start docker
sudo systemctl enable docker

# For SysV-based systems
sudo service docker start
```

## Verification

After applying a fix, verify Docker is working:

```bash
# Should list running containers (or show empty list)
docker ps

# Should show Docker system information
docker info

# Test with a simple container
docker run hello-world
```

## For Cloud Deployment

Once Docker permissions are fixed, you can run:

```bash
./deploy-gcloud.sh
```

The deployment script will be able to:
1. Build the Docker image
2. Push to Google Container Registry
3. Deploy to Cloud Run

## Troubleshooting

### "docker: command not found"

Docker is not installed. Install it:

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Or follow official docs
https://docs.docker.com/engine/install/
```

### "Cannot connect to the Docker daemon"

The Docker daemon is not running:

```bash
sudo systemctl status docker
sudo systemctl start docker
```

### "permission denied" persists after adding to group

You need to log out and log back in, or run `newgrp docker`.

### Still having issues?

1. Check if you're in the docker group: `groups $USER | grep docker`
2. Check Docker socket permissions: `ls -la /var/run/docker.sock`
3. Check Docker daemon status: `sudo systemctl status docker`
4. Check Docker logs: `sudo journalctl -u docker -n 50`

## Security Considerations

- Adding users to the `docker` group grants them root-equivalent privileges, as they can run containers with root access to the host
- Only add trusted users to the docker group
- In production environments, consider using rootless Docker or other security measures

## Quick Reference

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply group membership
newgrp docker

# Verify
docker ps

# Start Docker daemon
sudo systemctl start docker

# Enable Docker on boot
sudo systemctl enable docker
```
