import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Select from 'react-select';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers';
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
    endDate: new Date(),
  });

  const [tagData, setTagData] = useState({
    tags: []
  });

  const [adminData, setAdminData] = useState({
    admins: []
  });

  const [startData, setStartData] = useState({
    startDate: new Date()
  });

  const [endData, setEndData] = useState({
    endDate: new Date()
  });

  const [colorData, setColorData] = useState({
    color: ''
  })

  const [recurringData, setRecurringData] = useState({
    recurring: ''
  })

  const [checkboxData, setCheckboxData] = useState({
    requireRegistration: false,
    receiveRegistrationNotification: false
  })

  //This will update the input of program name, admin email, header image, description,
  //program color, registration requirement, and registration notifications on change
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

  //This will update the input of color on change 
  const handleColorInputChange = (e) => {
    setColorData({color: e})
    }

  //This will update the input of recurring on change 
  const handleRecurringInputChange = (e) => {
    setRecurringData({recurring: e})
    }

  const handleCheckboxInputChange = (e) => {
    setCheckboxData({...checkboxData, [e.target.name] : [e.target.checked]})
  }
    
  
  //Input information from tags, recurring, color, admins, registration require, receive registration notif
 // and start end dates are concatenated with the rest of the form and logged in the console
  const handleSubmit = async (e) => {
    e.preventDefault();
    tagData.tags.push({value: '20', label: 'Event'})  //Event tag added automatically here.
    //iterate through chosen tags and store just the value
      const finalProgramTags = []
      tagData.tags.forEach((tag) => finalProgramTags.push(tag.value));
      formData.tags = finalProgramTags 
    formData.admins = adminData.admins
    formData.startDate = startData.date
    formData.endDate = endData.date
    formData.recurring = recurringData.recurring.value
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

  const programAdmins = [
    //load in programAdmin data
    {value:'1', label:"Mario", color: "#80CEAC"},
    {value:'2', label:"Trace", color: "#80CEAC"}

  ]

  

  return (
    <div className='h2Container'>
    <form onSubmit={handleSubmit}>
      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
          Event Name:
        </Typography>
        <TextField required fullWidth label="Name" type="text" name="eventName" value={formData.eventmName} onChange={handleInputChange} />
      </div>

      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
            Location:
        </Typography>
        <TextField fullWidth label="Location" type="text" name="location" value={formData.location} onChange={handleInputChange} />
      </div>
      
      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
            Start:
        </Typography>
        <div className='datePickerQuestion'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker slotProps={{ textField: {required: true,},}} 
            label="Start Date" value={startData} onChange={handleStartInputChange} />
            </LocalizationProvider>
        </div>
      </div>

      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
            End:
        </Typography>
        <div className='datePickerQuestion'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker slotProps={{ textField: {required: true,},}} 
            label="End Date" minDate={dayjs(startData.date)} value={endData} onChange={handleEndInputChange} />
            </LocalizationProvider>
        </div>
      </div>

      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
            Description:
        </Typography>          
        <TextField fullWidth multiline rows={10} label="Description of program" name="description" value={formData.description} onChange={handleInputChange}/>
      </div>

      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
            Header Image:
        </Typography>  
        <Button variant="outlined" component='label'> 
          Upload Image  
          <input type="file" hidden onChange={handleInputChange} value={formData.headerImage}/>
        </Button>
      </div>

      <div>
      <Typography variant="h2">
            Assigned Admins:
      </Typography>
      </div>

      <div className='h2container'>
      <Select isMulti className="tagContainer" value={adminData.tags} onChange={handleAdminInputChange} options={programAdmins}></Select>
      </div>

      <div>
      <Typography variant="h2">
            Tags:
      </Typography>
      </div>

      <div className='h2container'>
      <Select isMulti className="tagContainer" value={tagData.tags} onChange={handleTagInputChange} options={allTags} styles={tagStyles}></Select>
      </div>

      <div>
      <Typography variant="h2">
            Recurring:
      </Typography>
      </div>

      <div className='h2container'>
      <Select className="tagContainer" value={recurringData.recurring} onChange={handleRecurringInputChange} options={recurringOptions}></Select>
      </div>

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


      <div>
        <Button variant="contained" type="submit">Publish new program page</Button>
      </div>
    </form>
    </div>
  );
};

export default Event;
