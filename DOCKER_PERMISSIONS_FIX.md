# Docker Permissions Fix Guide

If you're getting permission errors when trying to run Docker commands, follow these steps:

## Quick Fix

Run the provided script:

```bash
./fix-docker-permissions.sh
```

## Manual Steps

### 1. Add your user to the docker group

```bash
sudo usermod -aG docker $USER
```

### 2. Log out and log back in

This is required for the group changes to take effect.

### 3. Verify Docker access

```bash
docker ps
```

## Temporary Fix (if you can't log out)

If you need to use Docker immediately without logging out:

```bash
sudo chmod 666 /var/run/docker.sock
```

**Note:** This is a temporary fix and will reset when the system reboots.

## Verification

To verify that everything is working:

```bash
docker run hello-world
```

If you see the "Hello from Docker!" message, everything is configured correctly.

## Troubleshooting

If you're still having issues:

1. Make sure Docker daemon is running:
   ```bash
   sudo systemctl status docker
   ```

2. Start Docker if it's not running:
   ```bash
   sudo systemctl start docker
   ```

3. Enable Docker to start on boot:
   ```bash
   sudo systemctl enable docker
   ```
