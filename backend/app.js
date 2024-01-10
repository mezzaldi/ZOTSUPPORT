// app.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const app = express();

//localhost:5100
const port = 5122;

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
    dialect: 'mysql', //Specifies the dialect of the database you are connecting to (MySQL in this case)
    username: 'root',  // Specifies the username for connecting to the database
    password: 'MacBook Pro1',  // Specifies the password for connecting to the database
    database: 'ZOTSUPPORT', // Specifies the name of the database
    host: 'localhost', // Specifies the host where the database server is running
  });
  
  // These lines of code import Sequelize models for "Program" and "Event" entities, 
  //and the models are configured using the Sequelize instance (sequelize) and data types (DataTypes)
  const Program = require('./models/program.js')(sequelize, DataTypes);
  const Event = require('./models/event.js')(sequelize, DataTypes);
  
  // this code ensures that the Sequelize models (representing database tables) are synchronized with the actual database.
  // If the tables do not exist, Sequelize will create them based on the model definitions. If the tables already exist, 
  //Sequelize will update them according to any changes in the model definitions
  sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized.');
  });
  
  //using JSON format
  app.use(express.json());


  // Handle POST requests to '/api/program'
  app.post('/api/program', async (req, res) => {
    //// Destructure values from the request body
    const { programName, adminEmail, headerImage, description, tags } = req.body;
    
    // Validate the request for the program name or admin Email
    if (!programName || !adminEmail) {
      return res.status(400).json({ error: 'Program name and admin email are required' });
    }
    

    try {
      // Save  program data to the database 
      const program = await Program.create({
        programName,
        adminEmail,
        headerImage,
        description,
        tags,
      });
  
      // Respond with a 201 Created status and the created program data
      res.status(201).json({ program });
    } catch (error) {
      //// If an error occurs during the database operation, log the error
      console.error('Error creating program:', error);
      //// Respond with a 500 Internal Server Error status and an error message
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  // Handle POST requests to '/api/event'
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
  
    // Validate the request for the event name, event location , etc
    if (!eventName || !eventLocation || !eventDate || !startTime || !endTime || !administrators) {
      //// If validation fails, respond with a 400 Bad Request status and an error message
      return res.status(400).json({ error: 'Event name, location, date, start time, end time, and administrators are required' });
    }
  
    try {
       // Save event data to the database using Sequelize's 'create' method
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
  
      // Respond with a 201 Created status and the created event data
      res.status(201).json({ event });
    } catch (error) {
      // If an error occurs during the database operation, log the error
      console.error('Error creating event:', error);
      // Respond with a 500 Internal Server Error status and an error message
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  // Sample route for retrieving programs
app.get('/api/program', async (req, res) => {
  try {
    // Retrieve all programs from the database using findall
    const programs = await Program.findAll();

    // Respond with the list of programs
    res.status(200).json({ programs });
  } catch (error) {
    console.error('Error retrieving programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get program base on tag is general
app.get('/api/program/general', async (req, res) => {
  try {
    // Use Sequelize's 'findAll'/select method to retrieve programs
    const generalPrograms = await Program.findAll({
      where: {
        tags: {
          [Sequelize.Op.like]: '%general%', // Adjust the tag value based on your criteria
        },
      },
    });

    // Respond with a 200 OK status and the retrieved general programs
    res.status(200).json({ generalPrograms });
  } catch (error) {
    console.error('Error retrieving general programs:', error);
    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get program base on tag is math
app.get('/api/program/math', async (req, res) => {
  try {
    // Use Sequelize's 'findAll'/select method to retrieve programs
    const mathPrograms = await Program.findAll({
      where: {
        tags: {
          [Sequelize.Op.like]: '%math%', // Adjust the tag value based on your criteria
        },
      },
    });

    res.status(200).json({ mathPrograms });
  } catch (error) {
    console.error('Error retrieving math programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get program base on tag is biology
app.get('/api/program/biology', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve programs
    const biologyPrograms = await Program.findAll({
      where: {
        tags: {
          [Sequelize.Op.like]: '%biology%', // Adjust the tag value based on your criteria
        },
      },
    });

    res.status(200).json({ biologyPrograms });
  } catch (error) {
    console.error('Error retrieving biology programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get program base on tag is history
app.get('/api/program/history', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve programs
    const historyPrograms = await Program.findAll({
      where: {
        tags: {
          [Sequelize.Op.like]: '%history%', // Adjust the tag value based on your criteria
        },
      },
    });

    res.status(200).json({ historyPrograms });
  } catch (error) {
    console.error('Error retrieving history programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get program base on tag is english
app.get('/api/program/english', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve programs
    const englishPrograms = await Program.findAll({
      where: {
        tags: {
          [Sequelize.Op.like]: '%english%', // Adjust the tag value based on your criteria
        },
      },
    });

    res.status(200).json({ englishPrograms });
  } catch (error) {
    console.error('Error retrieving english programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/events 
//retrieve all events from the database
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

//get event base on tag is upcoming
app.get('/api/event/upcoming', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve event
    const generalEvents = await Event.findAll({
      where: {
        tags: {
          [Sequelize.Op.like]: '%upcoming%', // Adjust the tag value based on your criteria
        },
      },
    });

    res.status(200).json({ generalEvents });
  } catch (error) {
    console.error('Error retrieving upcoming:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get event base on tag is popular
app.get('/api/event/popular', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve event
    const generalEvents = await Event.findAll({
      where: {
        tags: {
          [Sequelize.Op.like]: '%popular%', // Adjust the tag value based on your criteria
        },
      },
    });

    res.status(200).json({ generalEvents });
  } catch (error) {
    console.error('Error retrieving popular:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });