// app.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const app = express();
const port = 5009;

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

const sequelize = new Sequelize({
    dialect: 'mysql',
    username: 'root',
    password: 'MacBook Pro1',
    database: 'ZOTSUPPORT',
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

  app.post('/api/program', async (req, res) => {
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
  

  // Sample route for retrieving programs
app.get('/api/program', async (req, res) => {
  try {
    // Retrieve all programs from the database
    const programs = await Program.findAll();

    // Respond with the list of programs
    res.status(200).json({ programs });
  } catch (error) {
    console.error('Error retrieving programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/events
app.get('/api/event', async (req, res) => {
  try {
    // Retrieve all events from the database
    const events = await Event.findAll();

    // Respond with the list of events
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });