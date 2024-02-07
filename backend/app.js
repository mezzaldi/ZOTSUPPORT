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

app.post("/programs", async (req, res) => {
  const { name, description, headerImage, color, tags, email } = req.body;

  try {
    // Retrieve admin ID based on admin email
    const adminResult = await pool.query(
      "SELECT admin_id FROM admins WHERE email = $1",
      [email]
    );

    if (adminResult.rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const adminId = adminResult.rows[0].admin_id;

    // Insert data into the programs table with the retrieved admin ID
    const newProgram = await pool.query(
      "INSERT INTO programs (program_name, description, headerimage, color, admin_id) VALUES($1, $2, $3, $4, $5) RETURNING program_id",
      [name, description, headerImage, color, adminId]
    );
    const programId = newProgram.rows[0].program_id;

    // Insert a record into program_admins to associate the program with the admin
    await pool.query(
      "INSERT INTO program_admins (program_id, admin_id) VALUES ($1, $2)",
      [programId, adminId]
    );

    // Handle dynamic tags
    for (const tag_name of tags) {
      // Check if the tag already exists
      const tagResult = await pool.query(
        "SELECT tag_id FROM tags WHERE tag_name = $1",
        [tag_name]
      );
      let tagId;
      if (tagResult.rows.length > 0) {
        // Tag exists, get its ID
        tagId = tagResult.rows[0].tag_id;
      } else {
        // Tag does not exist, create it
        const newTagResult = await pool.query(
          "INSERT INTO tags (tag_name) VALUES ($1) RETURNING tag_id",
          [tag_name]
        );
        tagId = newTagResult.rows[0].tag_id;
      }

      // Associate tag with the program
      await pool.query(
        "INSERT INTO program_tags (program_id, tag_id) VALUES ($1, $2)",
        [programId, tagId]
      );
    }

    res.status(201).json({ message: "Program created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/programs_tag_admin", async (req, res) => {
  try {
    const programsWithTagsAndAdmin = await pool.query(`
      SELECT p.*, ARRAY_AGG(DISTINCT t.tag_name) AS tags, a.admin_name, a.email
      FROM programs p
      LEFT JOIN program_tags pt ON p.program_id = pt.program_id
      LEFT JOIN tags t ON pt.tag_id = t.tag_id
      LEFT JOIN program_admins pa ON p.program_id = pa.program_id
      LEFT JOIN admins a ON pa.admin_id = a.admin_id
      GROUP BY p.program_id, a.admin_id, a.admin_name, a.email
    `);

    res.status(200).json(programsWithTagsAndAdmin.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
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
