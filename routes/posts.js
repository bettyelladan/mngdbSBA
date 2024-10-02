const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        const newPost = new Post({ title, content, userId });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a specific post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId', 'username');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
  // PATCH update post by ID
router.patch('/:id', async (req, res) => {
    const { title, content } = req.body; // Accepting fields that can be updated

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content }, // Update only the provided fields
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost); // Respond with the updated post
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
});

module.exports = router;