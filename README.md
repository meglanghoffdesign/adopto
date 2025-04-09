# Pet Adoption App

Welcome to the Pet Adoption App! This platform connects pet seekers with shelters and fosters to help animals find their forever homes.

## Features
- **User Authentication**: Secure login with hashed passwords and JWT-based authentication.
- **Pet Listings**: Browse available pets for adoption with detailed profiles.
- **Search and Filter**: Find pets by species, breed, age, and location.

## Installation

##Technolgy


### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pet-adoption-app.git
   cd pet-adoption-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following keys:
   ```env
   PORT=3000
   DB_CONNECTION=mongodb://localhost:27017/petAdoptionApp
   JWT_SECRET=yourSecretKey
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Access the app in your browser at `http://localhost:3000`.

## Usage

## Getting Started

To begin using the Pet Adoption App, follow these steps:
1. Visit the app's homepage at [Pet Adoption App](http://localhost:3000) (if hosted locally) or the live site URL.
2. Create an account using your email address.
3. Log in, take the quiz and browse pets.

---

## Features Overview

### Key Features:
- **User Authentication**: Secure registration and login.
- **Pet Listings**: View detailed profiles of pets available for adoption.
- **Search and Filter**: Find pets by species, breed, age, and location.


---

## How to Use the App

### Register an Account
1. Click the **Register** button on the homepage.
2. Fill out the registration form with:
   - Your name
   - Email address
   - Password
   -Confirm password
3. Submit the form to create your account.

---

### Log In
1. Click the **Log In** button on the homepage.
2. Enter your registered email and password.
3. Click **Log In** to access your account.

---

### Take Quiz
1. Once logged in, you’ll see a list of questions and we will match you with a list of filtered pets.
2. Click on a pet's name to view more details about the pet.


---

## File Structure
```
adopto/
├── client/                # Frontend (React + Vite + Tailwind)
├── server/                # Backend (Node + Express + PostgreSQL)
├── db/                    # Database schema & seed files
├── .env                   # Environment variables (shared or root-level)
├── package.json           # Project scripts and root dependencies (if monorepo)
├── README.md              # Project documentation
└── tsconfig.json          # TS config (can be at root or split between client/server)
8:32
client/
├── public/
│   └── Adopto_Logo.svg
│   └── Adopto_Logo_Favicon.svg
│   └── landing-page.svg
│
├── src/
│   ├── assets/                  # Any images or static assets
│   ├── components/              # Reusable UI components
│   │   ├── FilterModal.tsx
│   │   ├── PetCard.tsx
│   │   ├── Pagination.tsx
│   │   └── Navbar.tsx
│   │
│   ├── interfaces/              # TypeScript types/interfaces
│   │   └── Pet.ts
│   │   └── QuizAnswers.ts
│   │   └── User.ts
│   │
│   ├── pages/                   # Page-level components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── FavoritesPage.tsx
│   │   ├── PetProfilePage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── utils/                   # Utility functions and helpers
│   │   ├── api.ts               # Fetch wrapper
│   │   └── auth.ts              # Auth token helpers (get/set/remove)
│   │
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── router.tsx              # React Router setup
│
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── index.html
```



## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support
If you encounter any issues or have questions, feel free to open an [issue](https://github.com/yourusername/pet-adoption-app/issues) or contact us at support@petadoptionapp.com.

---
Happy adopting!