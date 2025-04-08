import dotenv from 'dotenv';
dotenv.config();

import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// const PETFINDER_CLIENT_ID = process.env.PETFINDER_CLIENT_ID || 'your_client_id';
// const PETFINDER_CLIENT_SECRET = process.env.PETFINDER_CLIENT_SECRET || 'your_client_secret';

// Function to get the Petfinder access token
const getPetfinderToken = async () => {
  const url = 'https://api.petfinder.com/v2/oauth2/token';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.PETFINDER_API_KEY || '',
    client_secret: process.env.PETFINDER_API_SECRET || '',
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return data.access_token; // return the token for use
  } catch (error) {
    console.error('Error fetching Petfinder token:', error);
    throw new Error('Failed to fetch Petfinder token');
  }
};

// Login logic
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log('Received username:', username);
  console.log('Received password (plain text):', password);

  try {
    // Check if the user exists
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Authentication user failed' });
    }

    console.log('User found, checking password...');

    // Compare the password with the hash stored in the database
    const passwordIsValid = await bcrypt.compare(password.trim(), user.password.trim());

    if (!passwordIsValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Authentication password failed' });
    }

    console.log('Password valid, generating JWT token...');

    // Generate JWT token for your app with expiration time of 1 hour
    const secretKey = process.env.JWT_SECRET_KEY || 'handsome';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // Now, get the Petfinder token and add it to the response
    const petfinderToken = await getPetfinderToken();

    console.log('Petfinder token:', petfinderToken);

    // Return both the JWT token and Petfinder token in the response
    return res.json({
      token,
      petfinder_token: petfinderToken, // Petfinder access token
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Register logic
export const register = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if the password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username }, // Check for existing username
          { email },    // Check for existing email
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Create new user, no need to manually hash the password
    const newUser = await User.create({
      username,
      email,
      password, // The password will be hashed automatically in the hook
      quiz_parms: {}, // Assuming an empty object for quiz parameters (adjust if needed)
    });

    // Generate JWT token for your app
    const secretKey = process.env.JWT_SECRET_KEY || 'handsome';
    const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });

    // Return both user data and token
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token, // JWT token for your app
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

// POST /register - Register a new user
router.post('/register', register);

export default router;

// import { Router, Request, Response } from 'express';
// import { Op } from 'sequelize';
// import { User } from '../models/user.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// // Login logic
// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   console.log('Received username:', username);
//   console.log('Received password (plain text):', password);

//   try {
//     // Check if the user exists
//     const user = await User.findOne({
//       where: { username },
//     });

//     if (!user) {
//       console.log('User not found');
//       return res.status(401).json({ message: 'Authentication user failed' });
//     }

//     console.log('User found, checking password...');
//     console.log('Stored password (hashed):', user.password);
//     console.log('Received password (plain text):', password);

//     // Compare the password with the hash stored in the database
//     const passwordIsValid = await bcrypt.compare(password.trim(), user.password.trim()); 

//     console.log('Password comparison result:', passwordIsValid);
//     console.log('Type of stored hash:', typeof user.password);
//     console.log('Type of received password:', typeof password);

//     if (!passwordIsValid) {
//       console.log('Invalid password');
//       return res.status(401).json({ message: 'Authentication password failed' });
//     }

//     console.log('Password valid, generating JWT token...');
    
//     // Generate JWT token with expiration time of 1 hour
//     const secretKey = process.env.JWT_SECRET_KEY || 'handsome';
//     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

//     console.log('Token generated:', token);

//     // Return the token in the response
//     return res.json({ token });
//   } catch (error) {
//     console.error('Error during login:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Register logic
// export const register = async (req: Request, res: Response) => {
//   const { username, email, password, confirmPassword } = req.body;

//   // Check if the password and confirmPassword match
//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     // Check if the username or email already exists
//     const existingUser = await User.findOne({
//       where: {
//         [Op.or]: [
//           { username }, // Check for existing username
//           { email },    // Check for existing email
//         ],
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already in use' });
//     }

//     // Create new user, no need to manually hash the password
//     const newUser = await User.create({
//       username,
//       email,
//       password, // The password will be hashed automatically in the hook
//       quiz_parms: {}, // Assuming an empty object for quiz parameters (adjust if needed)
//     });

//     // Generate JWT token
//     const secretKey = process.env.JWT_SECRET_KEY || 'handsome';
//     const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });

//     // Return both user data and token
//     return res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         id: newUser.id,
//         username: newUser.username,
//         email: newUser.email,
//       },
//       token: token,
//     });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const router = Router();

// // POST /login - Login a user
// router.post('/login', login);

// // POST /register - Register a new user
// router.post('/register', register);

// export default router;
