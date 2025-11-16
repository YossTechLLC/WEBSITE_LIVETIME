# Emily Buckalew - Atlanta Realtor Landing Page

A minimal, cinematic landing page for Emily Buckalew, Atlanta Realtor with Method Real Estate Advisors. Features a stunning pixel-art animated city background with a smooth day-night cycle.

## Features

### Visual Design
- **Aerial City Panning Animation**: Beautiful top-down view of Atlanta cityscape with:
  - Seamless infinite horizontal and vertical panning
  - 90-second full day-night cycle (night → dawn → day → sunset → dusk)
  - Three-layer parallax depth effect for realistic aerial perspective
  - Twinkling stars at night that fade at dawn
  - Floating clouds during daytime
  - Dynamic window lighting that glows at night and dims during day
- **Minimalist UI**: Clean, modern design with three simple sections
- **Responsive Design**: Mobile-first layout that works beautifully on all devices
- **Cinematic Atmosphere**: Dark overlay with semi-transparent content cards

### Sections
- **Home (Hero)**: Full-screen introduction with name, tagline, and CTA
- **About**: Emily's background, experience, and specialties
- **Contact**: Direct phone, office, Instagram, and email links

### Animation Details
- **Canvas-based rendering**: Pure vanilla JavaScript, no libraries
- **90-second full day-night cycle**: Smooth color transitions through all phases of day
- **Infinite seamless loop**: City grid pattern wraps perfectly for endless panning
- **3-layer parallax system**: Far, mid, and near layers with different speeds create depth
- **Performance optimized**: Pre-generated city grid, efficient culling of off-screen elements
- **Aerial perspective**: Top-down city view with buildings, streets, and parks
- **Responsive canvas**: Automatically adjusts to viewport size

### Technical
- **Fast Performance**: Optimized vanilla JS with nginx serving static content
- **Cloud-Ready**: Containerized with Docker for easy deployment to Google Cloud Run
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard-friendly navigation

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Animation**: HTML5 Canvas API
- **Web Server**: nginx (Alpine)
- **Containerization**: Docker
- **Hosting**: Google Cloud Run

## Project Structure

```
WEBSITE_LIVETIME/
├── public/              # Website files
│   ├── index.html       # Main HTML file
│   ├── css/
│   │   └── style.css    # Stylesheet
│   └── js/
│       └── script.js    # JavaScript + Canvas animation
├── nginx.conf           # nginx configuration
├── Dockerfile           # Docker configuration
├── deploy-gcloud.sh     # Google Cloud Run deployment script
└── README.md            # This file
```

## Local Development

### Prerequisites

- Docker installed
- Docker daemon running

### Running Locally with Docker

1. Build the Docker image:
   ```bash
   docker build -t emily-buckalew-site .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 emily-buckalew-site
   ```

3. Open your browser and visit:
   ```
   http://localhost:8080
   ```

## Deployment to Google Cloud Run

### Prerequisites

- Google Cloud SDK installed (`gcloud`)
- Docker installed and configured
- Google Cloud project set up
- Billing enabled on your Google Cloud project

### Quick Deploy

1. Make sure you're in the project directory

2. Run the deployment script:
   ```bash
   ./deploy-gcloud.sh
   ```

The script will:
- Build the Docker image
- Push it to Google Container Registry
- Deploy it to Cloud Run
- Provide you with the live URL

### Manual Deployment

If you prefer to deploy manually:

```bash
# Set your project
gcloud config set project YOUR-PROJECT-ID

# Configure Docker
gcloud auth configure-docker gcr.io

# Build and push
docker build -t gcr.io/YOUR-PROJECT-ID/emily-buckalew-site .
docker push gcr.io/YOUR-PROJECT-ID/emily-buckalew-site

# Deploy to Cloud Run
gcloud run deploy emily-buckalew-site \
  --image gcr.io/YOUR-PROJECT-ID/emily-buckalew-site \
  --platform managed \
  --region us-east1 \
  --allow-unauthenticated \
  --port 8080
```

## Customization

### Content

Edit `public/index.html` to change:
- Personal information and bio
- Contact details
- Social media links

### Styling

Modify `public/css/style.css` to adjust:
- Color scheme (--accent-gold, --text-light, etc.)
- Font sizes and spacing
- Content card opacity and blur

### Animation

Update `public/js/script.js` to customize:
- Cycle duration (default: 90 seconds)
- Pan speed and direction
- Number of city layers and depth
- Building density and grid size
- Color gradients for each time phase
- Star and cloud quantities

## Animation Details

The aerial city panning animation works by:

1. **Pre-generating city grid** on page load with random buildings, streets, and parks
2. **Three parallax layers** at different depths (0.4x, 0.7x, 1.0x) moving at different speeds
3. **Seamless infinite loop** achieved by wrapping coordinates in a virtual city space
4. **Day-night cycle through 5 phases**:
   - Night (0-25%): Deep night sky, twinkling stars, full window glow
   - Dawn (25-45%): Sunrise colors, stars fade, windows dim
   - Day (45-70%): Bright sky, clouds appear, minimal window glow
   - Sunset (70-85%): Warm sunset colors, slight window glow
   - Dusk (85-100%): Return to night, stars reappear, windows light up
5. **Smooth color interpolation** between all phases for gradual transitions
6. **Dynamic lighting** with windows that pulse subtly based on sine waves
7. **Diagonal panning** combining horizontal and vertical movement for cinematic effect

## Performance

The website is optimized for performance:
- Canvas animation uses `requestAnimationFrame` for smooth 60fps
- City grid pre-generated on load (not randomized per frame)
- Efficient viewport culling - only visible buildings are drawn
- Parallax layers update positions without recalculating buildings
- Only gradients, lighting, and positions recalculated each frame
- Seamless wrapping uses modulo math for infinite loop
- Nginx serves static files efficiently
- Gzip compression enabled
- No external dependencies or libraries

## Contact Information

This landing page is for:

**Emily Buckalew**
Realtor®
Method Real Estate Advisors

Office: 1792 Woodstock Rd, Building 100, Roswell, GA 30075
Phone: 404-585-7355
Direct: 667-231-6147
Instagram: [@emily.atlanta.realty](https://www.instagram.com/emily.atlanta.realty/)

---

**Built with vanilla JavaScript and HTML5 Canvas**
