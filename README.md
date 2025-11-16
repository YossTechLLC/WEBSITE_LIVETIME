# Emily Buckalew - Atlanta Realtor Landing Page

A minimal, cinematic landing page for Emily Buckalew, Atlanta Realtor with Method Real Estate Advisors. Features a stunning pixel-art animated city background with a smooth day-night cycle.

## Features

### Visual Design
- **Pixel-Art Animated Background**: Night-time Atlanta cityscape that transitions through:
  - Night phase with twinkling stars and glowing building windows
  - Sunrise phase with warm oranges and pinks
  - Morning phase with bright blue skies
- **Minimalist UI**: Clean, modern design with three simple sections
- **Responsive Design**: Mobile-first layout that works beautifully on all devices
- **Cinematic Atmosphere**: Dark overlay with semi-transparent content cards

### Sections
- **Home (Hero)**: Full-screen introduction with name, tagline, and CTA
- **About**: Emily's background, experience, and specialties
- **Contact**: Direct phone, office, Instagram, and email links

### Animation Details
- **Canvas-based rendering**: Pure vanilla JavaScript, no libraries
- **60-second cycle**: Smooth transitions between day phases
- **Performance optimized**: Pre-generated buildings, time-based animation
- **Pixel-art aesthetic**: Retro gaming-inspired visual style
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
- Cycle duration (default: 60 seconds)
- Building count and sizes
- Star count and distribution
- Color gradients for each phase
- Sun position and size

## Animation Details

The pixel-art city animation works by:

1. **Pre-generating buildings** on page load with random heights/widths
2. **Creating window patterns** as small pixel blocks on each building
3. **Cycling through three phases**:
   - Night (0-33%): Dark sky, bright stars, glowing windows
   - Sunrise (33-66%): Orange/pink gradients, fading stars, rising sun
   - Morning (66-100%): Blue sky, dim windows, high sun
4. **Interpolating colors** smoothly between phases
5. **Animating window glow** with sine wave variations

## Performance

The website is optimized for performance:
- Canvas animation uses `requestAnimationFrame`
- Buildings pre-generated (not randomized per frame)
- Only gradients and lighting recalculated each frame
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
