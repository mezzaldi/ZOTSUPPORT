// ProgramForm.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { MenuItem } from '@mui/base';
import { InputLabel } from '@mui/material';

import axios from 'axios';

const Program = () => {
  const [formData, setFormData] = useState({
    programName: '',
    adminEmail: '',
    headerImage: '',
    description: '',
    //tags: null , // Set a default value
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/programs', formData);
      console.log('Program created successfully:', response.data);
      // You can handle the success response accordingly
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle the error appropriately
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


      <div>
        <Button variant="contained" type="submit">Publish new program page</Button>
      </div>
    </form>
    </div>
  );
};

export default Program;
