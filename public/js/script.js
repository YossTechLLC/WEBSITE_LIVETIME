// ========================================
// PIXEL-ART CITY ANIMATION
// ========================================

class PixelCity {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.buildings = [];
        this.stars = [];
        this.time = 0; // 0 to 1 for full cycle
        this.cycleDuration = 60000; // 60 seconds for full cycle
        this.lastFrameTime = Date.now();

        this.init();
        this.resize();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    init() {
        // Generate buildings
        const buildingCount = 25;
        const baseY = 0.7; // Buildings start at 70% down the canvas

        for (let i = 0; i < buildingCount; i++) {
            const width = Math.floor(Math.random() * 60) + 40;
            const height = Math.floor(Math.random() * 200) + 100;
            const x = (i / buildingCount) * 1.1 - 0.05; // Normalized x position

            // Generate windows
            const windows = [];
            const windowCols = Math.floor(width / 15);
            const windowRows = Math.floor(height / 20);

            for (let row = 0; row < windowRows; row++) {
                for (let col = 0; col < windowCols; col++) {
                    if (Math.random() > 0.3) { // 70% chance of window
                        windows.push({
                            x: col * 15 + 5,
                            y: row * 20 + 5,
                            size: 8
                        });
                    }
                }
            }

            this.buildings.push({ x, width, height, baseY, windows });
        }

        // Generate stars
        for (let i = 0; i < 100; i++) {
            this.stars.push({
                x: Math.random(),
                y: Math.random() * 0.6, // Upper 60% of sky
                size: Math.random() * 2 + 1,
                twinkle: Math.random()
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

        if (time < 0.33) {
            // Night phase
            const phase = time / 0.33;
            topColor = this.lerpColor('#0a0f1e', '#1a1f3e', phase);
            midColor = this.lerpColor('#1a1533', '#2a2555', phase);
            bottomColor = this.lerpColor('#0f0a1a', '#1f1a2a', phase);
        } else if (time < 0.66) {
            // Sunrise phase
            const phase = (time - 0.33) / 0.33;
            topColor = this.lerpColor('#1a1f3e', '#4a5f8f', phase);
            midColor = this.lerpColor('#2a2555', '#e85d75', phase);
            bottomColor = this.lerpColor('#1f1a2a', '#f4a261', phase);
        } else {
            // Morning phase
            const phase = (time - 0.66) / 0.34;
            topColor = this.lerpColor('#4a5f8f', '#5ba3d0', phase);
            midColor = this.lerpColor('#e85d75', '#87ceeb', phase);
            bottomColor = this.lerpColor('#f4a261', '#b0d8f0', phase);
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
        // Stars visible during night and fade during sunrise
        const starOpacity = this.time < 0.33 ? 1 : this.time < 0.66 ? 1 - (this.time - 0.33) / 0.33 : 0;

        if (starOpacity > 0) {
            this.stars.forEach(star => {
                const twinkle = Math.sin(this.time * 10 + star.twinkle * Math.PI * 2) * 0.3 + 0.7;
                this.ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity * twinkle})`;
                this.ctx.fillRect(
                    star.x * this.canvas.width,
                    star.y * this.canvas.height,
                    star.size,
                    star.size
                );
            });
        }
    }

    drawSun() {
        // Sun visible during sunrise and morning
        if (this.time >= 0.33) {
            const sunPhase = this.time < 0.66 ? (this.time - 0.33) / 0.33 : 1;
            const sunY = 0.65 - sunPhase * 0.15; // Rise from horizon
            const sunSize = 40 + sunPhase * 20;

            const sunColor = this.time < 0.66
                ? this.lerpColor('#ff6b35', '#ffd700', sunPhase)
                : '#ffd700';

            this.ctx.fillStyle = sunColor;
            this.ctx.beginPath();
            this.ctx.arc(
                this.canvas.width * 0.85,
                this.canvas.height * sunY,
                sunSize,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }
    }

    drawBuildings() {
        // Window glow intensity: bright at night, dim in morning
        const windowGlow = this.time < 0.33 ? 1 : this.time < 0.66 ? 1 - (this.time - 0.33) / 0.33 : 0.2;

        this.buildings.forEach(building => {
            const x = building.x * this.canvas.width;
            const y = building.baseY * this.canvas.height;

            // Building silhouette
            this.ctx.fillStyle = '#0a0a0f';
            this.ctx.fillRect(x, y - building.height, building.width, building.height);

            // Windows
            building.windows.forEach(win => {
                const glowIntensity = 200 + Math.sin(this.time * 5 + win.x + win.y) * 55;
                this.ctx.fillStyle = `rgba(${glowIntensity}, ${glowIntensity - 50}, 100, ${windowGlow})`;
                this.ctx.fillRect(
                    x + win.x,
                    y - building.height + win.y,
                    win.size,
                    win.size
                );
            });
        });
    }

    animate() {
        const now = Date.now();
        const deltaTime = now - this.lastFrameTime;
        this.lastFrameTime = now;

        // Update cycle time
        this.time += deltaTime / this.cycleDuration;
        if (this.time > 1) this.time -= 1;

        // Clear and draw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSky();
        this.drawStars();
        this.drawSun();
        this.drawBuildings();

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// INITIALIZE ALL DOM-DEPENDENT CODE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
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
            if (navLinks && mobileToggle && navLinks.classList.contains('active')) {
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

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // ========================================
    // INITIALIZE ANIMATION
    // ========================================

    const canvas = document.getElementById('cityCanvas');
    if (canvas) {
        new PixelCity(canvas);
    } else {
        console.error('Canvas element #cityCanvas not found!');
    }
});
