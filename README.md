# 🌾 FarmKart – Agricultural Vehicle Rental Platform

**FarmKart** is a full-stack web application designed to connect farmers with agricultural vehicle and equipment owners. It provides a convenient platform where farmers can discover and rent agricultural vehicles, while vehicle owners can list their equipment and manage rental bookings.

The platform aims to simplify access to agricultural machinery, reduce dependency on individual ownership, and make agricultural equipment rental more accessible.

## 🚀 Live Demo

- **Frontend:** https://farm-kart-self.vercel.app/
- **Backend API:** https://farmkart-backend.onrender.com/api

## ✨ Key Features

1. **User Authentication:** Secure user registration and login using JWT-based authentication and cookies.
2. **Role-Based Access:** Supports different user roles, including Farmer, Renter, Owner, and Admin.
3. **Vehicle Listings:** Vehicle owners can create and manage agricultural vehicle listings.
4. **Vehicle Discovery:** Farmers can explore available agricultural vehicles for rental.
5. **Booking Management:** Users can create and manage vehicle rental bookings.
6. **Booking Status Tracking:** Track booking status and manage booking requests.
7. **Booking History:** Access previous and ongoing rental activities.
8. **Notifications:** Receive updates related to booking activities.
9. **Admin Management:** Provides administrative functionality for managing platform activities.
10. **Image Uploads:** Uses ImageKit for vehicle image storage and delivery.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT, Cookies |
| Image Management | ImageKit |
| Deployment | Vercel, Render |
| API Communication | REST APIs |

## 🏗️ Application Architecture

FarmKart follows a client-server architecture.

- **Frontend:** React.js provides the user interface and communicates with backend APIs.
- **Backend:** Node.js and Express.js handle business logic, authentication, authorization, and API requests.
- **Database:** MongoDB stores application data, including user information, vehicle listings, and booking details.
- **Image Storage:** ImageKit handles vehicle image uploads and delivery.

## 🔄 How It Works

1. Users register and log in to the platform.
2. Vehicle owners add agricultural vehicles with relevant details.
3. Farmers browse available vehicles.
4. Farmers select a suitable vehicle and submit a booking request.
5. Vehicle owners manage incoming booking requests.
6. Users can track booking statuses and view their booking history.
7. Notifications help users stay updated about booking activities.

## 📂 Project Structure

The application is organized into separate frontend and backend projects.

```text
FarmKart/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── routes/
    ├── controllers/
    ├── models/
    ├── middleware/
    ├── package.json
    └── server.js
```

*Note: This is a representative structure. Adjust directory names to match the actual repository.*

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- ImageKit account

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd FarmKart
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Configure the required environment variables in the backend `.env` file, including database connection, JWT authentication, and ImageKit credentials.

Start the backend using the development script configured in `package.json`.

```bash
npm run dev
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend API base URL to point to your backend server.

### 4. Access the Application

Open the local development URL displayed by Vite in your browser.

## 🎯 Project Objectives

- Make agricultural vehicle rentals more accessible to farmers.
- Provide a digital platform for connecting farmers and vehicle owners.
- Simplify vehicle discovery and booking management.
- Improve transparency and convenience in agricultural equipment rentals.

## 🔮 Future Enhancements

- Online payment integration.
- Location-based vehicle discovery.
- Advanced search and filtering.
- Vehicle verification and document management.
- Improved booking and notification workflows.

## 👩‍💻 Developer

**Bhavya Goud**

- GitHub: [siddagouniBhavya](https://github.com/siddagouniBhavya)
- LinkedIn: [Bhavya Goud](https://linkedin.com/in/bhavya-goud-bab975353)

---

⭐ If you find this project interesting, consider giving the repository a star!
