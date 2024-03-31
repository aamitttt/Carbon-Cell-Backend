const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API endpoints',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change this URL according to your server configuration
                description: 'Development Server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
