import { Router } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Login logic
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('Received username:', username);
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
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Authentication password failed' });
        }
        console.log('Password valid, generating JWT token...');
        // Generate JWT token with expiration time of 1 hour
        const secretKey = process.env.JWT_SECRET_KEY || 'handsome';
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        console.log('Token generated:', token);
        // Return the token in the response
        return res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Register logic
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username }, // Check for existing username
                    { email }, // Check for existing email
                ],
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            quiz_parms: {} // assuming an empty object for quiz parameters (adjust if needed)
        });
        // Generate JWT token
        const secretKey = process.env.JWT_SECRET_KEY || 'handsome';
        const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });
        return res.status(201).json({ token });
    }
    catch (error) {
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
