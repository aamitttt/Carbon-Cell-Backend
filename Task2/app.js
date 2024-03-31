const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint for filtering 
app.get('/filter', async (req, res) => {
    try {
        var category = req.query.category;
        var limit = parseInt(req.query.limit)

        // Construct URL based on filtering options
        let apiUrl = 'https://api.publicapis.org/entries';
        if (category) apiUrl += `?category=${encodeURIComponent(category)}`;
        
        // Fetch data from public API
        const response = await axios.get(apiUrl);
        let data = response.data.entries; // Assuming response has a property 'entries' containing the data
        
        // Limit the number of results
        data = data.slice(0, limit);

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
