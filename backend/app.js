const express = require("express");
const cors = require("cors");

require("dotenv").config();

const pool = require("./server/db"); // Import the pool object for database connection

const app = express();

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});