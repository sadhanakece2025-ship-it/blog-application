require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch((error) => console.log('MongoDB Connection Error:', error));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const blogRoutes = require('./routes/blogs');
app.use('/api/blogs', blogRoutes);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('Blog Backend Server is Running!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});