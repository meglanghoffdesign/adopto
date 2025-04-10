# Adopto App

## Lisence Badge
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description
Adopto matches you with the perfect pet by using a personalized quiz to filter adoptable animals based on your lifestyle, living situation, and preferences, making pet adoption easier and more tailored to your needs. Built with React, Tailwind CSS, Node.js, Express, and PostgreSQL, Adopto integrates with the Petfinder API to fetch real-time pet listings based on dynamic filters generated from user quiz responses. The app uses JWT for secure authentication, stores quiz data in a flexible jsonb column, and allows users to save favorites, revisit their quiz results, or search with custom filters—all through a streamlined full-stack experience.

## Features
- **User Authentication**: Secure login with hashed passwords and JWT-based authentication.
- **Real-Time Pet Listings**: Integrates with the Petfinder API to show up-to-date adoptable animals.
- **Favorites System**: Users can save and view favorite pets.
- **Personalized Quiz**: Matches users with pets based on lifestyle, home type, activity level, and preferences.
- **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS.

## Authors
| author | github                                                    | contact            
| -------| --------------------------------------------------------- | ------------------------------- | 
| Amani Akram|[@amaniakram](https://www.github.com/amaniakram) | [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amani-akram-193a3b2b0/)|
| Zach Donels |[@zachD-ae](https://github.com/ZachD-ae) |  [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zach-donels-026b2bb0)|
| Meg Langhoff |[@meglanghoffdesign](https://github.com/meglanghoffdesign) |  [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/meg-langhoff)|

## Installation
To get started, clone the repository to your local machine using the following command:
git clone https://github.com/meglanghoffdesign/adopto.git

Next, navigate into the project directory:
cd adopto

Install dependencies:
npm install

Run the following:
npm run build

After that, you can run the project with:
npm start

Alternatively, you can view the full project here: https://adopto.onrender.com

## Technologies Used
- Frontend: React with Tailwind CSS
- Backend: Node.js with Express
- Database: PostgreSQL
- Authentication: JSON Web Tokens
- API Integration: Petfinder API for fetching adoptable pets
- Hosting: Render

## Usage
For more usage details, visit our detailed documentation in the documentation folder. 

### Registering
To get started, click the “Register” button on the landing page. Fill out the form with a unique username, valid email, and secure password. Make sure your password and confirmation match before submitting. Upon successful registration, you’ll be directed to the login page.

### Login
If you already have an account, click “Login” and enter your username and password. After logging in, you’ll be redirected to the welcome page where you can begin exploring pets or take the quiz.

### Taking the Quiz 
Click “Take the Quiz” to answer a series of lifestyle questions about your home, activity level, allergies, and more. Your responses will be used to generate a custom set of filters for pet recommendations. After completing the quiz, you’ll be redirected to the dashboard with results tailored to you.

### Interacting with the Dashboard
The Dashboard displays a list of adoptable pets fetched from the Petfinder API filtered based on your quiz. You can scroll through pets, view basic info at a glance, or click on a pet card to be redirected to their full adoption profile.

### Favoriting/Unfavoriting Pets
To save a pet you’re interested in, click the paw icon on their profile card. This will add them to your list of favorites. Click the heart again to remove them. You can access your favorite pets anytime by navigating to your Favorites tab at the top of the dashboard.

## Contributing
At this time, contributions to this project are not accepted. Please feel free to fork the repository for personal use or modifications. Any pull requests or issues will not be reviewed or merged.

## Tests
This project does not currently include automated testing. However, if you wish to contribute tests, consider using Jest for unit testing or Cypress for UI testing.

## Questions
If you have any questions, feel free to reach out to me at [meglanghoff@gmail.com](mailto:meglanghoff@gmail.com) or visit my GitHub profile at [https://github.com/meglanghoffdesign](https://github.com/meglanghoffdesign).