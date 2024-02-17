const express = require("express");
const cors = require("cors");

require("dotenv").config();

// const dataRouter = require('./routes/data');
// const emailRouter = require('./routes/nodemailer');
// const eventsRouter = require('./routes/events');
// const profilesRouter = require('./routes/profiles');
// const statsRouter = require('./routes/stats');

const pool = require("./server/db"); // Import the pool object for database connection

const app = express();
app.use(express.json());



const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    credentials: true,
  })
);

// EXAMPLE
app.get("/test", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM students");
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//retrieve programs without tags
app.get("/programs", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM programs");
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/*
app.post("/programs", async (req, res) => {
  const { name, description, headerImage, color, tags } = req.body;

  try {
    const newProgram = await pool.query(
      "INSERT INTO programs (program_name, description, headerimage, color) VALUES($1, $2, $3, $4) RETURNING *",
      [name, description, headerImage, color]
    );

    res.status(201).json(newProgram.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
*/

// POST endpoint for creating programs
app.post("/programs", async (req, res) => {
  const { name, description, headerImage, color, tags, adminemail } = req.body;

  // Validate input data
  if (!name || !description || !adminemail) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Create a new program entry
      const programInsertQuery = 'INSERT INTO programs (program_name, description, headerimage, color) VALUES ($1, $2, $3, $4) RETURNING program_id';
      const programInsertValues = [name, description, headerImage, color];
      const programInsertResult = await client.query(programInsertQuery, programInsertValues);
      const programId = programInsertResult.rows[0].program_id;

      // 2. Add tags associated with the program
      if (tags && Array.isArray(tags) && tags.length > 0) {
        for (const tagName of tags) {
          // Fetch tag_id for the current tag name
          const tagQuery = 'SELECT tag_id FROM tags WHERE tag_name = $1';
          const tagResult = await client.query(tagQuery, [tagName]);
          const tagId = tagResult.rows[0].tag_id;

          // Insert into program_tags
          const programTagInsertQuery = 'INSERT INTO program_tags (program_id, tag_id) VALUES ($1, $2)';
          await client.query(programTagInsertQuery, [programId, tagId]);
        }
      }

      // 3. Add the user specified as admin for the program
      const adminUserQuery = 'SELECT ucinetid FROM users WHERE user_emailaddress = $1';
      const adminUserValues = [adminemail];
      const adminUserResult = await client.query(adminUserQuery, adminUserValues);
      const adminUcinetid = adminUserResult.rows[0].ucinetid;

      const adminInsertQuery = 'INSERT INTO programadmins (program_id, ucinetid) VALUES ($1, $2)';
      await client.query(adminInsertQuery, [programId, adminUcinetid]);

      // Commit the transaction
      await client.query('COMMIT');

      res.status(201).json({ message: "Program created successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Assuming you have already set up your express app and database connection

// GET endpoint to retrieve program details by ID
// GET endpoint to retrieve program details by ID
app.get("/programs/:programId", async (req, res) => {
  const programId = req.params.programId;

  try {
    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Query to fetch program details including its tags and admin email
      const query = `
        SELECT 
          p.program_id, 
          p.program_name, 
          p.description, 
          p.headerimage, 
          p.color, 
          array_agg(t.tag_name) AS tags, 
          u.user_emailaddress AS admin_email
        FROM 
          programs p
        LEFT JOIN 
          program_tags pt ON p.program_id = pt.program_id
        LEFT JOIN 
          tags t ON pt.tag_id = t.tag_id
        LEFT JOIN 
          programadmins pa ON p.program_id = pa.program_id
        LEFT JOIN 
          users u ON pa.ucinetid = u.ucinetid
        WHERE 
          p.program_id = $1
        GROUP BY 
          p.program_id, 
          u.user_emailaddress;
      `;
      const { rows } = await client.query(query, [programId]);

      // Commit the transaction
      await client.query('COMMIT');

      // Check if program exists
      if (rows.length === 0) {
        return res.status(404).json({ error: "Program not found" });
      }

      // Extract program details from the first row
      const programDetails = rows[0];

      res.status(200).json(programDetails);
    } catch (error) {
      // Rollback transaction if any error occurs
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Error fetching program details:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/events", async (req, res) => {
  const { name, location, date, start_time, end_time, recurring, recurring_ends, user_emailaddress, description, headerimage, tags } = req.body;

  try {
    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert into events table
      const eventInsertQuery = `
        INSERT INTO events (event_name, description, headerimage, location, starttime, endtime, recurring, recurringends, requireregistration, receiveregistreenotifications)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING event_id`;
      const eventInsertValues = [name, description, headerimage, location, date + ' ' + start_time, date + ' ' + end_time, recurring, recurring_ends, 'false', 'false'];
      const eventInsertResult = await client.query(eventInsertQuery, eventInsertValues);
      const eventId = eventInsertResult.rows[0].event_id;

      // Fetch ucinetid for the specified user_emailaddress
      const userQuery = 'SELECT ucinetid FROM users WHERE user_emailaddress = $1';
      const userResult = await client.query(userQuery, [user_emailaddress]);
      const ucinetid = userResult.rows[0].ucinetid;

      // Insert into eventadmins table
      const eventAdminsInsertQuery = 'INSERT INTO eventadmins (event_id, ucinetid) VALUES ($1, $2)';
      await client.query(eventAdminsInsertQuery, [eventId, ucinetid]);

      // Insert tags into eventtags table
      if (tags && Array.isArray(tags) && tags.length > 0) {
        for (const tagName of tags) {
          // Fetch tag_id for the current tag name
          const tagQuery = 'SELECT tag_id FROM tags WHERE tag_name = $1';
          const tagResult = await client.query(tagQuery, [tagName]);
          const tagId = tagResult.rows[0].tag_id;

          // Insert into eventtags table
          const eventTagInsertQuery = 'INSERT INTO eventtags (event_id, tag_id) VALUES ($1, $2)';
          await client.query(eventTagInsertQuery, [eventId, tagId]);
        }
      }

      // Commit the transaction
      await client.query('COMMIT');

      res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await client.query('ROLLBACK');
      console.error('Error creating event:', error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.use('/send', emailRouter);
// app.use('/data', dataRouter);
// app.use('/events', eventsRouter);
// app.use('/profiles', profilesRouter);
// app.use('/stats', statsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});