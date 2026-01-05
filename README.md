# RentEase - Simplifying Rentals with Ease

**Your go-to platform for smart and secure item rentals.**

RentEase is a full-featured rental platform built using the MERN stack that connects renters with item owners for seamless booking and secure transactions. From user registration to payments and messaging, RentEase offers a complete ecosystem for stress-free rentals.

---

## 🚀 Features

- **User Account Management**  
  Registration, login, and profile handling

- **Item Listing and Management**  
  Add, edit, and delete rental listings

- **Rental Booking Process**  
  Search for items, send rental requests, approve, and track

- **Secure Payments**  
  Rental fees and deposits handled securely

- **Reviews and Ratings**  
  For both renters and owners after each rental

- **Messaging System**  
  Real-time communication between renters and owners

- **Dashboard**  
  Track current rentals and rental history

- **Advanced Search and Filters**  
  Quickly find items by category, price, location, and more

- **Notifications**  
  Get updates on rental status, approvals, and requests





## 🛠 Getting Started

### Backend (Server)

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a `.env` file in the `server/` directory:
   ```env
   PORT=4000
   MONGO_URI='mongodb://localhost:27017/rent-ease'
   JWT_SECRET='your_jwt_secret'
   NODE_ENV="development"
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend (Client)

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📄 Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payments**: Stripe
- **Real-time Messaging**: Socket.io




