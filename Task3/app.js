const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig'); 

const app = express();

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
