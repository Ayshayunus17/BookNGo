// Travel Agency App JavaScript

// Initialize Lucide icons when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    
    // Check if lucide exists
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons created');
    } else {
        console.error('Lucide not loaded');
    }
    
    initializeApp();
});

// App State
let currentPage = 'home';
let currentRating = 0;

// Sample Data
const sampleTrips = [
    {
        id: 1,
        destination: 'Paris, France',
        dates: 'Mar 15-22, 2024',
        budget: 2500,
        status: 'completed',
        rating: 5,
        flag: '🇫🇷'
    },
    {
        id: 2,
        destination: 'Tokyo, Japan',
        dates: 'Jun 10-20, 2024',
        budget: 3200,
        status: 'upcoming',
        flag: '🇯🇵'
    },
    {
        id: 3,
        destination: 'Bali, Indonesia',
        dates: 'Dec 5-15, 2024',
        budget: 1800,
        status: 'upcoming',
        flag: '🇮🇩'
    }
];

const sampleReviews = [
    {
        id: 1,
        destination: 'Bali, Indonesia',
        rating: 5,
        review: 'Amazing experience! The hotel recommendations were perfect and everything stayed within budget.',
        user: 'Sarah M.',
        date: '2 weeks ago'
    },
    {
        id: 2,
        destination: 'Rome, Italy',
        rating: 4,
        review: 'Great trip planning. Only issue was the restaurant suggestions were a bit pricey.',
        user: 'Mike R.',
        date: '1 month ago'
    },
    {
        id: 3,
        destination: 'Barcelona, Spain',
        rating: 5,
        review: 'Perfect trip! Everything was organized beautifully. The architecture tour was a highlight and the beach time was relaxing. Highly recommend!',
        user: 'Emma L.',
        date: '3 weeks ago'
    }
];

// Initialize App
function initializeApp() {
    console.log('Initializing app...');
    
    // Check if required elements exist
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    console.log('Found nav items:', navItems.length);
    console.log('Found pages:', pages.length);
    
    if (navItems.length === 0) {
        console.error('No navigation items found!');
        return;
    }
    
    if (pages.length === 0) {
        console.error('No pages found!');
        return;
    }
    
    setupNavigation();
    setupTripForm();
    setupStarRating();
    setupDestinationCards();
    populateTrips();
    populateReviews();
    
    // Show home page by default
    showPage('home');
    console.log('App initialized successfully');
}

