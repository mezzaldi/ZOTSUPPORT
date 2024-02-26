// ProgramForm.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Select from 'react-select';
import axios from 'axios';

const Program = () => {
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
    color: ''
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
  const programColors = [ 
    //program color options
      {value:'#C41E3A', label:"Red"},
      {value:'#11007B', label:"Blue"}  
    ]

  const levelTags = [ 
  //load in only tags with the level category
  //note: must add new column for color (?)
    {value:'1', label:"Undergraduate", color: "#11007B"},
    {value:'2', label:"Graduate", color: "#11007B"},

  ]

  const subjectTags = [ 

    {value:'3', label:"Art", color: "#80CEAC"},
    {value:'4', label:"Biology", color: "#80CEAC"},

  ]

  const allTags = [
    { 
      label: "Level",
      options: levelTags
    },

    { 
      label: "Subject",
      options: subjectTags
    }

  ]

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
      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
          Program Name:
        </Typography>
        <TextField required fullWidth label="Name" type="text" name="programName" value={formData.programName} onChange={handleInputChange} />
      </div>

      <div className='formQuestion'>
        <Typography width='40%' variant="h2">  
            Description:
        </Typography>          
        <TextField fullWidth multiline rows={10} label="Description of program" name="description" value={formData.description} onChange={handleInputChange}/>
      </div>

      <div className='formQuestion'>
        <Typography variant="h2">  
          Header Image:
        </Typography>  
        <Button variant="outlined" component='label'> 
          Upload Image  
          <input type="file" hidden onChange={handleInputChange} value={formData.headerImage}/>
        </Button>
      </div>

      <div display={'flex'}>
      <Typography variant="h2">
            Color:
      </Typography>
      </div>

      <div className='h2container'>
      <Select className="tagContainer" value={colorData.color} onChange={handleColorInputChange} options={programColors}></Select>
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
        <Button variant="contained" type="submit">Publish new program page</Button>
      </div>
    </form>
    </div>
  );
};

export default Program;
