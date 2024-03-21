import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Notification = () => {

    let { program_id } = useParams();
    program_id = program_id.replace(":", "");

    // Get upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/:${program_id}/events/upcoming`
                )
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
            console.log(res.data)
        };
        getUpcomingEvents();
    }, []);

    const recipientOptions = [
        { value: "programFollowers", label: "All Followers" },
    ];

    //load in the last 3 most recent upcoming events
    { upcomingEvents &&
        upcomingEvents.map((event) => {
            if (upcomingEvents.length >= 4) {
                for(let i = 0; i < 3; i++){
                    recipientOptions.push({
                        value: event.event_id,
                        label: event.event_name
                    })
                }
            }
            else {
                recipientOptions.push({
                    value: event.event_id,
                    label: event.event_name
                })
            }

        })
    
    }

    const [formData, setFormData] = useState({
        title: "",
        contents: "",
        file: "",
    });

    const [recipientsData, setRecipientsData] = useState({
        recipients: recipientOptions[0],
    });

    //This will update the input of notification title, content, file, and recipients on change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //This will update the input of recipients on change
    const handleRecipientsInputChange = (e) => {
        setRecipientsData({ recipients: e });
    };

    //Input information from tags is concatenated with the rest of the form and logged in the console
    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.recipients = recipientsData.recipients.value;
        console.log(formData);

        /* try {
      const response = await axios.post('http://localhost:3001/programs', formData);
      console.log('Program created successfully:', response.data);
      // You can handle the success response accordingly
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle the error appropriately
    }*/
    };

    return (
        <div className="h2Container">
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    align-items="center"
                    paddingBottom="3rem"
                    columnSpacing={2}
                    rowSpacing={6}
                >
                    <Grid item xs={3}>
                        <Typography variant="h2">Title:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            required
                            fullWidth
                            label="Title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Recipients:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className="tagContainer"
                            value={recipientsData.recipients}
                            onChange={handleRecipientsInputChange}
                            options={recipientOptions}
                        ></Select>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Contents:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={10}
                            name="contents"
                            value={formData.content}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">File:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Button variant="outlined" component="label">
                            Upload Image
                            <input
                                type="file"
                                hidden
                                onChange={handleInputChange}
                                value={formData.file}
                            />
                        </Button>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center">
                    <Grid item>
                        <Button variant="contained" type="submit">
                            Send Custom Notification
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Notification;
