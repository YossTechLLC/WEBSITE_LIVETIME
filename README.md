# Emily B Realty - Premium Luxury Real Estate Website

A stunning, fully-featured real estate website for Emily B Realty, showcasing luxury properties with modern design, advanced interactions, and premium user experience.

## Features

### Design & UI
- **Premium Design System**: Sophisticated color palette with gold accents and modern typography
- **Responsive Design**: Pixel-perfect layout that adapts beautifully to all devices
- **Smooth Animations**: Professional scroll animations, hover effects, and transitions
- **Modern UI Components**: Clean, elegant design with attention to detail
- **Preloader**: Branded loading screen for premium first impression

### Sections & Content
- **Dynamic Hero Section**: Eye-catching hero with gradient backgrounds and call-to-action
- **Stats Counter**: Animated counters showcasing company achievements
- **Services Section**: 6 premium service offerings with icon designs
- **Property Listings**: 6 luxury properties with detailed information and imagery
- **Property Filtering**: Interactive filter system (All, Villas, Penthouses, Estates, New Listings)
- **Property Modal**: Detailed property view with full specifications and features
- **Testimonials**: Client reviews with 5-star ratings and avatars
- **About Section**: Company story with feature highlights
- **Newsletter Signup**: Email subscription for exclusive listings
- **Contact Section**: Multi-field contact form with interest selection

### Interactions & Functionality
- **Property Filtering**: Real-time filter with smooth animations
- **Property Modals**: Detailed property views with scheduling options
- **Animated Stats**: Counters that animate when scrolled into view
- **Scroll Animations**: Elements fade in as user scrolls
- **Smart Navigation**: Active section highlighting and smooth scrolling
- **Mobile Menu**: Elegant hamburger menu for mobile devices
- **Scroll-to-Top**: Floating button for easy navigation
- **Form Validation**: Client-side validation for all forms
- **Lazy Loading**: Performance-optimized content loading

### Technical
- **Fast Performance**: Optimized for speed with nginx serving static content
- **Cloud-Ready**: Containerized with Docker for easy deployment to Google Cloud Run
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured content
- **Security**: Configured security headers and input validation
- **Font Awesome Icons**: 500+ professional icons integrated
- **Google Fonts**: Premium typography (Playfair Display + Poppins)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Web Server**: nginx (Alpine)
- **Containerization**: Docker
- **Hosting**: Google Cloud Run
- **Fonts**: Google Fonts (Playfair Display, Poppins)

## Project Structure

```
WEBSITE_LIVETIME/
├── public/              # Website files
│   ├── index.html       # Main HTML file
│   ├── css/
│   │   └── style.css    # Stylesheet
│   ├── js/
│   │   └── script.js    # JavaScript functionality
│   └── images/          # Images directory
├── nginx.conf           # nginx configuration
├── Dockerfile           # Docker configuration
├── deploy-gcloud.sh     # Google Cloud Run deployment script
├── fix-docker-permissions.sh  # Docker permissions helper
└── README.md            # This file
```

## Local Development

### Prerequisites

- Docker installed
- Docker daemon running
- Proper Docker permissions (run `./fix-docker-permissions.sh` if needed)

### Running Locally with Docker

1. Build the Docker image:
   ```bash
   docker build -t emily-b-realty .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 emily-b-realty
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
2. Fix Docker permissions (if needed):
   ```bash
   ./fix-docker-permissions.sh
   ```

3. Run the deployment script:
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
gcloud config set project telepay-459221

# Configure Docker
gcloud auth configure-docker gcr.io

# Build and push
docker build -t gcr.io/telepay-459221/emily-b-realty .
docker push gcr.io/telepay-459221/emily-b-realty

# Deploy to Cloud Run
gcloud run deploy emily-b-realty \
  --image gcr.io/telepay-459221/emily-b-realty \
  --platform managed \
  --region us-east1 \
  --allow-unauthenticated \
  --port 8080
```

## Configuration

### Customizing the Website

- **Content**: Edit `public/index.html` to change text, properties, and structure
- **Styling**: Modify `public/css/style.css` to change colors, fonts, and layout
- **Interactivity**: Update `public/js/script.js` to add or modify JavaScript functionality

### Deployment Settings

Edit the variables at the top of `deploy-gcloud.sh`:

```bash
PROJECT_ID="your-project-id"
SERVICE_NAME="your-service-name"
REGION="your-preferred-region"
CPU="1"
MEMORY="2Gi"
```

## Docker Permissions

If you encounter Docker permission errors, see [DOCKER_PERMISSIONS_FIX.md](DOCKER_PERMISSIONS_FIX.md) for detailed instructions.

## Performance

The website is optimized for performance:
- Nginx serves static files efficiently
- Gzip compression enabled
- Static assets cached for 1 year
- Minimal external dependencies
- Lazy loading animations

## Security

Security headers are configured in nginx:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Access to hidden files denied

## License

All rights reserved - Emily B Realty

## Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for luxury real estate**
