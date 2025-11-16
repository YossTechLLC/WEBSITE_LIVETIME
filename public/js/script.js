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
            title: 'Luxury Buckhead Estate',
            location: 'Buckhead, Atlanta',
            price: '$2,495,000',
            beds: 5,
            baths: 4.5,
            sqft: '5,200',
            description: 'This stunning gated estate in prestigious Buckhead offers panoramic city views, premium finishes throughout, and resort-style living. The open-concept design features soaring ceilings, chef\'s kitchen, and seamless indoor-outdoor entertaining spaces perfect for Atlanta\'s lifestyle.',
            features: [
                'Gated community security',
                'Chef\'s gourmet kitchen',
                'Resort-style pool & spa',
                'Home theater room',
                'Wine cellar',
                'Atlanta skyline views',
                '3-car garage',
                'Outdoor kitchen & fireplace'
            ]
        },
        2: {
            title: 'Modern Midtown Penthouse',
            location: 'Midtown, Atlanta',
            price: '$1,895,000',
            beds: 3,
            baths: 3.5,
            sqft: '3,100',
            description: 'A breathtaking penthouse in the heart of Midtown offering spectacular Atlanta skyline views and a private rooftop terrace. This architectural masterpiece features floor-to-ceiling windows, modern luxury finishes, and walkability to Piedmont Park, restaurants, and entertainment.',
            features: [
                'Private rooftop terrace',
                'Floor-to-ceiling windows',
                'Skyline & park views',
                'Walking distance to Piedmont Park',
                'Modern gourmet kitchen',
                'Luxury spa bathrooms',
                'Concierge service',
                'Secure garage parking'
            ]
        },
        3: {
            title: 'Virginia-Highland Charmer',
            location: 'Virginia-Highland, Atlanta',
            price: '$1,350,000',
            beds: 4,
            baths: 3,
            sqft: '2,800',
            description: 'A beautifully renovated craftsman bungalow combining timeless charm with modern amenities. Located in walkable Virginia-Highland, this gem features original hardwoods, updated kitchen and baths, and a private backyard oasis. Steps to shops, restaurants, and parks.',
            features: [
                'Original hardwood floors',
                'Modern chef\'s kitchen',
                'Updated luxury bathrooms',
                'Private backyard oasis',
                'Front porch',
                'Walk to Highland Avenue',
                'Original craftsman details',
                'Home office'
            ]
        },
        4: {
            title: 'Elegant Brookhaven Home',
            location: 'Brookhaven, Atlanta',
            price: '$1,750,000',
            beds: 5,
            baths: 4.5,
            sqft: '4,800',
            description: 'A stunning traditional estate in sought-after Brookhaven offering timeless elegance and modern luxury. Features include a gourmet kitchen, resort-style pool, outdoor living spaces, and proximity to top-rated schools, shopping, and dining.',
            features: [
                'Resort-style pool',
                'Outdoor living & kitchen',
                'Gourmet chef\'s kitchen',
                'Master on main',
                'Top-rated schools nearby',
                'Finished basement',
                'Private backyard',
                '3-car garage'
            ]
        },
        5: {
            title: 'Historic Inman Park Townhome',
            location: 'Inman Park, Atlanta',
            price: '$975,000',
            beds: 3,
            baths: 2.5,
            sqft: '2,400',
            description: 'A meticulously restored Victorian townhome in historic Inman Park blending original character with modern updates. Features include exposed brick, original hardwoods, rooftop deck, and walkability to the BeltLine, Krog Street Market, and Inman Park restaurants.',
            features: [
                'Victorian architecture',
                'Rooftop deck',
                'Exposed brick walls',
                'Original hardwood floors',
                'Walk to BeltLine',
                'Near Krog Street Market',
                'Modern kitchen & baths',
                'Private courtyard'
            ]
        },
        6: {
            title: 'Charming Decatur Home',
            location: 'Decatur, Atlanta',
            price: '$825,000',
            beds: 4,
            baths: 3,
            sqft: '3,200',
            description: 'A spacious and charming family home in vibrant Decatur near top-rated schools, shops, and restaurants. This well-maintained property features an updated kitchen, hardwood floors, large backyard, and the quintessential Decatur lifestyle just steps away.',
            features: [
                'Top-rated Decatur schools',
                'Walk to downtown Decatur',
                'Updated kitchen',
                'Hardwood floors throughout',
                'Large backyard',
                'Front porch',
                'Finished basement',
                'Near restaurants & shops'
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

            <div style="padding-top: 30px; border-top: 2px solid #eee;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <div>
                        <p style="color: var(--text-light); margin-bottom: 5px;">Example Price Range</p>
                        <h3 style="font-size: 2.5rem; color: var(--secondary-color);">${property.price}</h3>
                    </div>
                    <button onclick="scrollToContact()" class="btn btn-secondary" style="padding: 15px 40px;">
                        <i class="fas fa-calendar-check"></i> Contact Emily
                    </button>
                </div>
                <div style="background: var(--bg-light); padding: 25px; border-radius: 10px; text-align: center;">
                    <p style="color: var(--text-dark); margin-bottom: 15px; font-size: 1.05rem;">
                        <strong>This is a sample property.</strong> Search Method Atlanta's complete MLS database for current listings:
                    </p>
                    <a href="https://www.methodatlanta.com/search/results" target="_blank" class="btn btn-primary" style="padding: 15px 40px;">
                        <i class="fas fa-search"></i> Search All Available Properties
                    </a>
                </div>
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
