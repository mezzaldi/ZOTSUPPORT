// server.js
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 5001;

// Define Swagger options
const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
    title: 'Express Swagger Example',
    version: '1.0.0',
    },
    },
    apis: ['app.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Express Swagger Example!'); // Change this message as needed
});

// API endpoint to add a new message
/**
 * @openapi
 * /api/messages:
 *   post:
 *     summary: Add a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               text: "New message added"
 */

app.post('/api/messages', (req, res) => {
    const { text } = req.body;

    // Validate the request
    if (!text) {
    return res.status(400).json({ error: 'Text is required' });
}

    // For simplicity, just send a success message
    res.json({ text: 'New message added' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
