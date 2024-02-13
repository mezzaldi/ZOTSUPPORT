// ProgramForm.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { SyntheticEvent } from 'react';
import { BaseSyntheticEvent } from 'react';
import Select from 'react-select';

import axios from 'axios';
import { instanceOf } from 'prop-types';

const Program = () => {
  const [formData, setFormData] = useState({
    programName: '',
    adminEmail: '',
    headerImage: '',
    description: '',
    //tags: null , // Set a default value
  });

  const [tagData, setTagData] = useState('');

  //This will update the input of program name, admin email, header image, and description on change
  const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //This will update the input of tags on change 
  const handleTagInputChange = (e) => {
    setTagData({tags: e})
  }

  //Input information from tags is concatenated with the rest of the form and logged in the console
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.tags = tagData.tags.push ( {value: 21, label: "Program" }) //Program tag added automatically here.
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
  }; 

  const tags = [

    {value:'1', label:"Undergraduate"},
    {value:'2', label:"Graduate"},
  ]

  

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
            Admins:
        </Typography>
        <TextField fullWidth label="UCI Email" type="text" name="adminEmail" value={formData.adminEmail} onChange={handleInputChange} />
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

      <div className="formQuestion">
      <Typography variant="h2">
            Tags:
      </Typography>
      <Select isMulti value={formData.tags} onChange={handleTagInputChange} options={tags}></Select>
      </div>


      <div>
        <Button variant="contained" type="submit">Publish new program page</Button>
      </div>
    </form>
    </div>
  );
};

export default Program;
