# RentEase - Rent Anything, Anytime

## Project Overview
RentEase is a comprehensive peer-to-peer rental marketplace platform that connects people who want to rent items with those who have items available for rent. The platform facilitates seamless transactions, secure bookings, and transparent communication between renters and owners. Built with modern web technologies, RentEase makes renting easy, affordable, and accessible for everyone.

## Project Theme
**Sharing Economy & Sustainable Living** - A platform that promotes the sharing economy by enabling people to rent items instead of buying them, reducing waste and promoting sustainable consumption patterns.

## Group Members
- **Omer Shaheen**
- **Ahsan Ali Qasim**

## Project Modules/Pages

| Module/Page Name | Purpose / Functionality | Responsible Member(s) |
|------------------|-------------------------|------------------------|
| **Landing Page (Home)** | Main entry point showcasing platform features, hero section with search, category browsing, and featured items display | Omer Shaheen, Ahsan Ali Qasim |
| **User Authentication** | Sign up, sign in, and logout functionality with secure user session management | Omer Shaheen, Ahsan Ali Qasim |
| **User Dashboard** | Centralized hub for users to manage their activities, view statistics, and access all features | Omer Shaheen, Ahsan Ali Qasim |
| **Item Listing Management** | Create, edit, and delete rental item listings with details like price, deposit, location, and description | Omer Shaheen, Ahsan Ali Qasim |
| **Browse & Search** | Advanced search functionality with filters for category, price range, location, and sorting options | Omer Shaheen, Ahsan Ali Qasim |
| **Category Browsing** | Browse items by predefined categories (Electronics, Tools, Sports, Vehicles, Events, Food, Music, Appliances) | Omer Shaheen, Ahsan Ali Qasim |
| **Item Details & Rental Request** | View detailed item information and send rental requests with date selection and cost calculation | Omer Shaheen, Ahsan Ali Qasim |
| **My Listings** | Manage all items listed by the current user with edit and delete capabilities | Omer Shaheen, Ahsan Ali Qasim |
| **My Rentals** | View and track all rental requests sent by the user and monitor rental status | Omer Shaheen, Ahsan Ali Qasim |
| **Rental Request Management** | Receive, approve, or reject rental requests from other users for owned items | Omer Shaheen, Ahsan Ali Qasim |
| **Messaging System** | Real-time messaging between renters and item owners for communication and coordination | Omer Shaheen, Ahsan Ali Qasim |
| **Review & Rating System** | Submit and view reviews with 5-star ratings for completed rentals | Omer Shaheen, Ahsan Ali Qasim |
| **User Profile Management** | Update personal information including name, email, and location | Omer Shaheen, Ahsan Ali Qasim |
| **Notifications** | Real-time toast notifications for user actions (success, error, info messages) | Omer Shaheen, Ahsan Ali Qasim |
| **Responsive Mobile Navigation** | Mobile-optimized menu and navigation for seamless mobile experience | Omer Shaheen, Ahsan Ali Qasim |
| **Filter System** | Advanced filtering options for items by category, price, location, and rating | Omer Shaheen, Ahsan Ali Qasim |

## Features

### Core Features
- ✅ **User Account Management** - Complete registration, login, and profile editing
- ✅ **Item Listing** - Add, edit, and delete rental items with detailed information
- ✅ **Advanced Search** - Search items by name, category, description, or location
- ✅ **Smart Filters** - Filter by category, price range, location, and sort by various criteria
- ✅ **Rental Booking** - Request items with date selection and automatic cost calculation
- ✅ **Request Management** - Approve or reject rental requests with status tracking
- ✅ **Messaging System** - Direct communication between renters and owners
- ✅ **Review System** - 5-star rating and review system for completed rentals
- ✅ **Dashboard** - Comprehensive user dashboard with multiple tabs
- ✅ **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- ✅ **Local Storage** - Data persistence using browser local Storage
- ✅ **Real-time Notifications** - Toast notifications for all user actions

### User Interface Features
- Modern gradient design with smooth animations
- Floating icon animations on hero section
- Interactive category cards
- Featured items showcase
- Mobile-friendly hamburger menu
- Modal-based forms for all actions
- Active filter tags with remove functionality
- Smooth scroll navigation

