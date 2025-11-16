// ========================================
// EMILY B REALTY - PREMIUM LUXURY REAL ESTATE
// Enhanced JavaScript Functionality
// ========================================

// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// ========== NAVIGATION ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ACTIVE NAVIGATION ON SCROLL ==========
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== STATS COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.counter');
let countStarted = false;

function startCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter when stats section is visible
const observerOptions = {
    threshold: 0.3
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countStarted) {
            countStarted = true;
            startCounters();
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-bar');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========== PROPERTY FILTERING ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        propertyCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ========== SCROLL ANIMATIONS ==========
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Animate property cards
document.addEventListener('DOMContentLoaded', () => {
    propertyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        animateOnScroll.observe(card);
    });

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        animateOnScroll.observe(card);
    });

    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        animateOnScroll.observe(card);
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== PROPERTY MODAL ==========
function openPropertyModal(propertyId) {
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');

    // Property data
    const properties = {
        1: {
            title: 'Modern Luxury Villa',
            location: 'Beverly Hills, CA',
            price: '$3,500,000',
            beds: 5,
            baths: 4,
            sqft: '4,500',
            description: 'This stunning modern villa offers unparalleled luxury living with panoramic city views, premium finishes throughout, and state-of-the-art smart home technology. The open-concept design seamlessly blends indoor and outdoor spaces, perfect for entertaining.',
            features: [
                'Infinity pool with spa',
                'Gourmet chef\'s kitchen',
                'Home theater',
                'Wine cellar',
                'Smart home automation',
                'Panoramic city views',
                '3-car garage',
                'Outdoor entertainment area'
            ]
        },
        2: {
            title: 'Oceanfront Paradise',
            location: 'Malibu, CA',
            price: '$5,750,000',
            beds: 6,
            baths: 5,
            sqft: '5,200',
            description: 'A breathtaking beachfront estate offering direct beach access and spectacular ocean views. This architectural masterpiece features floor-to-ceiling windows, an infinity pool, and luxury finishes throughout. Wake up to the sound of waves every morning.',
            features: [
                'Private beach access',
                'Infinity pool overlooking ocean',
                'Floor-to-ceiling windows',
                'Master suite with ocean views',
                'Modern gourmet kitchen',
                'Home gym',
                'Guest house',
                'Outdoor kitchen and bar'
            ]
        },
        3: {
            title: 'Contemporary Masterpiece',
            location: 'Los Angeles, CA',
            price: '$2,850,000',
            beds: 4,
            baths: 3,
            sqft: '3,800',
            description: 'An architectural gem featuring cutting-edge design and the latest smart home technology. This contemporary home showcases clean lines, premium materials, and an open floor plan that maximizes natural light and space.',
            features: [
                'Smart home integration',
                'Solar panels',
                'Modern architecture',
                'Open floor plan',
                'Designer kitchen',
                'Spa-like bathrooms',
                'Landscaped yard',
                'Home office'
            ]
        },
        4: {
            title: 'Mountain View Estate',
            location: 'Aspen, CO',
            price: '$4,200,000',
            beds: 7,
            baths: 6,
            sqft: '6,500',
            description: 'A luxurious mountain retreat offering ski-in/ski-out access and stunning mountain views. This expansive estate features rustic elegance combined with modern amenities, perfect for year-round enjoyment.',
            features: [
                'Ski-in/ski-out access',
                'Mountain views',
                'Large great room with fireplace',
                'Gourmet kitchen',
                'Game room',
                'Home theater',
                'Heated garage',
                'Hot tub on deck'
            ]
        },
        5: {
            title: 'Downtown Penthouse',
            location: 'San Francisco, CA',
            price: '$2,950,000',
            beds: 3,
            baths: 3,
            sqft: '3,200',
            description: 'An exclusive penthouse offering 360-degree city views and a massive rooftop terrace. This ultra-modern residence features floor-to-ceiling windows, premium finishes, and access to world-class building amenities.',
            features: [
                '360-degree city views',
                'Rooftop terrace',
                'Floor-to-ceiling windows',
                'Concierge service',
                'Fitness center access',
                'Modern kitchen',
                'Walk-in closets',
                'Secure parking'
            ]
        },
        6: {
            title: 'Golf Course Villa',
            location: 'Scottsdale, AZ',
            price: '$3,150,000',
            beds: 5,
            baths: 4,
            sqft: '4,100',
            description: 'A premium villa situated on a championship golf course with resort-style amenities. This elegant home features stunning golf course views, a resort-style pool, and luxurious indoor-outdoor living spaces.',
            features: [
                'Golf course frontage',
                'Resort-style pool and spa',
                'Outdoor living spaces',
                'Gourmet kitchen',
                'Home theater',
                'Wine storage',
                '3-car garage',
                'Casita guest house'
            ]
        }
    };

    const property = properties[propertyId];

    // Create modal content
    const content = `
        <div style="padding: 50px;">
            <h2 style="font-size: 2.5rem; margin-bottom: 10px; color: var(--primary-color);">${property.title}</h2>
            <p style="color: var(--text-light); margin-bottom: 20px; font-size: 1.1rem;">
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </p>

            <div style="display: flex; gap: 30px; margin-bottom: 30px; padding: 20px; background: var(--bg-light); border-radius: 10px;">
                <div>
                    <i class="fas fa-bed" style="color: var(--secondary-color);"></i> <strong>${property.beds}</strong> Bedrooms
                </div>
                <div>
                    <i class="fas fa-bath" style="color: var(--secondary-color);"></i> <strong>${property.baths}</strong> Bathrooms
                </div>
                <div>
                    <i class="fas fa-ruler-combined" style="color: var(--secondary-color);"></i> <strong>${property.sqft}</strong> sq ft
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.8rem; margin-bottom: 15px; color: var(--primary-color);">About This Property</h3>
                <p style="line-height: 1.8; color: var(--text-light);">${property.description}</p>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.8rem; margin-bottom: 15px; color: var(--primary-color);">Features & Amenities</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${property.features.map(feature => `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-check-circle" style="color: var(--secondary-color);"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 2px solid #eee;">
                <div>
                    <p style="color: var(--text-light); margin-bottom: 5px;">Price</p>
                    <h3 style="font-size: 2.5rem; color: var(--secondary-color);">${property.price}</h3>
                </div>
                <button onclick="scrollToContact()" class="btn btn-primary" style="padding: 15px 40px;">
                    <i class="fas fa-calendar-check"></i> Schedule Viewing
                </button>
            </div>
        </div>
    `;

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function scrollToContact() {
    closePropertyModal();
    setTimeout(() => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

// Close modal when clicking outside
document.getElementById('propertyModal').addEventListener('click', (e) => {
    if (e.target.id === 'propertyModal') {
        closePropertyModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePropertyModal();
    }
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message
        alert(`Thank you, ${name}! We've received your inquiry and will contact you shortly.`);

        // Reset form
        contactForm.reset();
    });
}

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message
        alert('Thank you for subscribing! You\'ll receive exclusive property listings in your inbox.');

        // Reset form
        newsletterForm.reset();
    });
}

// ========== HERO SCROLL INDICATOR ==========
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
    });
}

// ========== LAZY LOADING EFFECT ==========
// Add fade-in effect to elements as they enter viewport
const fadeElements = document.querySelectorAll('.service-card, .property-card, .testimonial-card, .info-card');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ========== FORM INPUT ANIMATIONS ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
formInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    });

    input.addEventListener('blur', (e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
    });
});

// ========== CONSOLE MESSAGE ==========
console.log('%c🏠 Emily B Realty', 'font-size: 24px; font-weight: bold; color: #c9a961; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cPremium Luxury Real Estate', 'font-size: 14px; color: #636e72; margin-top: 10px;');
console.log('%cWebsite built with excellence and luxury in mind.', 'font-size: 12px; color: #999; margin-top: 5px;');

// ========== PERFORMANCE LOGGING ==========
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`%cPage loaded in ${(loadTime / 1000).toFixed(2)}s`, 'color: #c9a961; font-weight: bold;');
    }
});
