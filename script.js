// Application State
const state = {
    currentUser: null,
    items: [],
    rentals: [],
    requests: [],
    messages: [],
    reviews: [],
    selectedRating: 0,
    activeFilters: {
        category: '',
        minPrice: null,
        maxPrice: null,
        location: '',
        sortBy: 'newest'
    }
};

// Categories Data
const categories = [
    { name: 'Electronics', icon: 'fa-mobile-alt' },
    { name: 'Tools', icon: 'fa-tools' },
    { name: 'Sports', icon: 'fa-football-ball' },
    { name: 'Vehicles', icon: 'fa-car' },
    { name: 'Events', icon: 'fa-birthday-cake' },
    { name: 'Food', icon: 'fa-utensils' },
    { name: 'Music', icon: 'fa-music' },
    { name: 'Appliances', icon: 'fa-blender' }
];

// Sample Items Data
const sampleItems = [
    {
        id: 1,
        name: 'Canon EOS R6 Camera',
        category: 'Electronics',
        description: 'Professional mirrorless camera with 20MP sensor',
        rate: 45,
        deposit: 200,
        location: 'San Francisco, CA',
        owner: 'John Doe',
        ownerId: 'demo',
        rating: 4.8,
        reviews: 12,
        icon: 'fa-camera'
    },
    {
        id: 2,
        name: 'Mountain Bike',
        category: 'Sports',
        description: 'Trek mountain bike in excellent condition',
        rate: 25,
        deposit: 100,
        location: 'Los Angeles, CA',
        owner: 'Jane Smith',
        ownerId: 'demo2',
        rating: 4.9,
        reviews: 8,
        icon: 'fa-bicycle'
    },
    {
        id: 3,
        name: 'Power Drill Set',
        category: 'Tools',
        description: 'Complete power drill set with all accessories',
        rate: 15,
        deposit: 50,
        location: 'Seattle, WA',
        owner: 'Mike Johnson',
        ownerId: 'demo3',
        rating: 4.7,
        reviews: 15,
        icon: 'fa-tools'
    },
    {
        id: 4,
        name: 'Party Tent',
        category: 'Events',
        description: 'Large outdoor tent for events and parties',
        rate: 80,
        deposit: 150,
        location: 'Austin, TX',
        owner: 'Sarah Williams',
        ownerId: 'demo4',
        rating: 4.6,
        reviews: 20,
        icon: 'fa-umbrella'
    },
    {
        id: 5,
        name: 'DJ Equipment',
        category: 'Music',
        description: 'Professional DJ controller and mixer',
        rate: 60,
        deposit: 300,
        location: 'Miami, FL',
        owner: 'Chris Brown',
        ownerId: 'demo5',
        rating: 4.9,
        reviews: 18,
        icon: 'fa-music'
    },
    {
        id: 6,
        name: 'Pressure Washer',
        category: 'Tools',
        description: 'High-pressure washer for outdoor cleaning',
        rate: 30,
        deposit: 75,
        location: 'Denver, CO',
        owner: 'Emily Davis',
        ownerId: 'demo6',
        rating: 4.5,
        reviews: 10,
        icon: 'fa-shower'
    }
];

