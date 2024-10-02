const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
 // PATCH update user by ID
router.patch('/:id', async (req, res) => {
    const { username, email, password } = req.body; // Accepting fields that can be updated

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password }, // Update only the provided fields
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Respond with the updated user
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
});

module.exports = router;