const express = require('express');

const router = express.Router();

// User Registration API
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    res.json({
        message: 'User registration successful',
        user: { name, email }
    });
});

// User Login API
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    res.json({
        message: 'User login successful',
        email: email
    });
});

module.exports = router;