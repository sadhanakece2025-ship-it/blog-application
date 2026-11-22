const express = require('express');
const router = express.Router();

let blogs = [];

router.get('/', (req, res) => {
    res.json({
        message: 'Blog API is working!',
        blogs: blogs
    });
});

router.post('/create', (req, res) => {
    const { title, content, author } = req.body;

    const newBlog = {
        id: blogs.length + 1,
        title,
        content,
        author
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: 'Blog created successfully!',
        blog: newBlog
    });
});

module.exports = router;