### Security & Data Features
- Secure user authentication
- Session management
- Data validation on forms
- Protected routes for authenticated users
- Deposit and payment tracking

## Tools & Technologies Used

### Frontend Technologies
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and responsive design
  - Flexbox & Grid layouts
  - CSS animations and transitions
  - Media queries for responsiveness
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
  - Event handling
  - Local storage API
  - Form validation
  - Dynamic rendering

### Libraries & Frameworks
- **Font Awesome 6.4.0** - Icons library for UI elements

### Design Principles
- Mobile-first responsive design
- User experience (UX) optimization
- Accessibility considerations
- Modern UI/UX patterns

### Development Tools
- Browser Developer Tools
- Git & GitHub for version control
- Code editor (VS Code recommended)

## Project Structure

```
rentease/
│
├── index.html          # Main HTML file with structure
├── styles.css          # Complete styling and responsive design
├── script.js           # All JavaScript functionality
└── README.md          # Project documentation
```

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/rentease.git
   cd rentease
   ```

2. **Open the Project**
   - Simply open `index.html` in your web browser
   - Or use a local development server (recommended)

3. **Using Live Server (Recommended)**
   
   **Option A: VS Code Live Server Extension**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Project opens at `http://localhost:5500`

   **Option B: Python Simple Server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   - Open browser and navigate to `http://localhost:8000`

   **Option C: Node.js http-server**
   ```bash
   npm install -g http-server
   http-server
   ```
   - Open browser and navigate to `http://localhost:8080`

4. **Start Using RentEase**
   - Create an account using the "Sign Up" button
   - Browse items and categories
   - List your own items for rent
   - Send rental requests
   - Manage your dashboard

## Usage Guide

### For Renters
1. **Sign Up/Sign In** - Create an account or log in
2. **Browse Items** - Search or filter items by category, price, location
3. **Request Rental** - Select item, choose dates, send request
4. **Track Rentals** - Monitor status in "My Rentals" tab
5. **Communicate** - Message owners through the messaging system
6. **Leave Reviews** - Rate and review items after rental completion

### For Owners
1. **List Items** - Click "List an Item" and fill in details
2. **Manage Listings** - Edit or delete items in "My Listings"
3. **Handle Requests** - Approve or reject requests in "Rental Requests"
4. **Message Renters** - Communicate with interested renters
5. **Track Performance** - View item ratings and reviews

## Sample Data
The application includes sample items to demonstrate functionality:
- Canon EOS R6 Camera (Electronics)
- Mountain Bike (Sports)
- Power Drill Set (Tools)
- Party Tent (Events)
- DJ Equipment (Music)
- Pressure Washer (Tools)

## Features in Detail

### 1. Authentication System
- User registration with email and password
- Secure login functionality
- Session persistence using local Storage
- Logout with data clearing

### 2. Item Management
- Create new listings with comprehensive details
- Upload item information (name, category, description, rate, deposit, location)
- Edit existing listings
- Delete items with confirmation
- View all user's items in dashboard

### 3. Search & Filter System
- Real-time search across item names, descriptions, categories, and locations
- Advanced filters:
  - Category selection
  - Price range (min/max)
  - Location filtering
  - Sort options (newest, price low-high, price high-low, highest rated)
- Active filter tags with individual removal
- Clear all filters option

### 4. Rental Request System
- Date-based rental requests
- Automatic cost calculation (days × rate + deposit)
- Request status tracking (pending, approved, rejected)
- Owner approval/rejection workflow

### 5. Messaging System
- Direct messaging between renters and owners
- Message history tracking
- Conversation management
- Real-time message display

### 6. Review & Rating System
- 5-star rating interface
- Written review submission
- Average rating calculation
- Review count tracking
- Display on item cards

### 7. Dashboard Tabs
- **My Listings**: View and manage owned items
- **My Rentals**: Track rental requests sent
- **Rental Requests**: Manage incoming requests
- **Messages**: Communication hub
- **Profile**: Update personal information

## Browser Compatibility
- Chrome (recommended) - Version 90+
- Firefox - Version 88+
- Safari - Version 14+
- Edge - Version 90+
- Opera - Version 76+

## Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

*RentEase - Making rentals simple and accessible for everyone*