// Navigation Setup
function setupNavigation() {
    console.log('Setting up navigation...');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (navItems.length === 0) {
        console.error('No nav items found in setupNavigation');
        return;
    }
    
    navItems.forEach((item, index) => {
        const targetPage = item.getAttribute('data-page');
        console.log(`Nav item ${index}: ${targetPage}`);
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav clicked:', targetPage);
            
            showPage(targetPage);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    console.log('Navigation setup complete');
}

// Page Switching - Fixed function
function showPage(pageName) {
    console.log('showPage called with:', pageName);
    
    // Get all pages
    const pages = document.querySelectorAll('.page');
    console.log('Found pages:', pages.length);
    
    if (pages.length === 0) {
        console.error('No pages found!');
        return;
    }
    
    // Hide all pages
    pages.forEach((page, index) => {
        const pageId = page.id;
        console.log(`Hiding page ${index}: ${pageId}`);
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    console.log('Looking for page:', `${pageName}-page`);
    
    if (targetPage) {
        console.log('Found target page, showing it');
        targetPage.classList.add('active');
        targetPage.style.display = 'block';
        currentPage = pageName;
        console.log('Successfully switched to:', pageName);
    } else {
        console.error('Page not found:', `${pageName}-page`);
        
        // List all available pages
        pages.forEach(page => {
            console.log('Available page:', page.id);
        });
    }
}

// Legacy function for compatibility
function switchPage(pageName) {
    showPage(pageName);
}

// Trip Form Setup
function setupTripForm() {
    const tripForm = document.getElementById('trip-form');
    
    tripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateTripPlan();
    });
}

// Generate Trip Plan
function generateTripPlan() {
    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();
    const budget = parseInt(document.getElementById('budget').value);
    const travelers = parseInt(document.getElementById('travelers').value);
    
    // Validation
    if (!from || !to || !budget || budget <= 0) {
        alert('Please fill in all required fields with valid values.');
        return;
    }
    
    // Generate plan data
    const days = 7; // Default trip length
    const dailyBudget = Math.floor(budget / days);
    
    const plan = {
        destination: to,
        from: from,
        totalBudget: budget,
        dailyBudget: dailyBudget,
        travelers: travelers,
        accommodation: {
            name: `Premium Hotel in ${to}`,
            pricePerNight: Math.floor(dailyBudget * 0.4),
            rating: (4 + Math.random()).toFixed(1),
            amenities: ['Free WiFi', 'Swimming Pool', 'Complimentary Breakfast', '24/7 Concierge']
        },
        flights: {
            outbound: `${from} → ${to}`,
            return: `${to} → ${from}`,
            totalCost: Math.floor(budget * 0.35)
        },
        activities: [
            { 
                name: `${to} City Walking Tour`, 
                cost: Math.floor(dailyBudget * 0.25) 
            },
            { 
                name: 'Local Cultural Experience', 
                cost: Math.floor(dailyBudget * 0.20) 
            },
            { 
                name: 'Food & Market Tour', 
                cost: Math.floor(dailyBudget * 0.30) 
            },
            { 
                name: 'Adventure Activity', 
                cost: Math.floor(dailyBudget * 0.35) 
            }
        ]
    };
    
    // Calculate total estimated cost
    const accommodationTotal = plan.accommodation.pricePerNight * days;
    const activitiesTotal = plan.activities.reduce((sum, activity) => sum + activity.cost, 0);
    plan.totalEstimated = plan.flights.totalCost + accommodationTotal + activitiesTotal;
    
    displayTripPlan(plan);
}

// Display Trip Plan
function displayTripPlan(plan) {
    const tripPlanDiv = document.getElementById('trip-plan');
    const flightDetails = document.getElementById('flight-details');
    const hotelDetails = document.getElementById('hotel-details');
    const activitiesList = document.getElementById('activities-list');
    const totalCost = document.getElementById('total-cost');
    const budgetMessage = document.getElementById('budget-message');
    
    // Flight details
    flightDetails.innerHTML = `
        <div class="flight-info">
            <p><strong>${plan.flights.outbound}</strong></p>
            <p><strong>${plan.flights.return}</strong></p>
            <p class="activity-cost">Total: ₹${plan.flights.totalCost}</p>
        </div>
    `;
    
    // Hotel details
    hotelDetails.innerHTML = `
        <div class="hotel-info">
            <p><strong>${plan.accommodation.name}</strong></p>
            <p>₹${plan.accommodation.pricePerNight}/night</p>
            <div class="hotel-rating">
                <span><span class="rupee-icon">₹</span>${plan.accommodation.rating}</span>
            </div>
            <div class="amenities">
                ${plan.accommodation.amenities.map(amenity => 
                    `<span class="amenity-tag">${amenity}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Activities
    activitiesList.innerHTML = plan.activities.map(activity => `
        <div class="activity-item">
            <span>${activity.name}</span>
            <span class="activity-cost">₹${activity.cost}</span>
        </div>
    `).join('');
    
    // Budget summary
    totalCost.textContent = `₹${plan.totalEstimated}`;
    const withinBudget = plan.totalEstimated <= plan.totalBudget;
    budgetMessage.textContent = withinBudget 
        ? `Great! Within your ₹${plan.totalBudget} budget!` 
        : `Slightly over budget. Consider adjusting your preferences.`;
    budgetMessage.style.color = withinBudget ? '#047857' : '#dc2626';
    
    // Show the plan
    tripPlanDiv.classList.remove('hidden');
    
    // Scroll to plan
    tripPlanDiv.scrollIntoView({ behavior: 'smooth' });
}

// Star Rating Setup
function setupStarRating() {
    const stars = document.querySelectorAll('.star-rating i');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            currentRating = rating;
            updateStarDisplay(rating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });
    
    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', function() {
            updateStarDisplay(currentRating);
        });
    }
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Destination Cards Setup
function setupDestinationCards() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.querySelector('.destination-name').textContent;
            
            // Auto-fill the destination in the form
            document.getElementById('to').value = destination;
            
            // Switch to home page if not already there
            if (currentPage !== 'home') {
                showPage('home');
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                document.querySelector('.nav-item[data-page="home"]').classList.add('active');
            }
            
            // Focus on the form
            document.getElementById('from').focus();
        });
    });
}