// Initialize the application
function init() {
    // Load data from localStorage
    loadFromStorage();
    
    // If no items exist, load sample items
    if (state.items.length === 0) {
        state.items = [...sampleItems];
        saveToStorage();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Render initial content
    renderCategories();
    renderItems();
    
    // Check if user is logged in
    checkAuth();
}

// Storage functions
function saveToStorage() {
    localStorage.setItem('rentease_state', JSON.stringify(state));
}

function loadFromStorage() {
    const saved = localStorage.getItem('rentease_state');
    if (saved) {
        const loaded = JSON.parse(saved);
        Object.assign(state, loaded);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Header buttons
    document.getElementById('signInBtn').addEventListener('click', () => openModal('signInModal'));
    document.getElementById('signUpBtn').addEventListener('click', () => openModal('signUpModal'));
    document.getElementById('dashboardBtn').addEventListener('click', showDashboard);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Mobile menu
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    document.getElementById('mobileSignInBtn').addEventListener('click', () => {
        toggleMobileMenu();
        openModal('signInModal');
    });
    document.getElementById('mobileSignUpBtn').addEventListener('click', () => {
        toggleMobileMenu();
        openModal('signUpModal');
    });
    document.getElementById('mobileDashboardBtn').addEventListener('click', () => {
        toggleMobileMenu();
        showDashboard();
    });
    document.getElementById('mobileLogoutBtn').addEventListener('click', () => {
        toggleMobileMenu();
        logout();
    });
    
    // Hero buttons
    document.getElementById('listItemBtn').addEventListener('click', () => {
        if (!state.currentUser) {
            showNotification('Please sign in to list an item', 'error');
            openModal('signInModal');
            return;
        }
        openModal('listItemModal');
    });
    document.getElementById('getStartedBtn').addEventListener('click', scrollToCategories);
    document.getElementById('viewAllBtn').addEventListener('click', () => {
        scrollToCategories();
    });
    
    // Logo
    document.getElementById('logoLink').addEventListener('click', (e) => {
        e.preventDefault();
        showHome();
    });
    
    // Search functionality
    document.getElementById('mainSearch').addEventListener('input', handleSearch);
    document.getElementById('mobileSearch').addEventListener('input', handleSearch);
    document.getElementById('heroSearch').addEventListener('input', handleSearch);
    document.getElementById('heroSearchBtn').addEventListener('click', () => {
        scrollToCategories();
    });
    
    // Forms
    document.getElementById('signInForm').addEventListener('submit', handleSignIn);
    document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
    document.getElementById('listItemForm').addEventListener('submit', handleListItem);
    document.getElementById('rentalRequestForm').addEventListener('submit', handleRentalRequest);
    document.getElementById('messageForm').addEventListener('submit', handleSendMessage);
    document.getElementById('reviewForm').addEventListener('submit', handleSubmitReview);
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Dashboard tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Rating stars
    document.querySelectorAll('#ratingStars i').forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setRating(rating);
        });
    });
    
    // Add new item button in dashboard
    const addNewItemBtn = document.getElementById('addNewItemBtn');
    if (addNewItemBtn) {
        addNewItemBtn.addEventListener('click', () => openModal('listItemModal'));
    }
    
    // Rental date change
    document.getElementById('rentalStartDate').addEventListener('change', calculateRentalCost);
    document.getElementById('rentalEndDate').addEventListener('change', calculateRentalCost);
    
    // Filter functionality
    document.getElementById('filterToggleBtn').addEventListener('click', toggleFilters);
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
    document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Auth functions
function handleSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    
    // Simple demo authentication
    state.currentUser = {
        id: 'user_' + Date.now(),
        email: email,
        name: email.split('@')[0],
        location: 'San Francisco, CA'
    };
    
    saveToStorage();
    closeModal('signInModal');
    updateAuthUI();
    showNotification('Successfully signed in!', 'success');
}

function handleSignUp(e) {
    e.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const location = document.getElementById('signUpLocation').value;
    
    state.currentUser = {
        id: 'user_' + Date.now(),
        email: email,
        name: name,
        location: location
    };
    
    saveToStorage();
    closeModal('signUpModal');
    updateAuthUI();
    showNotification('Account created successfully!', 'success');
}

function logout() {
    state.currentUser = null;
    saveToStorage();
    updateAuthUI();
    showHome();
    showNotification('Logged out successfully', 'info');
}

function checkAuth() {
    updateAuthUI();
}

