import { User } from '../models/user.js';
import bcrypt from 'bcrypt'; // Ensure bcrypt is imported
import validator from 'validator'; // Import validator explicitly
// GET /Users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET /Users/:id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST /Users
export const createUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // Validate username length
    if (username.length < 8) {
        return res.status(400).json({ message: 'Username must be at least 8 characters long.' });
    }
    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    // Normalize email to lowercase for case-insensitive checking
    const emailNormalized = email.toLowerCase();
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email: emailNormalized } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered.' });
    }
    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }
    // Password validation (example: at least 8 characters)
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Set default quiz_parms if not provided
        const quiz_parms = {}; // Default empty object for quiz_parms
        // Create the new user with quiz_parms
        const newUser = await User.create({
            username,
            email: emailNormalized, // Save the normalized email
            password: hashedPassword,
            quiz_parms
        });
        return res.status(201).json({ message: 'User registered successfully!', user: newUser });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// PUT /Users/:id
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, confirmPassword } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Validate username length (if it's being updated)
        if (username && username.length < 8) {
            return res.status(400).json({ message: 'Username must be at least 8 characters long.' });
        }
        // Validate email format (if it's being updated)
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }
        // Check if the email is already registered (if it's being updated)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered.' });
            }
        }
        // Check if passwords match (if it's being updated)
        if (password && password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }
        // Validate password length (if it's being updated)
        if (password && password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }
        // Update user details
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        // If password is being updated, hash the new password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        await user.save();
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// DELETE /Users/:id
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
