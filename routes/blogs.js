const express = require('express');
const Blog = require('../models/Blog');

const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json({ blogs });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch blogs'
        });
    }
});

// Create a new blog
router.post('/create', async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const newBlog = new Blog({
            title,
            content,
            author
        });

        await newBlog.save();

        res.status(201).json({
            message: 'Blog created successfully!',
            blog: newBlog
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create blog'
        });
    }
});

// Get individual blog details
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        res.json(blog);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch blog details'
        });
    }
});

module.exports = router;