const express = require("express");
const cors = require("cors");

require("dotenv").config();

const pool = require("./server/db"); // Import the pool object for database connection

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});

// Other middleware and routes
app.use(cors());
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
        const data = await pool.query("SELECT * FROM users");
        res.json(data.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Get the logged in user's followed programs
app.get("/followedPrograms/:ucinetid", async (req, res) => {
    const ucinetid = req.params.ucinetid.replace(":", "");
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const query =
            "SELECT program_id FROM programFollowers WHERE ucinetid = $1";
        const data = await client.query(query, [ucinetid]);
        res.json(data.rows);
    } catch (error) {
        console.error(error.message);
    } finally {
        // Release the client back to the pool
        client.release();
    }
});

// POST endpoint for creating programs
app.post("/programs", async (req, res) => {
    const { name, description, headerImage, color, tags, adminemail } =
        req.body;

    // Validate input data
    if (!name || !description || !adminemail) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Start a transaction
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            // 1. Create a new program entry
            const programInsertQuery =
                "INSERT INTO programs (program_name, description, headerimage, color) VALUES ($1, $2, $3, $4) RETURNING program_id";
            const programInsertValues = [name, description, headerImage, color];
            const programInsertResult = await client.query(
                programInsertQuery,
                programInsertValues
            );
            const programId = programInsertResult.rows[0].program_id;

            // 2. Add tags associated with the program
            if (tags && Array.isArray(tags) && tags.length > 0) {
                for (const tagName of tags) {
                    // Fetch tag_id for the current tag name
                    const tagQuery =
                        "SELECT tag_id FROM tags WHERE tag_name = $1";
                    const tagResult = await client.query(tagQuery, [tagName]);
                    const tagId = tagResult.rows[0].tag_id;

                    // Insert into program_tags
                    const programTagInsertQuery =
                        "INSERT INTO program_tags (program_id, tag_id) VALUES ($1, $2)";
                    await client.query(programTagInsertQuery, [
                        programId,
                        tagId,
                    ]);
                }
            }

            // 3. Add the user specified as admin for the program
            const adminUserQuery =
                "SELECT ucinetid FROM users WHERE user_emailaddress = $1";
            const adminUserValues = [adminemail];
            const adminUserResult = await client.query(
                adminUserQuery,
                adminUserValues
            );
            const adminUcinetid = adminUserResult.rows[0].ucinetid;

            const adminInsertQuery =
                "INSERT INTO programadmins (program_id, ucinetid) VALUES ($1, $2)";
            await client.query(adminInsertQuery, [programId, adminUcinetid]);

            // Commit the transaction
            await client.query("COMMIT");

            res.status(201).json({ message: "Program created successfully" });
        } catch (error) {
            // Rollback transaction if any error occurs
            await client.query("ROLLBACK");
            throw error;
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error("Error creating program:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// edit/ PUT endpoint for updating programs
app.put("/programs/:programId", async (req, res) => {
    const programId = req.params.programId;
    const { name, description, headerImage, color, tags, adminemail } =
        req.body;

    // Validate input data
    if (!name || !description || !adminemail) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Start a transaction
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            // 1. Update the program entry
            const programUpdateQuery = `
        UPDATE programs
        SET
          program_name = $1,
          description = $2,
          headerimage = $3,
          color = $4
        WHERE
          program_id = $5
      `;
            const programUpdateValues = [
                name,
                description,
                headerImage,
                color,
                programId,
            ];
            await client.query(programUpdateQuery, programUpdateValues);

            // 2. Remove existing tags associated with the program
            const removeTagsQuery =
                "DELETE FROM program_tags WHERE program_id = $1";
            await client.query(removeTagsQuery, [programId]);

            // 3. Add new tags associated with the program
            if (tags && Array.isArray(tags) && tags.length > 0) {
                for (const tagName of tags) {
                    // Fetch tag_id for the current tag name
                    const tagQuery =
                        "SELECT tag_id FROM tags WHERE tag_name = $1";
                    const tagResult = await client.query(tagQuery, [tagName]);
                    const tagId = tagResult.rows[0].tag_id;

                    // Insert into program_tags
                    const programTagInsertQuery =
                        "INSERT INTO program_tags (program_id, tag_id) VALUES ($1, $2)";
                    await client.query(programTagInsertQuery, [
                        programId,
                        tagId,
                    ]);
                }
            }

            // 4. Update the admin for the program
            const adminUserQuery =
                "SELECT ucinetid FROM users WHERE user_emailaddress = $1";
            const adminUserValues = [adminemail];
            const adminUserResult = await client.query(
                adminUserQuery,
                adminUserValues
            );
            const adminUcinetid = adminUserResult.rows[0].ucinetid;

            const adminUpdateQuery =
                "UPDATE programadmins SET ucinetid = $1 WHERE program_id = $2";
            await client.query(adminUpdateQuery, [adminUcinetid, programId]);

            // Commit the transaction
            await client.query("COMMIT");

            res.status(200).json({ message: "Program updated successfully" });
        } catch (error) {
            // Rollback transaction if any error occurs
            await client.query("ROLLBACK");
            throw error;
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error("Error updating program:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET endpoint to retrieve program details by ID
app.get("/programs/:programId", async (req, res) => {
    const programId = req.params.programId.replace(":", "");

    try {
        // Start a transaction
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

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
            await client.query("COMMIT");

            // Check if program exists
            if (rows.length === 0) {
                return res.status(404).json({ error: "Program not found" });
            }

            // Extract program details from the first row
            const programDetails = rows[0];

            res.status(200).json(programDetails);
        } catch (error) {
            // Rollback transaction if any error occurs
            await client.query("ROLLBACK");
            throw error;
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error("Error fetching program details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET endpoint to notifications by user ID
app.get("/notifications/:ucinetid", async (req, res) => {
    const ucinetid = req.params.ucinetid.replace(":", "");
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        // first get notif IDs from notifRecipients table
        const query = `SELECT 
            notifications.notification_id,
            notifications.program_id,
            notifications.title,
            notifications.contents,
            notifications.file,
            notificationrecipients.seen,
            programs.program_name
            FROM notificationrecipients
            LEFT JOIN notifications ON notifications.notification_id = notificationrecipients.notification_id
            LEFT JOIN programs ON programs.program_id = notifications.program_id
            WHERE ucinetid = $1`;
        const data = await client.query(query, [ucinetid]);
        res.json(data.rows);
    } catch (error) {
        console.error(error.message);
    } finally {
        // Release the client back to the pool
        client.release();
    }
});

// GET endpoint for retrieving all programs
app.get("/programs", async (req, res) => {
    try {
        // Connect to the database
        const client = await pool.connect();
        try {
            // Retrieve all programs from the database
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
        GROUP BY 
          p.program_id, 
          u.user_emailaddress;
      `;
            const { rows } = await client.query(query);

            // Return all programs with tags and admin email in the response
            res.status(200).json(rows);
        } catch (error) {
            // Handle database query errors
            console.error("Error fetching programs:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        // Handle database connection errors
        console.error("Error connecting to database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Creates event for specific program
app.post("/events", async (req, res) => {
    const {
        name,
        location,
        date,
        start_time,
        end_time,
        recurring,
        recurring_ends,
        user_emailaddress,
        description,
        headerimage,
        tags,
        program_id,
    } = req.body;

    try {
        // Start a transaction
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            // Convert recurring array to string
            const recurringString = recurring.join(","); // Assuming recurring is an array of strings

            // Insert into events table
            const eventInsertQuery = `
                INSERT INTO events (event_name, description, headerimage, location, starttime, endtime, recurring, recurringends, requireregistration, receiveregistreenotifications, program_id)
                VALUES ($1, $2, $3, $4, $5, $6, ARRAY[$7], $8, $9, $10, $11)
                RETURNING event_id`;
            const eventInsertValues = [
                name,
                description,
                headerimage,
                location,
                date + " " + start_time,
                date + " " + end_time,
                recurringString,
                recurring_ends,
                "false",
                "false",
                program_id,
            ];
            const eventInsertResult = await client.query(
                eventInsertQuery,
                eventInsertValues
            );
            const eventId = eventInsertResult.rows[0].event_id;

            // Fetch ucinetid for the specified user_emailaddress
            const userQuery =
                "SELECT ucinetid FROM users WHERE user_emailaddress = $1";
            const userResult = await client.query(userQuery, [
                user_emailaddress,
            ]);
            const ucinetid = userResult.rows[0].ucinetid;

            // Insert into eventadmins table
            const eventAdminsInsertQuery =
                "INSERT INTO eventadmins (event_id, ucinetid) VALUES ($1, $2)";
            await client.query(eventAdminsInsertQuery, [eventId, ucinetid]);

            // Insert tags into eventtags table
            if (tags && Array.isArray(tags) && tags.length > 0) {
                for (const tagName of tags) {
                    // Fetch tag_id for the current tag name
                    const tagQuery =
                        "SELECT tag_id FROM tags WHERE tag_name = $1";
                    const tagResult = await client.query(tagQuery, [tagName]);
                    const tagId = tagResult.rows[0].tag_id;

                    // Insert into eventtags table
                    const eventTagInsertQuery =
                        "INSERT INTO eventtags (event_id, tag_id) VALUES ($1, $2)";
                    await client.query(eventTagInsertQuery, [eventId, tagId]);
                }
            }

            // Commit the transaction
            await client.query("COMMIT");

            res.status(201).json({ message: "Event created successfully" });
        } catch (error) {
            // Rollback transaction if any error occurs
            await client.query("ROLLBACK");
            console.error("Error creating event:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get upcoming events for a specific program
app.get("/upcoming-events/:programId", async (req, res) => {
    const programId = req.params.programId;

    try {
        // Query the database to get upcoming events for the specified program
        const query = `
            SELECT *
            FROM events
            WHERE program_id = $1 AND date >= CURRENT_DATE
            ORDER BY date ASC;
        `;
        const { rows } = await pool.query(query, [programId]);

        // Check if any upcoming events were found
        if (rows.length === 0) {
            return res.status(404).json({
                error: "No upcoming events found for the specified program",
            });
        }

        // Return the upcoming events
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET endpoint to fetch top 10 most popular upcoming events from all programs
app.get("/popular-upcoming-events", async (req, res) => {
    try {
        // Query to retrieve popular upcoming events
        const query = `
            SELECT 
                e.event_id,
                e.event_name,
                e.program_id,
                p.program_name,
                e.date,
                COUNT(er.ucinetid) AS num_attendees
            FROM 
                events e
            JOIN 
                programs p ON e.program_id = p.program_id
            LEFT JOIN 
                eventregistrees er ON e.event_id = er.event_id
            WHERE 
                e.date >= CURRENT_DATE
            GROUP BY 
                e.event_id, e.event_name, e.program_id, p.program_name, e.date
            ORDER BY 
                num_attendees DESC
            LIMIT 10;
        `;

        // Execute the query
        const { rows } = await pool.query(query);

        // Send the response with the fetched data
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching popular upcoming events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET endpoint to fetch administrators for a specific program
app.get("/programs/:programId/administrators", async (req, res) => {
    const programId = req.params.programId.replace(":", "");

    // await client.query("BEGIN");
    // // first get notif IDs from notifRecipients table
    // const query = `SELECT
    //     notifications.notification_id,
    //     notifications.program_id,
    //     notifications.title,
    //     notifications.contents,
    //     notifications.file,
    //     notificationrecipients.seen,
    //     programs.program_name
    //     FROM notificationrecipients
    //     LEFT JOIN notifications ON notifications.notification_id = notificationrecipients.notification_id
    //     LEFT JOIN programs ON programs.program_id = notifications.program_id
    //     WHERE ucinetid = $1`;
    // const data = await client.query(query, [ucinetid]);
    // res.json(data.rows);

    try {
        // Query to fetch administrators for the specified program
        const query = `
            SELECT
                u.ucinetid,
                u.user_emailaddress,
                u.profileimage,
                u.firstname,
                u.lastname,
                pa.isadmin,
                pa.issuperadmin
            FROM
                programadmins pa
            JOIN
                users u ON pa.ucinetid = u.ucinetid
            WHERE
                pa.program_id = $1
        `;
        const { rows } = await pool.query(query, [programId]);

        // Send the retrieved administrators as the response
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching administrators:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET endpoint for retrieving specific events
app.get("/events/:eventId", async (req, res) => {
    const eventId = req.params.eventId;

    try {
        // Connect to the database
        const client = await pool.connect();
        try {
            // Retrieve the event details from the database based on the event ID
            const eventQuery = "SELECT * FROM events WHERE event_id = $1";
            const eventResult = await client.query(eventQuery, [eventId]);
            const event = eventResult.rows[0];

            if (!event) {
                // If no event is found with the specified ID, return a 404 Not Found response
                return res.status(404).json({ error: "Event not found" });
            }

            // Retrieve admin email associated with the event
            const adminQuery =
                "SELECT user_emailaddress FROM eventadmins INNER JOIN users ON eventadmins.ucinetid = users.ucinetid WHERE event_id = $1";
            const adminResult = await client.query(adminQuery, [eventId]);
            const adminEmail = adminResult.rows[0]?.user_emailaddress;

            // Retrieve tags associated with the event
            const tagsQuery =
                "SELECT tag_name FROM eventtags INNER JOIN tags ON eventtags.tag_id = tags.tag_id WHERE event_id = $1";
            const tagsResult = await client.query(tagsQuery, [eventId]);
            const tags = tagsResult.rows.map((row) => row.tag_name);

            // Combine event details, admin email, and tags into a single object
            const eventData = { ...event, adminemail: adminEmail, tags: tags };

            // Return the event details in the response
            res.status(200).json(eventData);
        } catch (error) {
            // Handle database query errors
            console.error("Error fetching event:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        // Handle database connection errors
        console.error("Error connecting to database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET endpoint for retrieving all events
app.get("/events", async (req, res) => {
    try {
        // Connect to the database
        const client = await pool.connect();
        try {
            // Retrieve all events from the database
            const eventsQuery = "SELECT * FROM events";
            const eventsResult = await client.query(eventsQuery);
            const events = eventsResult.rows;

            // Initialize an array to store all events with admin emails and tags
            const eventsWithData = [];

            // Loop through each event to fetch admin email and tags
            for (const event of events) {
                const eventId = event.event_id;

                // Retrieve admin email associated with the event
                const adminQuery =
                    "SELECT user_emailaddress FROM eventadmins INNER JOIN users ON eventadmins.ucinetid = users.ucinetid WHERE event_id = $1";
                const adminResult = await client.query(adminQuery, [eventId]);
                const adminEmail = adminResult.rows[0]?.user_emailaddress;

                // Retrieve tags associated with the event
                const tagsQuery =
                    "SELECT tag_name FROM eventtags INNER JOIN tags ON eventtags.tag_id = tags.tag_id WHERE event_id = $1";
                const tagsResult = await client.query(tagsQuery, [eventId]);
                const tags = tagsResult.rows.map((row) => row.tag_name);

                // Combine event details, admin email, and tags into a single object
                const eventData = {
                    ...event,
                    adminemail: adminEmail,
                    tags: tags,
                };

                // Push the event data into the array
                eventsWithData.push(eventData);
            }

            // Return all events with admin emails and tags in the response
            res.status(200).json(eventsWithData);
        } catch (error) {
            // Handle database query errors
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        // Handle database connection errors
        console.error("Error connecting to database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Define the route for the search endpoint
//Query to fetch programs based on tags
// Query to fetch events based on tags
app.get("/search", async (req, res) => {
    const { tags } = req.query;

    try {
        // Start a transaction
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            // Query to fetch programs based on tags
            const programQuery = `
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
          t.tag_name = ANY($1::text[])
        GROUP BY 
          p.program_id, 
          u.user_emailaddress;
      `;
            const programResult = await client.query(programQuery, [
                tags.split(","),
            ]);

            // Query to fetch events based on tags
            const eventQuery = `
        SELECT 
          e.event_id,
          e.event_name,
          e.description,
          e.headerimage,
          e.location,
          e.starttime,
          e.endtime,
          e.recurring,
          e.recurringends,
          ua.user_emailaddress AS admin_email
        FROM 
          events e
        LEFT JOIN 
          eventtags et ON e.event_id = et.event_id
        LEFT JOIN 
          eventadmins ea ON e.event_id = ea.event_id
        LEFT JOIN 
          users ua ON ea.ucinetid = ua.ucinetid
        WHERE 
          et.tag_id IN (SELECT tag_id FROM tags WHERE tag_name = ANY($1::text[]))
        GROUP BY 
          e.event_id, ua.user_emailaddress;
      `;
            const eventResult = await client.query(eventQuery, [
                tags.split(","),
            ]);

            // Commit the transaction
            await client.query("COMMIT");

            res.status(200).json({
                programs: programResult.rows,
                events: eventResult.rows,
            });
        } catch (error) {
            // Rollback transaction if any error occurs
            await client.query("ROLLBACK");
            console.error("Error fetching programs and events:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Assuming you have an endpoint for adding a student to an event's list of registrees
app.post("/events/register", async (req, res) => {
    const { eventId, ucinetid } = req.body;

    try {
        // Verify that the student exists in the users table
        const studentExistsQuery = "SELECT * FROM users WHERE ucinetid = $1";
        const studentExistsResult = await pool.query(studentExistsQuery, [
            ucinetid,
        ]);
        if (studentExistsResult.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Verify that the event exists in the events table
        const eventExistsQuery = "SELECT * FROM events WHERE event_id = $1";
        const eventExistsResult = await pool.query(eventExistsQuery, [eventId]);
        if (eventExistsResult.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Insert a new record into the eventregistree table
        const insertQuery =
            "INSERT INTO eventregistrees (event_id, ucinetid) VALUES ($1, $2)";
        await pool.query(insertQuery, [eventId, ucinetid]);

        res.status(200).json({
            message: "Student added to event's list of registrees successfully",
        });
    } catch (error) {
        console.error(
            "Error adding student to event's list of registrees:",
            error
        );
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/events/:eventId/registrees", async (req, res) => {
    const { eventId } = req.params;

    try {
        // Query the database to get the list of registrees for the specified event
        const eventRegistreesQuery = `
      SELECT 
        u.user_emailaddress,
        u.profileimage,
        u.firstname,
        u.lastname
      FROM 
        eventregistrees er
      INNER JOIN 
        users u ON er.ucinetid = u.ucinetid
      WHERE 
        er.event_id = $1;
    `;
        const { rows } = await pool.query(eventRegistreesQuery, [eventId]);

        res.status(200).json({ registrees: rows });
    } catch (error) {
        console.error("Error fetching event registrees:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get events a student is registered for
app.get("/students/:ucinetid/events", async (req, res) => {
    const { ucinetid } = req.params;

    try {
        // Query the database to get the list of events the student is registered for
        const studentEventsQuery = `
      SELECT 
        e.event_id,
        e.event_name,
        e.description,
        e.location,
        e.starttime,
        e.endtime,
        e.recurring,
        e.recurringends
      FROM 
        events e
      INNER JOIN 
        eventregistrees er ON e.event_id = er.event_id
      WHERE 
        er.ucinetid = $1;
    `;
        const { rows } = await pool.query(studentEventsQuery, [ucinetid]);

        res.status(200).json({ events: rows });
    } catch (error) {
        console.error("Error fetching student events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get programs the user is an administrator for
app.get("/users/:ucinetid/programs", async (req, res) => {
    const { ucinetid } = req.params;

    try {
        // Query the database to get the list of programs the user is an administrator for
        const userProgramsQuery = `
      SELECT 
        p.program_id,
        p.program_name,
        p.description,
        p.headerimage,
        p.color,
        u.user_emailaddress AS admin_name
      FROM 
        programs p
      INNER JOIN 
        programadmins pa ON p.program_id = pa.program_id
      INNER JOIN 
        users u ON pa.ucinetid = u.ucinetid
      WHERE 
        pa.ucinetid = $1;
    `;
        const { rows } = await pool.query(userProgramsQuery, [ucinetid]);

        res.status(200).json({ programs: rows });
    } catch (error) {
        console.error("Error fetching user programs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/users/:ucinetid/events/attended", async (req, res) => {
    const { ucinetid } = req.params;

    try {
        // Query the database to get the list of events the user has attended
        const attendedEventsQuery = `
      SELECT 
        e.event_id,
        e.event_name,
        e.description,
        e.headerimage,
        e.location,
        e.starttime,
        e.endtime,
        e.recurring,
        e.recurringends
      FROM 
        events e
      INNER JOIN 
        eventregistrees er ON e.event_id = er.event_id
      WHERE 
        er.ucinetid = $1;
    `;
        const { rows } = await pool.query(attendedEventsQuery, [ucinetid]);

        res.status(200).json({ attended_events: rows });
    } catch (error) {
        console.error("Error fetching attended events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/programs/:programId/events/past", async (req, res) => {
    const { programId } = req.params;

    try {
        // Write your database query to retrieve past events for the specified program
        const pastEventsQuery = `
      SELECT e.*
      FROM events e
      JOIN programevents pe ON e.event_id = pe.event_id
      WHERE pe.program_id = $1
      AND e.date < CURRENT_DATE
    `;
        const pastEventsResult = await pool.query(pastEventsQuery, [programId]);
        const pastEvents = pastEventsResult.rows;

        res.status(200).json({ pastEvents });
    } catch (error) {
        console.error("Error fetching past events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//need more clarification

// Get top 10 most popular programs
app.get("/popular-programs", async (req, res) => {
    try {
        // Query the database to get the program with the most followers

        const query = `
          SELECT
            p.program_id,
            p.program_name,
            COUNT(pf.ucinetid) AS num_followers
          FROM
            programs p
          LEFT JOIN
            programfollowers pf ON p.program_id = pf.program_id
          GROUP BY
            p.program_id
          ORDER BY
            num_followers DESC
          LIMIT 10;
        `;
        const result = await pool.query(query);

        // Check if any program was found
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No popular program found" });
        }

        // Return the most popular programs
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching popular program:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/upcoming-events-sooner", async (req, res) => {
    try {
        // Calculate the date for one week from today
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

        // Query the database to get upcoming events within the next week
        const query = `
      SELECT *
      FROM events
      WHERE date >= NOW() AND date <= $1
      ORDER BY date ASC;
    `;
        const result = await pool.query(query, [oneWeekFromNow]);

        // Return the upcoming events
        const upcomingEvents = result.rows;
        res.status(200).json(upcomingEvents);
    } catch (error) {
        console.error("Error fetching upcoming events (sooner):", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get the 10 first upcoming events from all programs
app.get("/upcoming-events", async (req, res) => {
    try {
        // Query the database to get upcoming events
        const query = `
      SELECT *
      FROM events
      WHERE date >= CURRENT_DATE
      ORDER BY date ASC
      LIMIT 10;
    `;
        const result = await pool.query(query);

        // Return the upcoming events
        const upcomingEvents = result.rows;
        res.status(200).json(upcomingEvents);
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Need more clarification
// Cancel Event API
app.delete("/events/:eventId", async (req, res) => {
    const eventId = req.params.eventId;

    try {
        // Delete the event from the database
        const deleteEventQuery = `
      DELETE FROM events
      WHERE event_id = $1
    `;
        await pool.query(deleteEventQuery, [eventId]);

        res.status(200).json({ message: "Event canceled successfully" });
    } catch (error) {
        console.error("Error canceling event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Update Event API
app.put("/events/:eventId", async (req, res) => {
    const eventId = req.params.eventId;
    const {
        name,
        location,
        date,
        start_time,
        end_time,
        recurring,
        recurring_ends,
        description,
        headerimage,
        tags,
    } = req.body;

    try {
        // Update the event in the database
        const updateEventQuery = `
      UPDATE events
      SET
        event_name = $1,
        location = $2,
        starttime = $3,
        endtime = $4,
        recurring = $5,
        recurringends = $6,
        description = $7,
        headerimage = $8
      WHERE
        event_id = $9
    `;
        await pool.query(updateEventQuery, [
            name,
            location,
            date + " " + start_time,
            date + " " + end_time,
            recurring,
            recurring_ends,
            description,
            headerimage,
            eventId,
        ]);

        // Remove existing tags associated with the event
        const removeTagsQuery = `
      DELETE FROM eventtags
      WHERE event_id = $1
    `;
        await pool.query(removeTagsQuery, [eventId]);

        // Insert new tags for the event
        if (tags && Array.isArray(tags) && tags.length > 0) {
            for (const tagName of tags) {
                // Fetch tag_id for the current tag name
                const tagQuery = "SELECT tag_id FROM tags WHERE tag_name = $1";
                const tagResult = await pool.query(tagQuery, [tagName]);
                const tagId = tagResult.rows[0].tag_id;

                // Insert into eventtags table
                const eventTagInsertQuery =
                    "INSERT INTO eventtags (event_id, tag_id) VALUES ($1, $2)";
                await pool.query(eventTagInsertQuery, [eventId, tagId]);
            }
        }

        res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Cancel Event API
app.delete("/events/:eventId", async (req, res) => {
    const eventId = req.params.eventId;

    try {
        // Delete the event from the database
        const deleteEventQuery = `
      DELETE FROM events
      WHERE event_id = $1
    `;
        await pool.query(deleteEventQuery, [eventId]);

        res.status(200).json({ message: "Event canceled successfully" });
    } catch (error) {
        console.error("Error canceling event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Remove Admin Endpoint
app.delete("/admins/remove/:email", async (req, res) => {
    const email = req.params.email.replace(":", "");

    try {
        // Check if the user with the provided ucinetid exists in the database and is an admin
        const adminExistsQuery =
            "SELECT * FROM users WHERE user_emailaddress = $1 AND isadmin = $2";
        const adminExistsResult = await pool.query(adminExistsQuery, [
            email,
            true,
        ]);
        if (adminExistsResult.rows.length === 0) {
            return res.status(404).json({ error: "Admin not found" });
        }

        // Update the user's status to remove admin
        const updateUserAdminStatusQuery =
            "UPDATE users SET isadmin = $1 WHERE user_emailaddress = $2";
        await pool.query(updateUserAdminStatusQuery, [false, email]);

        res.status(200).json({
            message: "User demoted from admin successfully",
        });
    } catch (error) {
        console.error("Error demoting user from admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add Admin Endpoint
app.post("/admins/add/:email", async (req, res) => {
    const email = req.params.email.replace(":", "");

    try {
        // Check if the user with the provided ucinetid exists in the database
        const userExistsQuery =
            "SELECT * FROM users WHERE user_emailaddress = $1";
        const userExistsResult = await pool.query(userExistsQuery, [email]);
        if (userExistsResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user's status to indicate admin (assuming is_admin column)
        const updateUserAdminStatusQuery =
            "UPDATE users SET isadmin = $1 WHERE user_emailaddress = $2";
        await pool.query(updateUserAdminStatusQuery, [true, email]);

        res.status(201).json({
            message: "User promoted to admin successfully",
        });
    } catch (error) {
        console.error("Error promoting user to admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add Student to Program's Followers Endpoint
app.post("/programs/:programId/followers", async (req, res) => {
    const programId = req.params.programId;
    const { ucinetid } = req.body;

    try {
        // Check if the program exists
        const programExistsQuery =
            "SELECT * FROM programs WHERE program_id = $1";
        const programExistsResult = await pool.query(programExistsQuery, [
            programId,
        ]);
        if (programExistsResult.rows.length === 0) {
            return res.status(404).json({ error: "Program not found" });
        }

        // Check if the student exists
        const studentExistsQuery = "SELECT * FROM users WHERE ucinetid = $1";
        const studentExistsResult = await pool.query(studentExistsQuery, [
            ucinetid,
        ]);
        if (studentExistsResult.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Check if the student is already a follower of the program
        const isFollowingQuery =
            "SELECT * FROM programfollowers WHERE program_id = $1 AND ucinetid = $2";
        const isFollowingResult = await pool.query(isFollowingQuery, [
            programId,
            ucinetid,
        ]);
        if (isFollowingResult.rows.length > 0) {
            return res.status(400).json({
                error: "Student is already a follower of the program",
            });
        }

        // Add the student to the program's followers
        const addFollowerQuery =
            "INSERT INTO programfollowers (program_id, ucinetid) VALUES ($1, $2)";
        await pool.query(addFollowerQuery, [programId, ucinetid]);

        res.status(201).json({
            message: "Student added to program's followers successfully",
        });
    } catch (error) {
        console.error("Error adding student to program followers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get Program Followers Endpoint
app.get("/programs/:programId/followers", async (req, res) => {
    const programId = req.params.programId;

    try {
        // Query to fetch list of followers for the specified program
        const query = `
      SELECT u.ucinetid, u.user_emailaddress, u.profileimage, u.firstname, u.lastname
      FROM programfollowers pf
      JOIN users u ON pf.ucinetid = u.ucinetid
      WHERE pf.program_id = $1
    `;
        const { rows } = await pool.query(query, [programId]);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching program followers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
