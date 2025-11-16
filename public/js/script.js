// ========================================
// AERIAL CITY PANNING ANIMATION
// ========================================

class AerialCity {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Animation state
        this.time = 0; // 0 to 1 for day-night cycle
        this.cycleDuration = 90000; // 90 seconds for full day-night cycle
        this.lastFrameTime = Date.now();
        this.offsetX = 0; // Horizontal panning offset
        this.offsetY = 0; // Vertical panning offset
        this.panSpeed = 0.3; // Pixels per frame

        // City grid parameters
        this.gridSize = 200; // Size of each city block
        this.cityWidth = 3000; // Virtual city width for seamless loop
        this.cityHeight = 2000; // Virtual city height

        // Layers for parallax effect
        this.layers = [];
        this.stars = [];
        this.clouds = [];

        this.init();
        this.resize();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    init() {
        // Generate city blocks in a grid pattern (3 layers for depth)
        this.layers = [
            { buildings: [], depth: 0.4, speed: 0.2 }, // Far layer
            { buildings: [], depth: 0.7, speed: 0.5 }, // Mid layer
            { buildings: [], depth: 1.0, speed: 1.0 }  // Near layer
        ];

        this.layers.forEach((layer, layerIndex) => {
            const cols = Math.ceil(this.cityWidth / this.gridSize) + 2;
            const rows = Math.ceil(this.cityHeight / this.gridSize) + 2;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * this.gridSize;
                    const y = row * this.gridSize;

                    // Randomly decide building type
                    if (Math.random() > 0.15) { // 85% buildings, 15% streets/parks
                        const width = this.gridSize * 0.85;
                        const height = this.gridSize * 0.85;
                        const floors = Math.floor(Math.random() * 8) + 3;
                        const style = Math.floor(Math.random() * 3); // 3 building styles

                        // Generate windows
                        const windows = [];
                        const windowsPerFloor = Math.floor(Math.random() * 4) + 3;
                        for (let floor = 0; floor < floors; floor++) {
                            for (let w = 0; w < windowsPerFloor; w++) {
                                windows.push({
                                    x: (w + 0.5) * (width / (windowsPerFloor + 1)),
                                    y: (floor + 0.5) * (height / floors),
                                    lit: Math.random() > 0.3 // 70% windows lit
                                });
                            }
                        }

                        layer.buildings.push({
                            x, y, width, height, floors, style, windows,
                            hue: Math.random() * 30 - 15 // Slight color variation
                        });
                    } else {
                        // Street or park space - add greenery or roads
                        const isGreen = Math.random() > 0.5;
                        layer.buildings.push({
                            x, y,
                            width: this.gridSize * 0.85,
                            height: this.gridSize * 0.85,
                            isStreet: true,
                            isGreen: isGreen
                        });
                    }
                }
            }
        });

        // Generate stars (visible at night)
        for (let i = 0; i < 200; i++) {
            this.stars.push({
                x: Math.random() * this.cityWidth * 2,
                y: Math.random() * this.cityHeight,
                size: Math.random() * 2 + 0.5,
                twinkle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.5 + 0.5
            });
        }

        // Generate clouds (visible during day)
        for (let i = 0; i < 15; i++) {
            this.clouds.push({
                x: Math.random() * this.cityWidth * 2,
                y: Math.random() * this.cityHeight * 0.4,
                width: Math.random() * 150 + 100,
                height: Math.random() * 40 + 30,
                speed: Math.random() * 0.1 + 0.05,
                opacity: Math.random() * 0.3 + 0.2
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    getSkyGradient() {
        const { time } = this;
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);

        let topColor, midColor, bottomColor;

        if (time < 0.25) {
            // Deep night
            const phase = time / 0.25;
            topColor = this.lerpColor('#000814', '#001d3d', phase);
            midColor = this.lerpColor('#001233', '#003566', phase);
            bottomColor = this.lerpColor('#001a33', '#004080', phase);
        } else if (time < 0.45) {
            // Dawn/Sunrise
            const phase = (time - 0.25) / 0.2;
            topColor = this.lerpColor('#001d3d', '#ff6b35', phase);
            midColor = this.lerpColor('#003566', '#ff8c42', phase);
            bottomColor = this.lerpColor('#004080', '#ffa07a', phase);
        } else if (time < 0.7) {
            // Day
            const phase = (time - 0.45) / 0.25;
            topColor = this.lerpColor('#ff6b35', '#4ea8de', phase);
            midColor = this.lerpColor('#ff8c42', '#5e9fd6', phase);
            bottomColor = this.lerpColor('#ffa07a', '#87ceeb', phase);
        } else if (time < 0.85) {
            // Sunset
            const phase = (time - 0.7) / 0.15;
            topColor = this.lerpColor('#4ea8de', '#ff006e', phase);
            midColor = this.lerpColor('#5e9fd6', '#ff4d8f', phase);
            bottomColor = this.lerpColor('#87ceeb', '#ff8fa3', phase);
        } else {
            // Dusk to night
            const phase = (time - 0.85) / 0.15;
            topColor = this.lerpColor('#ff006e', '#000814', phase);
            midColor = this.lerpColor('#ff4d8f', '#001233', phase);
            bottomColor = this.lerpColor('#ff8fa3', '#001a33', phase);
        }

        gradient.addColorStop(0, topColor);
        gradient.addColorStop(0.5, midColor);
        gradient.addColorStop(1, bottomColor);

        return gradient;
    }

    lerpColor(color1, color2, factor) {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        const r = Math.round(c1.r + (c2.r - c1.r) * factor);
        const g = Math.round(c1.g + (c2.g - c1.g) * factor);
        const b = Math.round(c1.b + (c2.b - c1.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    drawSky() {
        this.ctx.fillStyle = this.getSkyGradient();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStars() {
        // Stars visible during night (fade during sunrise/sunset)
        let starOpacity = 0;
        if (this.time < 0.25) {
            starOpacity = 1;
        } else if (this.time < 0.45) {
            starOpacity = 1 - (this.time - 0.25) / 0.2;
        } else if (this.time > 0.85) {
            starOpacity = (this.time - 0.85) / 0.15;
        }

        if (starOpacity > 0) {
            this.stars.forEach(star => {
                const twinkle = Math.sin(this.time * 10 + star.twinkle) * 0.4 + 0.6;
                const x = ((star.x - this.offsetX * 0.1) % (this.cityWidth * 2) + this.cityWidth * 2) % (this.cityWidth * 2);
                const y = star.y;

                if (x > -50 && x < this.canvas.width + 50 && y > -50 && y < this.canvas.height + 50) {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity * twinkle})`;
                    this.ctx.fillRect(x, y, star.size, star.size);
                }
            });
        }
    }

    drawClouds() {
        // Clouds visible during day
        let cloudOpacity = 0;
        if (this.time >= 0.45 && this.time <= 0.7) {
            cloudOpacity = 1;
        } else if (this.time > 0.25 && this.time < 0.45) {
            cloudOpacity = (this.time - 0.25) / 0.2;
        } else if (this.time > 0.7 && this.time < 0.85) {
            cloudOpacity = 1 - (this.time - 0.7) / 0.15;
        }

        if (cloudOpacity > 0) {
            this.clouds.forEach(cloud => {
                const x = ((cloud.x - this.offsetX * 0.15) % (this.cityWidth * 2) + this.cityWidth * 2) % (this.cityWidth * 2);
                const y = cloud.y;

                if (x + cloud.width > -50 && x < this.canvas.width + 50) {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity * cloudOpacity})`;
                    this.ctx.beginPath();
                    this.ctx.ellipse(x, y, cloud.width / 2, cloud.height / 2, 0, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            });
        }
    }

    drawCityLayers() {
        // Window glow intensity based on time of day
        let windowGlow = 0;
        if (this.time < 0.25) {
            windowGlow = 1; // Full glow at night
        } else if (this.time < 0.45) {
            windowGlow = 1 - (this.time - 0.25) / 0.2; // Fade during sunrise
        } else if (this.time > 0.85) {
            windowGlow = (this.time - 0.85) / 0.15; // Glow during dusk
        } else if (this.time >= 0.7 && this.time <= 0.85) {
            windowGlow = (this.time - 0.7) / 0.15 * 0.3; // Slight glow at sunset
        }

        // Draw each layer (back to front)
        this.layers.forEach((layer, layerIndex) => {
            const scale = layer.depth;
            const layerOffsetX = this.offsetX * layer.speed;
            const layerOffsetY = this.offsetY * layer.speed;

            layer.buildings.forEach(building => {
                // Calculate position with seamless wrapping
                let x = ((building.x - layerOffsetX) % this.cityWidth + this.cityWidth) % this.cityWidth;
                let y = ((building.y - layerOffsetY) % this.cityHeight + this.cityHeight) % this.cityHeight;

                // Scale to screen space
                x = x * scale;
                y = y * scale;
                const w = building.width * scale;
                const h = building.height * scale;

                // Only draw if visible on screen (with margin)
                if (x + w < -100 || x > this.canvas.width + 100 || y + h < -100 || y > this.canvas.height + 100) {
                    return;
                }

                if (building.isStreet) {
                    // Draw street or park
                    if (building.isGreen) {
                        this.ctx.fillStyle = `rgba(34, 139, 34, ${0.3 * layer.depth})`;
                    } else {
                        this.ctx.fillStyle = `rgba(40, 40, 40, ${0.5 * layer.depth})`;
                    }
                    this.ctx.fillRect(x, y, w, h);
                } else {
                    // Draw building
                    const baseHue = 210 + building.hue;
                    const baseSat = 15;
                    const baseLightness = 20 + (layerIndex * 5);

                    this.ctx.fillStyle = `hsl(${baseHue}, ${baseSat}%, ${baseLightness}%)`;
                    this.ctx.fillRect(x, y, w, h);

                    // Draw windows
                    if (scale > 0.5) { // Only draw windows if layer is close enough
                        building.windows.forEach(win => {
                            if (win.lit) {
                                const windowX = x + win.x * scale;
                                const windowY = y + win.y * scale;
                                const windowSize = 3 * scale;

                                // Window color varies by time of day
                                const glowIntensity = windowGlow * (0.7 + Math.sin(this.time * 20 + win.x + win.y) * 0.3);
                                const r = 255;
                                const g = 220 + Math.sin(win.x) * 35;
                                const b = 150;

                                this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glowIntensity})`;
                                this.ctx.fillRect(windowX, windowY, windowSize, windowSize);
                            }
                        });
                    }

                    // Add building outline for depth
                    this.ctx.strokeStyle = `rgba(0, 0, 0, ${0.3 * layer.depth})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(x, y, w, h);
                }
            });

            // Draw duplicate layer at edges for seamless looping
            layer.buildings.forEach(building => {
                let x = ((building.x - layerOffsetX) % this.cityWidth + this.cityWidth) % this.cityWidth;
                x = x * scale - this.cityWidth * scale; // Duplicate to the left
                let y = ((building.y - layerOffsetY) % this.cityHeight + this.cityHeight) % this.cityHeight;
                y = y * scale;
                const w = building.width * scale;
                const h = building.height * scale;

                if (x + w >= -100 && x <= this.canvas.width + 100 && y + h >= -100 && y <= this.canvas.height + 100) {
                    if (building.isStreet) {
                        if (building.isGreen) {
                            this.ctx.fillStyle = `rgba(34, 139, 34, ${0.3 * layer.depth})`;
                        } else {
                            this.ctx.fillStyle = `rgba(40, 40, 40, ${0.5 * layer.depth})`;
                        }
                        this.ctx.fillRect(x, y, w, h);
                    } else {
                        const baseHue = 210 + building.hue;
                        const baseSat = 15;
                        const baseLightness = 20 + (layerIndex * 5);
                        this.ctx.fillStyle = `hsl(${baseHue}, ${baseSat}%, ${baseLightness}%)`;
                        this.ctx.fillRect(x, y, w, h);

                        if (scale > 0.5) {
                            building.windows.forEach(win => {
                                if (win.lit) {
                                    const windowX = x + win.x * scale;
                                    const windowY = y + win.y * scale;
                                    const windowSize = 3 * scale;
                                    const glowIntensity = windowGlow * (0.7 + Math.sin(this.time * 20 + win.x + win.y) * 0.3);
                                    this.ctx.fillStyle = `rgba(255, ${220 + Math.sin(win.x) * 35}, 150, ${glowIntensity})`;
                                    this.ctx.fillRect(windowX, windowY, windowSize, windowSize);
                                }
                            });
                        }

                        this.ctx.strokeStyle = `rgba(0, 0, 0, ${0.3 * layer.depth})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.strokeRect(x, y, w, h);
                    }
                }
            });
        });
    }

    animate() {
        const now = Date.now();
        const deltaTime = now - this.lastFrameTime;
        this.lastFrameTime = now;

        // Update day-night cycle
        this.time += deltaTime / this.cycleDuration;
        if (this.time > 1) this.time -= 1;

        // Update panning position (diagonal movement for more interesting view)
        this.offsetX += this.panSpeed;
        this.offsetY += this.panSpeed * 0.4;

        // Wrap offsets for seamless looping
        if (this.offsetX > this.cityWidth) this.offsetX -= this.cityWidth;
        if (this.offsetY > this.cityHeight) this.offsetY -= this.cityHeight;

        // Clear and draw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSky();
        this.drawStars();
        this.drawClouds();
        this.drawCityLayers();

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Nav link smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);

        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-toggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// CTA button scroll
document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', function() {
        const target = '#' + this.getAttribute('data-scroll-to');
        smoothScroll(target);
    });
});

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================

const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// ========================================
// INITIALIZE ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('cityCanvas');
    new AerialCity(canvas);
});
