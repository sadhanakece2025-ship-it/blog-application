const express = require('express');
const app = express();

app.use(express.json());

// Connect authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Connect blog routes
const blogRoutes = require('./routes/blogs');
app.use('/api/blogs', blogRoutes);
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.send('Blog Backend Server is Running!');
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
