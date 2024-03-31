require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY; 

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to verify JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

// Protected API endpoint
app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You are authenticated!', user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
