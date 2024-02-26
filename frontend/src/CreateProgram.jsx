import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import Select from 'react-select';
import axios from 'axios';

const CreateProgram = () => {
  const [formData, setFormData] = useState({
    programName: '',
    adminEmail: '',
    headerImage: '', // Change to empty string
    description: '',
    tags: [],
    color: { value: '#007bff', label: 'Blue' }
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFileChange = (e) => {
    // Extract the filename from the uploaded file
    const filename = e.target.files[0].name;
    setFormData({ ...formData, headerImage: filename }); // Set the filename
  }

  const handleTagInputChange = (tags) => {
    setFormData({ ...formData, tags });
  }

  const handleColorInputChange = (color) => {
    setFormData({ ...formData, color });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        name: formData.programName,
        description: formData.description,
        adminemail: formData.adminEmail,
        headerImage: formData.headerImage, // Send the filename
        color: formData.color.value,
        tags: formData.tags.map(tag => tag.label),
      };

      const response = await axios.post('http://localhost:3001/programs', requestData);
      console.log('Program created successfully:', response.data);
    } catch (error) {
      console.error('Error creating program:', error);
    }
  };

  const levelTags = [ 
    { value: '1', label: 'Undergraduate', color: '#11007B' },
    { value: '2', label: 'Graduate', color: '#11007B' },
  ];

  const subjectTags = [ 
    { value: '3', label: 'Art', color: '#80CEAC' },
    { value: '4', label: 'Biology', color: '#80CEAC' },
  ];

  const allTags = [
    { label: 'Level', options: levelTags },
    { label: 'Subject', options: subjectTags },
  ];

  const programColors = [
    { value: '#007bff', label: 'Blue' },
    { value: '#C41E3A', label: 'Red' },
    // Add more color options as needed
  ];

  const tagStyles = {
    option: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
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
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </div>

        <div>
          <Typography variant="h2">
            Color:
          </Typography>
        </div>

        <div className='h2container'>
          <Select className="tagContainer" value={formData.color} onChange={handleColorInputChange} options={programColors}></Select>
        </div>

        <div>
          <Typography variant="h2">
            Tags:
          </Typography>
        </div>

        <div className='h2container'>
          <Select isMulti className="tagContainer" value={formData.tags} onChange={handleTagInputChange} options={allTags} styles={tagStyles}></Select>
        </div>

        <div>
          <Button variant="contained" type="submit">Publish new program page</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProgram;
