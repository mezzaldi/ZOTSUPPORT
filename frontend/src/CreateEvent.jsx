import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Select from 'react-select';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const Event = () => {

  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    recurring: '',
    description: '',
    headerImage: '',
    startDate: new Date(),
    endDate: new Date()
  });

  const [tagData, setTagData] = useState({
    tags: []
  });

  const [adminData, setAdminData] = useState({
    admins: []
  });

  const [startData, setStartData] = useState({
    startDate: dayjs()
  });

  const [endData, setEndData] = useState({
    endDate: dayjs()
  });

  const [recurringData, setRecurringData] = useState({
    recurring: 'None'
  })

  const [recurringEndData, setRecurringEndData] = useState({
    recurringEndDate: dayjs(new Date())
  });

  const [checkboxData, setCheckboxData] = useState({
    requireRegistration: false,
    receiveRegistrationNotification: false
  })

//Check if the event is recurring or not. If so, render recurringEnd question. If not
//hide it.

  let isRecurring = false

  if (recurringData.recurring.value == 'Monthly' || recurringData.recurring.value == 'Weekly') {
    isRecurring = true
  }

  else {
    isRecurring = false
  }
  

  //This will update the input of program name, admin email, header image, description,
  //registration requirement, and registration notifications on change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //This will update the input of tags on change 
  const handleTagInputChange = (e) => {
    setTagData({tags: e})
  }

  //This will update the input of admin on change 
  const handleAdminInputChange = (e) => {
    setAdminData({admins: e})
    }

  //This will update the input of start date on change 
  const handleStartInputChange = (e) => {
    setStartData({date: e.toDate()})
    }

  //This will update the input of end date on change 
  const handleEndInputChange = (e) => {
    setEndData({date: e.toDate()})
    }

  //This will update the input of recurring on change 
  const handleRecurringInputChange = (e) => {
    setRecurringData({recurring: e})
    }

  //This will update the input of recurring end date on change 
  const handleRecurringEndInputChange = (e) => {
    setRecurringEndData({date: e.toDate()})
    console.log(recurringEndData.recurringEndDate)
  }

  //This will update the input of require registration and receive reg notif on change 
  const handleCheckboxInputChange = (e) => {
    setCheckboxData({...checkboxData, [e.target.name] : [e.target.checked]})
  }
    
  
  //Input information from tags, recurring, color, admins, registration require, receive registration notif
 // and start end dates are concatenated with the rest of the form and logged in the console
  const handleSubmit = async (e) => {
    e.preventDefault();
    tagData.tags.push({value: '20', label: 'Event'})  //Event tag added automatically here.
    //iterate through chosen tags and store just the value
      const finalEventTags = []
      tagData.tags.forEach((tag) => finalEventTags.push(tag.value));
      formData.tags = finalEventTags 
    formData.admins = adminData.admins
    //checks if the start date is changed from default, and stores the data accordingly
    if (typeof startData == Date) {
      formData.startDate = startData.date
    }
    else {
      formData.startDate = startData.startDate.toDate()

    }

    if (typeof endData == Date) {
      formData.endDate = endData.date
    }
    else {
      formData.endDate = endData.endDate.toDate()
    }

    formData.endDate = endData.date
    formData.recurring = recurringData.recurring.value
    //checks if the recurring end date is changed from default, and stores the data accordingly
    if (typeof recurringEndData == Date) {
      formData.recurringEndDate = recurringEndData.date
    }
    else {
      formData.recurringEndDate = recurringEndData.recurringEndDate.toDate()
    }
    formData.recurringEndDate = recurringEndData.date
    formData.requireRegistration = checkboxData.requireRegistration[0]
    formData.receiveRegistrationNotification = checkboxData.receiveRegistrationNotification[0]
    console.log(formData)

   //back-end to front-end connection here, in progress

   /* try {
      const response = await axios.post('http://localhost:3001/programs', formData);
      console.log('Program created successfully:', response.data);
      // You can handle the success response accordingly
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle the error appropriately
    }*/
  }; 

  const recurringOptions = [ 
    //recurring options
      {value:'None', label:"None"},
      {value:'Weekly', label:"Weekly"},
      {value:'Monthly', label:"Monthly"}  
    ]

  const levelTags = [ 
  //load in tags for each tag category
  //value would be tagid, label would be tag name
  //note: must add new column for color (?)
    {value:'1', label:"Undergraduate", color: "#11007B"},
    {value:'2', label:"Graduate", color: "#11007B"},

  ]

  const subjectTags = [ 
  //load in tags for each tag category
    {value:'3', label:"Art", color: "#80CEAC"},
    {value:'4', label:"Biology", color: "#80CEAC"},

  ]

  const allTags = [
  //all categories and their following tags
    { 
      label: "Level",
      options: levelTags
    },

    { 
      label: "Subject",
      options: subjectTags
    }

  ]

  //styling tags so they correspond to assigned color
  const tagStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        color: data.color

      };
    }
  };

  const eventAdmins = [
    //load in eventAdmins data
    {value:'1', label:"Mario", color: "#80CEAC"},
    {value:'2', label:"Trace", color: "#80CEAC"}

  ]

  

  return (
    <div className='h2Container'>
    <form onSubmit={handleSubmit}>

    <Grid container align-items='center' paddingBottom='3rem' columnSpacing = {2} rowSpacing = {6}>
        
        <Grid item xs = {3}>
        <Typography variant="h2">  
            Event Name:
          </Typography>
        </Grid>
        <Grid item xs = {9}>
          <TextField required fullWidth label="Name" type="text" name="eventName" value={formData.eventmName} onChange={handleInputChange} />
        </Grid>

        <Grid item xs = {3}>
        <Typography variant="h2">  
            Location:
          </Typography>
        </Grid>
        <Grid item xs = {9}>
          <TextField fullWidth label="Location" type="text" name="location" value={formData.location} onChange={handleInputChange} />
        </Grid>

        <Grid item xs = {3}>
        <Typography variant="h2">  
            Start:
          </Typography>
        </Grid>
        <Grid item xs = {9}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker  
               label="Start Date" value={startData.startDate} minDate={dayjs()} onChange={handleStartInputChange} />
            </LocalizationProvider>        
        </Grid>

        <Grid item xs = {3}>
        <Typography variant="h2">  
            End:
          </Typography>
        </Grid>
        <Grid item xs = {9}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
            label="End Date" minDate={dayjs(startData.date)} value={endData.endDate} onChange={handleEndInputChange} />
          </LocalizationProvider>    
        </Grid>

        <Grid item xs = {3}>
          <Typography variant="h2">  
              Description:
            </Typography>
        </Grid>
        <Grid item xs = {9}>
          <TextField fullWidth multiline rows={10} label="Description of program" name="description" value={formData.description} onChange={handleInputChange}/>
        </Grid>

        <Grid item xs = {3}>
          <Typography variant="h2">  
              Header Image:
            </Typography>
        </Grid>
        <Grid item xs = {9}>
           <Button variant="outlined" component='label'> 
              Upload Image  
              <input type="file" hidden onChange={handleInputChange} value={formData.headerImage}/>
           </Button>        
        </Grid>

        <Grid item xs = {3}>
          <Typography variant="h2">  
              Assigned Admins:
            </Typography>
        </Grid>
        <Grid item xs = {9}>
          <Select isMulti className="tagContainer" value={adminData.tags} onChange={handleAdminInputChange} options={eventAdmins}></Select>
        </Grid>

        <Grid item xs = {3}>
          <Typography variant="h2">  
              Tags:
            </Typography>
        </Grid>
        <Grid item xs = {9}>
          <Select isMulti className="tagContainer" value={tagData.tags} onChange={handleTagInputChange} options={allTags} styles={tagStyles}></Select>
        </Grid>

        <Grid item xs = {3}>
          <Typography variant="h2">  
              Recurring:
            </Typography>
        </Grid>
        <Grid item xs = {9}>
          <Select className="tagContainer" value={recurringData.recurring} onChange={handleRecurringInputChange} options={recurringOptions}></Select>
        </Grid>

        <Grid item xs = {3}>
        <Typography variant="h2">  
            Recurring Ends On:
          </Typography>
        </Grid>
        <Grid item xs = {9}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
            label="Recurring End Date" defaultValue={dayjs()} minDate={dayjs()} 
            value={recurringEndData.recurringEndDate} onChange={handleRecurringEndInputChange}
            disabled={!isRecurring}
            />
          </LocalizationProvider>    
        </Grid>
  
  
        <Grid item>
        <div className='checkboxContainer'>
          <Checkbox name={"requireRegistration"} value={checkboxData.requireRegistration} onChange={handleCheckboxInputChange}/>
          <Typography variant="h3">
              Require registration?
          </Typography>
        </div>
        <div className='checkboxContainer'>
          <Checkbox name={"receiveRegistrationNotification"} value={checkboxData.receiveRegistrationNotification} onChange={handleCheckboxInputChange}/>
          <Typography variant="h3">
                Would you like to receive registration notifications?
          </Typography>
        </div>
        </Grid>
    </Grid>

    <Grid container justifyContent="center">
        <Grid item>
        <Button variant="contained" type="submit">Publish new program page</Button>
        </Grid>
    </Grid>

    </form>
    </div>
  );
};

export default Event;