function updateAuthUI() {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const mobileSignInBtn = document.getElementById('mobileSignInBtn');
    const mobileSignUpBtn = document.getElementById('mobileSignUpBtn');
    const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    
    if (state.currentUser) {
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        dashboardBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
        
        mobileSignInBtn.style.display = 'none';
        mobileSignUpBtn.style.display = 'none';
        mobileDashboardBtn.style.display = 'block';
        mobileLogoutBtn.style.display = 'block';
    } else {
        signInBtn.style.display = 'inline-block';
        signUpBtn.style.display = 'inline-block';
        dashboardBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        
        mobileSignInBtn.style.display = 'block';
        mobileSignUpBtn.style.display = 'block';
        mobileDashboardBtn.style.display = 'none';
        mobileLogoutBtn.style.display = 'none';
    }
}

// Render functions
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="filterByCategory('${cat.name}')">
            <div class="category-icon"><i class="fas ${cat.icon}"></i></div>
            <h3>${cat.name}</h3>
        </div>
    `).join('');
}

function renderItems(filter = null) {
    const grid = document.getElementById('itemsGrid');
    let items = [...state.items];
    
    // Apply search filter
    if (filter && filter.trim() !== '') {
        const searchTerm = filter.toLowerCase().trim();
        items = items.filter(item => 
            item.category.toLowerCase().includes(searchTerm) ||
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply active filters
    items = applyActiveFilters(items);
    
    if (items.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><p>No items found matching your criteria.</p></div>';
        return;
    }
    
    grid.innerHTML = items.map(item => createItemCard(item)).join('');
}

function applyActiveFilters(items) {
    let filtered = [...items];
    
    // Category filter
    if (state.activeFilters.category) {
        filtered = filtered.filter(item => 
            item.category === state.activeFilters.category
        );
    }
    
    // Price filter
    if (state.activeFilters.minPrice !== null) {
        filtered = filtered.filter(item => 
            item.rate >= state.activeFilters.minPrice
        );
    }
    
    if (state.activeFilters.maxPrice !== null) {
        filtered = filtered.filter(item => 
            item.rate <= state.activeFilters.maxPrice
        );
    }
    
    // Location filter
    if (state.activeFilters.location) {
        const locationTerm = state.activeFilters.location.toLowerCase();
        filtered = filtered.filter(item => 
            item.location.toLowerCase().includes(locationTerm)
        );
    }
    
    // Sort
    switch(state.activeFilters.sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.rate - b.rate);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.rate - a.rate);
            break;
        case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'newest':
        default:
            filtered.sort((a, b) => b.id - a.id);
            break;
    }
    
    return filtered;
}

function createItemCard(item) {
    const iconClass = item.icon || 'fa-box';
    return `
        <div class="item-card">
            <div class="item-image">
                <i class="fas ${iconClass}"></i>
                ${item.rating ? `<span class="item-badge">⭐ ${item.rating}</span>` : ''}
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">$${item.rate}/day</div>
                <div class="item-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${item.location}
                </div>
                ${item.rating ? `
                    <div class="item-rating">
                        <i class="fas fa-star"></i>
                        ${item.rating} (${item.reviews} reviews)
                    </div>
                ` : ''}
                <div class="item-actions">
                    <button class="btn btn-primary" onclick="requestRental(${item.id})">Rent Now</button>
                    <button class="btn btn-secondary" onclick="sendMessage(${item.id})">Message</button>
                </div>
            </div>
        </div>
    `;
}

// Item listing
function handleListItem(e) {
    e.preventDefault();
    
    if (!state.currentUser) {
        showNotification('Please sign in first', 'error');
        return;
    }
    
    const item = {
        id: Date.now(),
        name: document.getElementById('itemName').value,
        category: document.getElementById('itemCategory').value,
        description: document.getElementById('itemDescription').value,
        rate: parseFloat(document.getElementById('itemRate').value),
        deposit: parseFloat(document.getElementById('itemDeposit').value),
        location: document.getElementById('itemLocation').value,
        owner: state.currentUser.name,
        ownerId: state.currentUser.id,
        rating: 0,
        reviews: 0,
        icon: getCategoryIcon(document.getElementById('itemCategory').value)
    };
    
    state.items.unshift(item);
    saveToStorage();
    closeModal('listItemModal');
    document.getElementById('listItemForm').reset();
    renderItems();
    showNotification('Item listed successfully!', 'success');
}

function getCategoryIcon(category) {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : 'fa-box';
}

// Rental request
function requestRental(itemId) {
    if (!state.currentUser) {
        showNotification('Please sign in to rent items', 'error');
        openModal('signInModal');
        return;
    }
    
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
    
    if (item.ownerId === state.currentUser.id) {
        showNotification('You cannot rent your own item', 'error');
        return;
    }
    
    document.getElementById('requestItemId').value = itemId;
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('rentalStartDate').min = today;
    document.getElementById('rentalEndDate').min = today;
    
    openModal('rentalRequestModal');
}

function calculateRentalCost() {
    const itemId = document.getElementById('requestItemId').value;
    const startDate = document.getElementById('rentalStartDate').value;
    const endDate = document.getElementById('rentalEndDate').value;
    
    if (!itemId || !startDate || !endDate) return;
    
    const item = state.items.find(i => i.id == itemId);
    if (!item) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    if (days < 1) {
        document.getElementById('rentalSummary').innerHTML = '<p style="color: red;">End date must be after start date</p>';
        return;
    }
    
    const rentalCost = days * item.rate;
    const total = rentalCost + item.deposit;
    
    document.getElementById('rentalSummary').innerHTML = `
        <h4>Rental Summary</h4>
        <p><strong>Item:</strong> ${item.name}</p>
        <p><strong>Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
        <p><strong>Daily Rate:</strong> $${item.rate}</p>
        <p><strong>Rental Cost:</strong> $${rentalCost}</p>
        <p><strong>Deposit:</strong> $${item.deposit}</p>
        <p><strong>Total:</strong> $${total}</p>
    `;
}

function handleRentalRequest(e) {
    e.preventDefault();
    
    const itemId = parseInt(document.getElementById('requestItemId').value);
    const startDate = document.getElementById('rentalStartDate').value;
    const endDate = document.getElementById('rentalEndDate').value;
    const message = document.getElementById('rentalMessage').value;
    
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
    
    const request = {
        id: Date.now(),
        itemId: itemId,
        itemName: item.name,
        renterId: state.currentUser.id,
        renterName: state.currentUser.name,
        ownerId: item.ownerId,
        ownerName: item.owner,
        startDate: startDate,
        endDate: endDate,
        message: message,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    state.requests.push(request);
    saveToStorage();
    closeModal('rentalRequestModal');
    document.getElementById('rentalRequestForm').reset();
    showNotification('Rental request sent successfully!', 'success');
}

// Messaging
function sendMessage(itemId) {
    if (!state.currentUser) {
        showNotification('Please sign in to send messages', 'error');
        openModal('signInModal');
        return;
    }
    
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
    
    document.getElementById('messageItemId').value = itemId;
    openModal('messageModal');
}

function handleSendMessage(e) {
    e.preventDefault();
    
    const itemId = parseInt(document.getElementById('messageItemId').value);
    const text = document.getElementById('messageText').value;
    
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
    
    const message = {
        id: Date.now(),
        itemId: itemId,
        itemName: item.name,
        senderId: state.currentUser.id,
        senderName: state.currentUser.name,
        recipientId: item.ownerId,
        recipientName: item.owner,
        text: text,
        createdAt: new Date().toISOString(),
        read: false
    };
    
    state.messages.push(message);
    saveToStorage();
    closeModal('messageModal');
    document.getElementById('messageForm').reset();
    showNotification('Message sent successfully!', 'success');
}

// Reviews
function setRating(rating) {
    state.selectedRating = rating;
    document.querySelectorAll('#ratingStars i').forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

function handleSubmitReview(e) {
    e.preventDefault();
    
    if (state.selectedRating === 0) {
        showNotification('Please select a rating', 'error');
        return;
    }
    
    const itemId = parseInt(document.getElementById('reviewItemId').value);
    const text = document.getElementById('reviewText').value;
    
    const review = {
        id: Date.now(),
        itemId: itemId,
        userId: state.currentUser.id,
        userName: state.currentUser.name,
        rating: state.selectedRating,
        text: text,
        createdAt: new Date().toISOString()
    };
    
    state.reviews.push(review);
    
    // Update item rating
    const item = state.items.find(i => i.id === itemId);
    if (item) {
        const itemReviews = state.reviews.filter(r => r.itemId === itemId);
        const avgRating = itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length;
        item.rating = Math.round(avgRating * 10) / 10;
        item.reviews = itemReviews.length;
    }
    
    saveToStorage();
    closeModal('reviewModal');
    document.getElementById('reviewForm').reset();
    state.selectedRating = 0;
    setRating(0);
    showNotification('Review submitted successfully!', 'success');
    renderDashboard();
}

// Dashboard
function showDashboard() {
    if (!state.currentUser) {
        showNotification('Please sign in first', 'error');
        openModal('signInModal');
        return;
    }
    
    document.getElementById('homeSection').style.display = 'none';
    document.querySelector('.why-choose').style.display = 'none';
    document.querySelector('.browse-categories').style.display = 'none';
    document.querySelector('.featured-items').style.display = 'none';
    document.querySelector('.how-it-works').style.display = 'none';
    document.getElementById('dashboardSection').classList.add('active');
    
    renderDashboard();
    window.scrollTo(0, 0);
}

function showHome() {
    document.getElementById('homeSection').style.display = 'block';
    document.querySelector('.why-choose').style.display = 'block';
    document.querySelector('.browse-categories').style.display = 'block';
    document.querySelector('.featured-items').style.display = 'block';
    document.querySelector('.how-it-works').style.display = 'block';
    document.getElementById('dashboardSection').classList.remove('active');
    window.scrollTo(0, 0);
}

function renderDashboard() {
    renderMyListings();
    renderMyRentals();
    renderRentalRequests();
    renderMessages();
    renderProfile();
}

function renderMyListings() {
    const grid = document.getElementById('userItemsGrid');
    const userItems = state.items.filter(item => item.ownerId === state.currentUser.id);
    
    if (userItems.length === 0) {
        grid.innerHTML = '<p>You haven\'t listed any items yet. Click "Add New Item" to get started!</p>';
        return;
    }
    
    grid.innerHTML = userItems.map(item => createUserItemCard(item)).join('');
}

function createUserItemCard(item) {
    return `
        <div class="item-card">
            <div class="item-image">
                <i class="fas ${item.icon || 'fa-box'}"></i>
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">$${item.rate}/day</div>
                <div class="item-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${item.location}
                </div>
                <div class="item-actions">
                    <button class="btn btn-primary" onclick="editItem(${item.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
                </div>
            </div>
        </div>
    `;
}

function editItem(itemId) {
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
    
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemRate').value = item.rate;
    document.getElementById('itemDeposit').value = item.deposit;
    document.getElementById('itemLocation').value = item.location;
    
    // Remove old submit handler and add update handler
    const form = document.getElementById('listItemForm');
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        item.name = document.getElementById('itemName').value;
        item.category = document.getElementById('itemCategory').value;
        item.description = document.getElementById('itemDescription').value;
        item.rate = parseFloat(document.getElementById('itemRate').value);
        item.deposit = parseFloat(document.getElementById('itemDeposit').value);
        item.location = document.getElementById('itemLocation').value;
        
        saveToStorage();
        closeModal('listItemModal');
        renderDashboard();
        renderItems();
        showNotification('Item updated successfully!', 'success');
        
        // Restore original handler
        setupEventListeners();
    });
    
    openModal('listItemModal');
}

function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    state.items = state.items.filter(i => i.id !== itemId);
    saveToStorage();
    renderDashboard();
    renderItems();
    showNotification('Item deleted successfully', 'success');
}

function renderMyRentals() {
    const container = document.getElementById('rentalsContainer');
    const myRentals = state.requests.filter(r => r.renterId === state.currentUser.id);
    
    if (myRentals.length === 0) {
        container.innerHTML = '<p>You don\'t have any active rentals.</p>';
        return;
    }
    
    container.innerHTML = myRentals.map(rental => `
        <div class="rental-card">
            <div class="rental-header">
                <h3>${rental.itemName}</h3>
                <span class="status-badge status-${rental.status}">${rental.status.toUpperCase()}</span>
            </div>
            <p><strong>Owner:</strong> ${rental.ownerName}</p>
            <p><strong>Start Date:</strong> ${rental.startDate}</p>
            <p><strong>End Date:</strong> ${rental.endDate}</p>
            ${rental.message ? `<p><strong>Message:</strong> ${rental.message}</p>` : ''}
            ${rental.status === 'approved' ? `
                <button class="btn btn-primary" onclick="leaveReview(${rental.itemId})">Leave Review</button>
            ` : ''}
        </div>
    `).join('');
}

function renderRentalRequests() {
    const container = document.getElementById('requestsContainer');
    const requests = state.requests.filter(r => r.ownerId === state.currentUser.id);
    
    if (requests.length === 0) {
        container.innerHTML = '<p>No rental requests yet.</p>';
        return;
    }
    
    container.innerHTML = requests.map(request => `
        <div class="request-card">
            <div class="request-header">
                <h3>${request.itemName}</h3>
                <span class="status-badge status-${request.status}">${request.status.toUpperCase()}</span>
            </div>
            <p><strong>Renter:</strong> ${request.renterName}</p>
            <p><strong>Start Date:</strong> ${request.startDate}</p>
            <p><strong>End Date:</strong> ${request.endDate}</p>
            ${request.message ? `<p><strong>Message:</strong> ${request.message}</p>` : ''}
            ${request.status === 'pending' ? `
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="btn btn-success" onclick="approveRequest(${request.id})">Approve</button>
                    <button class="btn btn-danger" onclick="rejectRequest(${request.id})">Reject</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function approveRequest(requestId) {
    const request = state.requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'approved';
        saveToStorage();
        renderDashboard();
        showNotification('Request approved!', 'success');
    }
}

function rejectRequest(requestId) {
    const request = state.requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'rejected';
        saveToStorage();
        renderDashboard();
        showNotification('Request rejected', 'info');
    }
}

function renderMessages() {
    const container = document.getElementById('messagesContainer');
    const myMessages = state.messages.filter(m => 
        m.senderId === state.currentUser.id || m.recipientId === state.currentUser.id
    );
    
    if (myMessages.length === 0) {
        container.innerHTML = '<p>No messages yet.</p>';
        return;
    }
    
    container.innerHTML = myMessages.map(message => {
        const isSender = message.senderId === state.currentUser.id;
        return `
            <div class="message-card">
                <div class="message-header">
                    <h4>${message.itemName}</h4>
                    <small>${new Date(message.createdAt).toLocaleString()}</small>
                </div>
                <p><strong>${isSender ? 'To' : 'From'}:</strong> ${isSender ? message.recipientName : message.senderName}</p>
                <p>${message.text}</p>
            </div>
        `;
    }).join('');
}

function renderProfile() {
    const container = document.getElementById('profileContainer');
    container.innerHTML = `
        <form class="profile-form" id="profileForm">
            <h3>Profile Information</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="profileName" value="${state.currentUser.name}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="profileEmail" value="${state.currentUser.email}" required>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" id="profileLocation" value="${state.currentUser.location}" required>
            </div>
            <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
    `;
    
    document.getElementById('profileForm').addEventListener('submit', handleUpdateProfile);
}

function handleUpdateProfile(e) {
    e.preventDefault();
    
    state.currentUser.name = document.getElementById('profileName').value;
    state.currentUser.email = document.getElementById('profileEmail').value;
    state.currentUser.location = document.getElementById('profileLocation').value;
    
    saveToStorage();
    showNotification('Profile updated successfully!', 'success');
}

function leaveReview(itemId) {
    document.getElementById('reviewItemId').value = itemId;
    openModal('reviewModal');
}

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Search and filter
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.trim() === '') {
        renderItems();
    } else {
        renderItems(query);
    }
    
    // Scroll to items section if searching
    if (query.trim() !== '') {
        const itemsSection = document.querySelector('.featured-items');
        if (itemsSection) {
            itemsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

function filterByCategory(category) {
    // Update all search inputs to show the category
    document.getElementById('mainSearch').value = category;
    document.getElementById('mobileSearch').value = category;
    document.getElementById('heroSearch').value = category;
    
    scrollToCategories();
    renderItems(category);
}

function scrollToCategories() {
    document.getElementById('categoriesSection').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Filter functions
function toggleFilters() {
    const panel = document.getElementById('filtersPanel');
    panel.classList.toggle('active');
}

function applyFilters() {
    state.activeFilters.category = document.getElementById('filterCategory').value;
    state.activeFilters.minPrice = document.getElementById('minPrice').value ? parseFloat(document.getElementById('minPrice').value) : null;
    state.activeFilters.maxPrice = document.getElementById('maxPrice').value ? parseFloat(document.getElementById('maxPrice').value) : null;
    state.activeFilters.location = document.getElementById('filterLocation').value;
    state.activeFilters.sortBy = document.getElementById('sortBy').value;
    
    renderActiveFilters();
    renderItems();
    showNotification('Filters applied successfully', 'success');
}

function clearFilters() {
    state.activeFilters = {
        category: '',
        minPrice: null,
        maxPrice: null,
        location: '',
        sortBy: 'newest'
    };
    
    document.getElementById('filterCategory').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('filterLocation').value = '';
    document.getElementById('sortBy').value = 'newest';
    
    renderActiveFilters();
    renderItems();
    showNotification('Filters cleared', 'info');
}

function renderActiveFilters() {
    const container = document.getElementById('activeFilters');
    const filters = [];
    
    if (state.activeFilters.category) {
        filters.push({
            label: `Category: ${state.activeFilters.category}`,
            key: 'category'
        });
    }
    
    if (state.activeFilters.minPrice !== null || state.activeFilters.maxPrice !== null) {
        let priceLabel = 'Price: ';
        if (state.activeFilters.minPrice !== null && state.activeFilters.maxPrice !== null) {
            priceLabel += `${state.activeFilters.minPrice} - ${state.activeFilters.maxPrice}`;
        } else if (state.activeFilters.minPrice !== null) {
            priceLabel += `Min ${state.activeFilters.minPrice}`;
        } else {
            priceLabel += `Max ${state.activeFilters.maxPrice}`;
        }
        filters.push({
            label: priceLabel,
            key: 'price'
        });
    }
    
    if (state.activeFilters.location) {
        filters.push({
            label: `Location: ${state.activeFilters.location}`,
            key: 'location'
        });
    }
    
    if (state.activeFilters.sortBy !== 'newest') {
        const sortLabels = {
            'price-low': 'Sort: Price Low to High',
            'price-high': 'Sort: Price High to Low',
            'rating': 'Sort: Highest Rated'
        };
        filters.push({
            label: sortLabels[state.activeFilters.sortBy],
            key: 'sortBy'
        });
    }
    
    if (filters.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = filters.map(filter => `
        <div class="filter-tag">
            ${filter.label}
            <i class="fas fa-times" onclick="removeFilter('${filter.key}')"></i>
        </div>
    `).join('');
}

function removeFilter(key) {
    switch(key) {
        case 'category':
            state.activeFilters.category = '';
            document.getElementById('filterCategory').value = '';
            break;
        case 'price':
            state.activeFilters.minPrice = null;
            state.activeFilters.maxPrice = null;
            document.getElementById('minPrice').value = '';
            document.getElementById('maxPrice').value = '';
            break;
        case 'location':
            state.activeFilters.location = '';
            document.getElementById('filterLocation').value = '';
            break;
        case 'sortBy':
            state.activeFilters.sortBy = 'newest';
            document.getElementById('sortBy').value = 'newest';
            break;
    }
    
    renderActiveFilters();
    renderItems();
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    text.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);