// Populate Trips
function populateTrips() {
    const tripsList = document.getElementById('trips-list');
    
    tripsList.innerHTML = sampleTrips.map(trip => `
        <div class="trip-card">
            <div class="trip-header">
                <div class="trip-info">
                    <div class="trip-flag">${trip.flag}</div>
                    <div class="trip-details">
                        <h3>${trip.destination}</h3>
                        <div class="trip-meta">
                            <i data-lucide="calendar"></i>
                            <span>${trip.dates}</span>
                        </div>
                        <div class="trip-meta">
                            <i data-lucide="dollar-sign"></i>
                            <span>Budget: ₹${trip.budget}</span>
                        </div>
                    </div>
                </div>
                <div class="trip-status">
                    <span class="status-badge ${trip.status === 'completed' ? 'status-completed' : 'status-upcoming'}">
                        ${trip.status}
                    </span>
                    ${trip.rating ? `
                        <div class="star-rating-display">
                            ${'<i data-lucide="star"></i>'.repeat(trip.rating)}
                        </div>

                    ` : ''}
                </div>
            </div>
            <div class="trip-actions">
                <button class="btn-secondary" onclick="viewTripDetails(${trip.id})">View Details</button>
                ${trip.status === 'completed' ? 
                    `<button class="btn-secondary" onclick="leaveReview(${trip.id})">Leave Review</button>` : ''
                }
                ${trip.status === 'upcoming' ? 
                    `<button class="btn-secondary" onclick="editTrip(${trip.id})">Edit Trip</button>` : ''
                }
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons for the new content
    lucide.createIcons();
}

// Populate Reviews
function populateReviews() {
    const reviewsList = document.getElementById('reviews-list');
    
    reviewsList.innerHTML = sampleReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-info">
                    <div class="review-destination">${review.destination}</div>
                    <div class="review-rating">
                        ${'<i data-lucide="star"></i>'.repeat(review.rating)}
                    </div>
                </div>
                <div class="review-meta">
                    <p>${review.user}</p>
                    <p>${review.date}</p>
                </div>
            </div>
            <p class="review-text">${review.review}</p>
            <div class="review-actions">
                <button class="helpful-btn" onclick="markHelpful(${review.id})">
                    <i data-lucide="heart"></i>
                    Helpful
                </button>
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons for the new content
    lucide.createIcons();
}

// Trip Actions
function viewTripDetails(tripId) {
    const trip = sampleTrips.find(t => t.id === tripId);
    if (trip) {
        alert(`Viewing details for ${trip.destination}\nDates: ${trip.dates}\nBudget: ₹${trip.budget}\nStatus: ${trip.status}`);
    }
}

function leaveReview(tripId) {
    const trip = sampleTrips.find(t => t.id === tripId);
    if (trip) {
        // Switch to reviews page
        showPage('reviews');
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[data-page="reviews"]').classList.add('active');
        
        // Pre-fill destination in review form
        const destinationInput = document.querySelector('#review-form input[type="text"]');
        if (destinationInput) {
            destinationInput.value = trip.destination;
        }
        
        // Scroll to review form
        setTimeout(() => {
            const reviewForm = document.querySelector('.write-review');
            if (reviewForm) {
                reviewForm.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
}

function editTrip(tripId) {
    const trip = sampleTrips.find(t => t.id === tripId);
    if (trip) {
        alert(`Edit functionality for ${trip.destination} would be implemented here.`);
    }
}

// Review Actions
function markHelpful(reviewId) {
    const button = event.target.closest('.helpful-btn');
    if (button) {
        button.style.color = '#2563eb';
        button.innerHTML = '<i data-lucide="heart"></i> Helpful (1)';
        lucide.createIcons();
    }
}

// Form Submissions
document.addEventListener('submit', function(e) {
    if (e.target.id === 'review-form') {
        e.preventDefault();
        submitReview();
    }
});

function submitReview() {
    const form = document.getElementById('review-form');
    const destination = form.querySelector('input[type="text"]').value.trim();
    const reviewText = form.querySelector('textarea').value.trim();
    
    if (!destination || !reviewText || currentRating === 0) {
        alert('Please fill in all fields and provide a rating.');
        return;
    }
    
    // Create new review object
    const newReview = {
        id: sampleReviews.length + 1,
        destination: destination,
        rating: currentRating,
        review: reviewText,
        user: 'You',
        date: 'Just now'
    };
    
    // Add to beginning of reviews array
    sampleReviews.unshift(newReview);
    
    // Re-populate reviews
    populateReviews();
    
    // Reset form
    form.reset();
    currentRating = 0;
    updateStarDisplay(0);
    
    // Show success message
    showSuccessMessage('Review submitted successfully!');
    
    // Scroll to top of reviews
    document.getElementById('reviews-list').scrollIntoView({ behavior: 'smooth' });
}

// Utility Functions
function showSuccessMessage(message) {
    // Create and show a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const reviewsPage = document.getElementById('reviews-page');
    reviewsPage.insertBefore(successDiv, reviewsPage.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function showError(message) {
    alert(message); // In a real app, you'd show a nice error message
}

// Handle form validation
function validateTripForm() {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const budget = document.getElementById('budget');
    
    let isValid = true;
    
    // Remove previous error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.remove();
    });
    
    if (!from.value.trim()) {
        showFieldError(from, 'Departure city is required');
        isValid = false;
    }
    
    if (!to.value.trim()) {
        showFieldError(to, 'Destination is required');
        isValid = false;
    }
    
    if (!budget.value || parseInt(budget.value) <= 0) {
        showFieldError(budget, 'Please enter a valid budget amount');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

// Enhanced destination card interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.destination-card')) {
        const card = e.target.closest('.destination-card');
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }
});

// Smooth scrolling for internal navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add loading states for async operations
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Enhanced trip plan generation with loading
function generateTripPlanWithLoading() {
    if (!validateTripForm()) {
        return;
    }
    
    const button = document.querySelector('#trip-form button[type="submit"]');
    const originalText = button.textContent;
    
    button.innerHTML = '<div class="loading"></div> Generating Plan...';
    button.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        generateTripPlan();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Update trip form submission to use loading
document.getElementById('trip-form').addEventListener('submit', function(e) {
    e.preventDefault();
    generateTripPlanWithLoading();
});

// Initialize star rating data attributes
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        star.setAttribute('data-rating', index + 1);
    });
});

// Test function - you can call this in the browser console
function testNavigation() {
    console.log('Testing navigation...');
    const pages = ['home', 'account', 'trips', 'reviews', 'more'];
    
    pages.forEach(page => {
        console.log(`Testing page: ${page}`);
        showPage(page);
        setTimeout(() => {
            const currentPageElement = document.getElementById(`${page}-page`);
            const isVisible = currentPageElement && window.getComputedStyle(currentPageElement).display !== 'none';
            console.log(`Page ${page} is ${isVisible ? 'visible' : 'hidden'}`);
        }, 100);
    });
    
    // Return to home
    setTimeout(() => showPage('home'), 1000);
}

// Add manual navigation buttons for debugging (temporary)
function addDebugButtons() {
    const debugDiv = document.createElement('div');
    debugDiv.style.position = 'fixed';
    debugDiv.style.top = '10px';
    debugDiv.style.right = '10px';
    debugDiv.style.zIndex = '9999';
    debugDiv.style.background = 'red';
    debugDiv.style.padding = '10px';
    debugDiv.style.borderRadius = '5px';
    
    const pages = ['home', 'account', 'trips', 'reviews', 'more'];
    pages.forEach(page => {
        const btn = document.createElement('button');
        btn.textContent = page;
        btn.onclick = () => {
            console.log('Debug button clicked:', page);
            showPage(page);
        };
        btn.style.margin = '2px';
        btn.style.display = 'block';
        debugDiv.appendChild(btn);
    });
    
    document.body.appendChild(debugDiv);
}

// Uncomment the line below to add debug buttons
// setTimeout(addDebugButtons, 1000);
