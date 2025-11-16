#!/bin/bash

# WEBSITE_LIVETIME Stop Script

echo "🛑 Stopping WEBSITE_LIVETIME..."

# Try Docker Compose first
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null 2>&1; then
    if docker-compose ps 2>/dev/null | grep -q website-livetime || docker compose ps 2>/dev/null | grep -q website-livetime; then
        echo "Stopping Docker Compose services..."
        if docker compose version &> /dev/null 2>&1; then
            docker compose down
        else
            docker-compose down
        fi
        echo "✓ Stopped"
        exit 0
    fi
fi

# Try Docker
if command -v docker &> /dev/null; then
    if docker ps | grep -q website-livetime; then
        echo "Stopping Docker container..."
        docker stop website-livetime
        docker rm website-livetime
        echo "✓ Stopped"
        exit 0
    fi
fi

# Try Node.js process
if [ -f ".pid" ]; then
    PID=$(cat .pid)
    if ps -p $PID > /dev/null 2>&1; then
        echo "Stopping Node.js process (PID: $PID)..."
        kill $PID
        rm .pid
        echo "✓ Stopped"
        exit 0
    else
        echo "Process not running (stale PID file removed)"
        rm .pid
        exit 0
    fi
fi

# Try to find by port
if command -v lsof &> /dev/null; then
    PID=$(lsof -ti:3000)
    if [ ! -z "$PID" ]; then
        echo "Stopping process on port 3000 (PID: $PID)..."
        kill $PID
        echo "✓ Stopped"
        exit 0
    fi
fi

echo "⚠️  No running instance found"
