// ProgramForm.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import Select from 'react-select';
import axios from 'axios';

const Program = () => {

  const programColors = [ 
    //program color options
      {value:'#C41E3A', label:"Red"},
      {value:'#11007B', label:"Blue"}  
    ]

  const [formData, setFormData] = useState({
    programName: '',
    headerImage: '',
    description: '',
    //tags: null , // Set a default value
  });

  const [tagData, setTagData] = useState({
    tags: []
  });

  const [colorData, setColorData] = useState({
    color: programColors[1]
  })

  //This will update the input of program name, admin email, header image, and description on change
  const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //This will update the input of tags on change 
  const handleTagInputChange = (e) => {
    setTagData({tags: e})
  }

  //This will update the input of color on change 
  const handleColorInputChange = (e) => {
    setColorData({color: e})
  }

  //Input information from tags is concatenated with the rest of the form and logged in the console
  const handleSubmit = async (e) => {
    e.preventDefault();
    tagData.tags.push({value: '21', label: 'Program'})  //Program tag added automatically here.
    //iterate through chosen tags and store just the value
    const finalProgramTags = [] 
    tagData.tags.forEach((tag) => finalProgramTags.push(tag.value));
    formData.tags = finalProgramTags 
    formData.color = colorData.color.value
    console.log(formData)
    
    //note: need to remove 'program' and event' tag from tag options when loading it in.
    

   /* try {
      const response = await axios.post('http://localhost:3001/programs', formData);
      console.log('Program created successfully:', response.data);
      // You can handle the success response accordingly
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle the error appropriately
    }*/
  } 

  // Get tags from database
    const [tags, setTags] = useState();
    useEffect(() => {
        console.log("useeffect tags");
        const getTags = async () => {
            const res = await axios
                .get(`http://localhost:3001/tags`)
                .catch((err) => console.log(err));
            setTags(res.data);
        };
        getTags();
        console.log(tags)
    }, []);

  //All the different tag categories
  let levelTags = []
  let subjectTags = []
  let eventTypeTags = []

// Load tag data into menu options under the correct category
tags.forEach((tag) => {
  if (tag.tag_category == 'Level') {
    levelTags.push({value: tag.tag_id, label: tag.tag_name, color: tag.tag_color})
  }

  if (tag.tag_category == 'Subject') {
    subjectTags.push({value: tag.tag_id, label: tag.tag_name, color: tag.tag_color})
  }

  if (tag.tag_category == 'Event Type') {
    eventTypeTags.push({value: tag.tag_id, label: tag.tag_name, color: tag.tag_color})
  }
})
  

//Gather all the categories of tags under one list
  const allTags = [
    { 
      label: "Level",
      options: levelTags
    },

    { 
      label: "Subject",
      options: subjectTags
    },

    { 
      label: "Event Types",
      options: eventTypeTags
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

  

  return (
    <div className='h2Container'>
      <form onSubmit={handleSubmit}>

      <Grid container align-items='center' paddingBottom='3rem' columnSpacing = {2} rowSpacing = {6}>
        <Grid item xs = {3}>
        <Typography variant="h2">  
            Program Name:
          </Typography>
        </Grid>
        <Grid item xs = {9}>
          <TextField required fullWidth label="Name" type="text" name="programName" value={formData.programName} onChange={handleInputChange} />
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
            Color:
        </Typography>
        </Grid>
        <Grid item xs = {9}>
          <Select className="tagContainer" value={colorData.color} onChange={handleColorInputChange} options={programColors}></Select>
        </Grid>

        <Grid item xs = {3}>
        <Typography variant="h2">  
            Tags:
        </Typography>
        </Grid>
        <Grid item xs = {9}>
          <Select isMulti className="tagContainer" value={tagData.tags} onChange={handleTagInputChange} options={allTags} styles={tagStyles}></Select>
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

export default Program;
