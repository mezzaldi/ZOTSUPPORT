import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Select from "react-select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const Event = () => {
    const [formData, setFormData] = useState({
        eventName: "",
        location: "",
        description: "",
        headerImage: "",
        startDate: new Date(),
        endDate: new Date(),
        recurringEndDate: new Date(),
    });

    const [tagData, setTagData] = useState({
        tags: [],
    });

    const [adminData, setAdminData] = useState({
        admins: [],
    });

    const [startData, setStartData] = useState({
        startDate: dayjs().toDate(),
    });

    const [endData, setEndData] = useState({
        endDate: dayjs().toDate(),
    });

    const [recurringData, setRecurringData] = useState({
        recurring: "None",
    });

    const [recurringEndData, setRecurringEndData] = useState({
        recurringEndDate: dayjs().toDate(),
    });

    const [checkboxData, setCheckboxData] = useState({
        requireRegistration: [false],
        receiveRegistrationNotification: [false],
    });

    //Check if the event is recurring or not. If so, render recurringEnd question. If not
    //hide it.

    let isRecurring = false;

    if (
        recurringData.recurring.value === "Monthly" ||
        recurringData.recurring.value === "Weekly"
    ) {
        isRecurring = true;
    } else {
        isRecurring = false;
    }

    //This will update the input of program name, admin email, header image, description,
    //registration requirement, and registration notifications on change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //This will update the input of tags on change
    const handleTagInputChange = (e) => {
        setTagData({ tags: e });
    };

    //This will update the input of admin on change
    const handleAdminInputChange = (e) => {
        setAdminData({ admins: e });
    };

    //This will update the input of start date on change
    const handleStartInputChange = (e) => {
        setStartData({ date: e.toDate() });
    };

    //This will update the input of end date on change
    const handleEndInputChange = (e) => {
        setEndData({ date: e.toDate() });
    };

    //This will update the input of recurring on change
    const handleRecurringInputChange = (e) => {
        setRecurringData({ recurring: e });
    };

    //This will update the input of recurring end date on change
    const handleRecurringEndInputChange = (e) => {
        setRecurringEndData({ date: e.toDate() });
    };

    //This will update the input of require registration and receive reg notif on change
    const handleCheckboxInputChange = (e) => {
        setCheckboxData({
            ...checkboxData,
            [e.target.name]: [e.target.checked],
        });
    };

    //Input information from tags, recurring, color, admins, registration require, receive registration notif
    // and start end dates are concatenated with the rest of the form and logged in the console
    const handleSubmit = async (e) => {
        e.preventDefault();

        tagData.tags.push({ value: "20", label: "Event" }); //Event tag added automatically here.
        //iterate through chosen tags and store just the value
        const finalEventTags = [];
        tagData.tags.forEach((tag) => finalEventTags.push(tag.value));
        formData.tags = finalEventTags;
        formData.admins = adminData.admins;

        if (typeof startData.startDate == "undefined") {
            formData.startDate = startData.date;
        } else {
            formData.startDate = startData.startDate;
        }
        if (typeof endData.endDate == "undefined") {
            formData.endDate = endData.date;
        } else {
            formData.endDate = endData.endDate;
        }

        if (typeof recurringEndData.recurringEndDate == "undefined") {
            formData.recurringEndDate = recurringEndData.date;
        } else {
            formData.recurringEndDate = recurringEndData.recurringEndDate;
        }

        formData.recurring = recurringData.recurring;

        formData.requireRegistration = checkboxData.requireRegistration[0];
        formData.receiveRegistrationNotification =
            checkboxData.receiveRegistrationNotification[0];
        console.log(formData);

        //back-end to front-end connection here, in progress

        try {
      const response = await axios.post('http://localhost:3001/events', formData);
      console.log('Program created successfully:', response.data);
      // You can handle the success response accordingly
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle the error appropriately
    }
    };

    const recurringOptions = [
        //recurring options
        { value: "None", label: "None" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
    ];

    // Get tags from database
    const [tags, setTags] = useState();
    useEffect(() => {
        console.log("useeffect tags");
        const getTags = async () => {
            const res = await axios
                .get(`http://localhost:3001/tags`)
                .catch((err) => console.log(err));
            setTags(await res.data);
        };
        getTags();
    }, []);

    //All the different tag categories
    let levelTags = [];
    let subjectTags = [];
    let eventTypeTags = [];

    // Load tag data into menu options under the correct category
    {
        tags &&
            tags.map((tag) => {
                if (tag.tag_category === "Level") {
                    levelTags.push({
                        value: tag.tag_id,
                        label: tag.tag_name,
                        color: tag.tag_color,
                    });
                }

                if (tag.tag_category === "Subject") {
                    subjectTags.push({
                        value: tag.tag_id,
                        label: tag.tag_name,
                        color: tag.tag_color,
                    });
                }

                if (tag.tag_category === "Event Type") {
                    eventTypeTags.push({
                        value: tag.tag_id,
                        label: tag.tag_name,
                        color: tag.tag_color,
                    });
                }
            });
    }

    //Gather all the categories of tags under one list
    const allTags = [
        {
            label: "Level",
            options: levelTags,
        },

        {
            label: "Subject",
            options: subjectTags,
        },

        {
            label: "Event Types",
            options: eventTypeTags,
        },
    ];

    //styling tags so they correspond to assigned color
    const tagStyles = {
        option: (styles, { data }) => {
            return {
                ...styles,
                color: data.color,
            };
        },
    };

    // Get admin from database
    const [admins, setAdmins] = useState();
    useEffect(() => {
        console.log("useeffect admin");
        const getAdmins = async () => {
            const res = await axios
                .get(`http://localhost:3001/programs/:1/administrators`)
                .catch((err) => console.log(err));
            setAdmins(await res.data);
        };
        getAdmins();
        console.log(admins);
    }, []);

    const eventAdmins = [];

    {
        admins &&
            admins.map((admin) => {
                eventAdmins.push({
                    value: admin.ucinetid,
                    label: admin.firstname + " " + admin.lastname,
                });
            });
    }

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
                        <Typography variant="h2">Event Name:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            required
                            fullWidth
                            label="Name"
                            type="text"
                            name="eventName"
                            value={formData.eventmName}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Location:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            label="Location"
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Start:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Start Date"
                                defaultValue={dayjs()}
                                minDate={dayjs()}
                                onChange={handleStartInputChange}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">End:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="End Date"
                                minDate={dayjs(startData.date)}
                                onChange={handleEndInputChange}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Description:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            multiline
                            rows={10}
                            label="Description of program"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Header Image:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Button variant="outlined" component="label">
                            Upload Image
                            <input
                                type="file"
                                hidden
                                onChange={handleInputChange}
                                value={formData.headerImage}
                            />
                        </Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Assigned Admins:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            isMulti
                            className="tagContainer"
                            value={adminData.tags}
                            onChange={handleAdminInputChange}
                            options={eventAdmins}
                        ></Select>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Tags:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            isMulti
                            className="tagContainer"
                            value={tagData.tags}
                            onChange={handleTagInputChange}
                            options={allTags}
                            styles={tagStyles}
                        ></Select>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Recurring:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            className="tagContainer"
                            value={recurringData.recurring}
                            onChange={handleRecurringInputChange}
                            options={recurringOptions}
                        ></Select>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">Recurring Ends On:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Recurring End Date"
                                defaultValue={dayjs()}
                                minDate={dayjs()}
                                onChange={handleRecurringEndInputChange}
                                disabled={!isRecurring}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item>
                        <div className="checkboxContainer">
                            <Checkbox
                                name={"requireRegistration"}
                                value={checkboxData.requireRegistration}
                                onChange={handleCheckboxInputChange}
                            />
                            <Typography variant="h3">
                                Require registration?
                            </Typography>
                        </div>
                        <div className="checkboxContainer">
                            <Checkbox
                                name={"receiveRegistrationNotification"}
                                value={
                                    checkboxData.receiveRegistrationNotification
                                }
                                onChange={handleCheckboxInputChange}
                            />
                            <Typography variant="h3">
                                Would you like to receive registration
                                notifications?
                            </Typography>
                        </div>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center">
                    <Grid item>
                        <Button variant="contained" type="submit">
                            Publish new program page
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Event;
