const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

// Create a new comment
router.post('/', async (req, res) => {
    const { content, postId, userId } = req.body;
    try {
        const newComment = new Comment({ content, postId, userId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read comments for a specific post
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).populate('userId', 'username');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 // PATCH update comment by ID
router.patch('/:id', async (req, res) => {
    const { content } = req.body; // Accepting fields that can be updated

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content }, // Update only the provided fields
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(updatedComment); // Respond with the updated comment
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
});

module.exports = router;