// server.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const app = express();
const port = 5002;

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
// Use bodyParser middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * @openapi
 * /api/programs:
 *   post:
 *     summary: Add a new program
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: programName
 *         type: string
 *         required: true
 *       - in: formData
 *         name: adminEmail
 *         type: string
 *         required: true
 *       - in: formData
 *         name: headerImage
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: tags
 *         type: array
 *         items:
 *           type: string
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               program:
 *                 programName: Sample Program
 *                 adminEmail: admin@example.com
 *                 headerImage: url/to/image.jpg
 *                 description: Sample description
 *                 tags: ['tag1', 'tag2']
 */
/**
 * @openapi
 * /api/events:
 *   post:
 *     summary: Add a new event
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: body
 *         name: event
 *         description: The event to add
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             eventName:
 *               type: string
 *             eventLocation:
 *               type: string
 *             eventDate:
 *               type: string
 *               format: date
 *             startTime:
 *               type: string
 *               format: time
 *             endTime:
 *               type: string
 *               format: time
 *             recurring:
 *               type: boolean
 *             administrators:
 *               type: string
 *             eventHeaderImage:
 *               type: string
 *             eventDescription:
 *               type: string
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               event:
 *                 eventName: Sample Event
 *                 eventLocation: Sample Location
 *                 eventDate: 2023-01-01
 *                 startTime: 12:00 PM
 *                 endTime: 2:00 PM
 *                 recurring: false
 *                 administrators: admin@example.com
 *                 eventHeaderImage: url/to/event-image.jpg
 *                 eventDescription: Sample event description
 *                 tags: ['tag1', 'tag2']
 */
// Sequelize configuration
const sequelize = new Sequelize({
    dialect: 'mysql',
    username: 'root',
    password: 'MacBook Pro1',
    database: 'cs122a',
    host: 'localhost',
  });
  
  // Define the Program model
  const Program = require('./models/program.js')(sequelize, DataTypes);
  const Event = require('./models/event.js')(sequelize, DataTypes);
  
  // Sync the model with the database
  sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized.');
  });
  
  app.use(express.json());
  
  // Sample route for creating a program
  app.post('/api/programs', async (req, res) => {
    const { programName, adminEmail, headerImage, description, tags } = req.body;
  
    // Validate the request
    if (!programName || !adminEmail) {
      return res.status(400).json({ error: 'Program name and admin email are required' });
    }
  
    try {
      // Save program data to the database
      const program = await Program.create({
        programName,
        adminEmail,
        headerImage,
        description,
        tags,
      });
  
      // Respond with the created program
      res.status(201).json({ program });
    } catch (error) {
      console.error('Error creating program:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST /api/events
app.post('/api/event', async (req, res) => {
    const {
      eventName,
      eventLocation,
      eventDate,
      startTime,
      endTime,
      recurring,
      administrators,
      eventHeaderImage,
      eventDescription,
      tags,
    } = req.body;
  
    // Validate the request
    if (!eventName || !eventLocation || !eventDate || !startTime || !endTime || !administrators) {
      return res.status(400).json({ error: 'Event name, location, date, start time, end time, and administrators are required' });
    }
  
    try {
      // Save event data to the database
      const event = await Event.create({
        eventName,
        eventLocation,
        eventDate,
        startTime,
        endTime,
        recurring,
        administrators,
        eventHeaderImage,
        eventDescription,
        tags,
      });
  
      // Respond with the created event
      res.status(201).json({ event });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });