// Check health status on page load
async function checkHealth() {
    const statusDiv = document.getElementById('status');

    try {
        const response = await fetch('/health');
        const data = await response.json();

        if (data.status === 'healthy') {
            statusDiv.innerHTML = `
                <p class="status-healthy">✓ System Healthy</p>
                <p>Uptime: ${Math.floor(data.uptime)} seconds</p>
                <p>Last checked: ${new Date(data.timestamp).toLocaleString()}</p>
            `;
        }
    } catch (error) {
        statusDiv.innerHTML = `
            <p class="status-error">✗ Error checking status</p>
            <p>${error.message}</p>
        `;
    }
}

// Run health check on page load
document.addEventListener('DOMContentLoaded', checkHealth);

// Refresh health status every 30 seconds
setInterval(checkHealth, 30000);
