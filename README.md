# Nanny.Services – Babysitter Booking Platform

A modern web application for finding and booking trusted babysitters. Users can browse nanny profiles, filter by price/popularity, save favorites, and schedule appointments. Built with React, Vite, and Firebase.

🔗 **Live Demo:** [https://nanny-app-your-name.netlify.app](https://nanny-app-your-name.netlify.app)

## ✨ Features

- **User Authentication** – Sign up / Log in with email (Firebase Auth)
- **Nanny Listings** – Browse, filter (price, rating), sort (A–Z, popularity)
- **Favorites** – Save nannies to personal list (persisted in Firebase)
- **Load More** – Pagination (3 cards at a time)
- **Appointment Form** – Modal with validation (React Hook Form + Yup)
- **Responsive Design** – Works perfectly on mobile, tablet, desktop (320px–1440px)
- **Protected Routes** – Favorites page only accessible to logged‑in users
- **Persistent State** – Favorites and sorting/filtering survive page reload

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router DOM, Vite
- **State & Forms:** React Hook Form, Yup
- **Backend & Database:** Firebase (Authentication + Realtime Database)
- **Styling:** CSS Modules (responsive, custom color palette)
- **Deployment:** Netlify / Vercel

## 📁 Project Structure
    src/
    ├── assets/ # Images, icons, babysitters.json
    ├── components/
    │ ├── auth/ # LoginModal, RegisterModal
    │ ├── common/ # Modal, PrivateRoute
    │ ├── nanny/ # NannyCard, AppointmentModal
    │ └── Header/ # Navigation (red theme, active dot indicator)
    ├── contexts/ # AuthContext, FavoritesContext
    ├── pages/ # Home, Nannies, Favorites
    ├── services/ # firebase.js (config & helpers)
    ├── styles/ # Global CSS, responsive utilities
    └── App.jsx / main.jsx
## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Firebase account (free tier)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:MiracSengul/NannyGuide.git
   cd nanny-app
   npm install