import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Grid } from '@mui/material';
import Select from 'react-select';
import axios from 'axios';

const EditProgramForm = () => {
  const { program_id } = useParams();
  console.log("program_id:", program_id);

  const programColors = [
    { value: '#C41E3A', label: "Red" },
    { value: '#11007B', label: "Blue" }
  ];

  const [formData, setFormData] = useState({
    programName: '',
    headerImage: '',
    description: ''
  });

  const [tagData, setTagData] = useState({
    tags: []
  });

  const [colorData, setColorData] = useState({
    color: programColors[0] // Default color
  });

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/programs/${program_id}`);
        const programData = response.data;

        setFormData({
          programName: programData.name,
          headerImage: programData.headerImage,
          description: programData.description
        });

        setColorData({ color: programColors.find(color => color.value === programData.color) });
        setTagData({
          tags: programData.tags.map(tag => ({
            value: tag,
            label: allTags.find(category => category.options.some(option => option.value === tag)).options.find(option => option.value === tag).label
          }))
        });
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };

    fetchProgram();
  }, [program_id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, headerImage: reader.result });
      e.target.value = '';
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTagInputChange = (e) => {
    setTagData({ tags: e });
  };

  const handleColorInputChange = (e) => {
    setColorData({ color: e });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const putData = {
      name: formData.programName,
      description: formData.description,
      headerImage: formData.headerImage,
      color: colorData.color.value,
      tags: tagData.tags.map(tag => tag.value)
    };

    try {
      const response = await axios.put(`http://localhost:3001/programs/${program_id}`, putData);
      console.log('Program updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/programs/${program_id}`);
      console.log('Program deleted successfully');
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const levelTags = [
    { value: '1', label: "Undergraduate", color: "#11007B" },
    { value: '2', label: "Graduate", color: "#11007B" }
  ];

  const subjectTags = [
    { value: '3', label: "Art", color: "#80CEAC" },
    { value: '4', label: "Biology", color: "#80CEAC" }
  ];

  const allTags = [
    {
      label: "Level",
      options: levelTags
    },
    {
      label: "Subject",
      options: subjectTags
    }
  ];

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
        <Grid container align-items='center' paddingBottom='3rem' columnSpacing={2} rowSpacing={6}>
          <Grid item xs={3}>
            <Typography variant="h2">Program Name:</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField required fullWidth label="Name" type="text" name="programName" value={formData.programName} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h2">Description:</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField fullWidth multiline rows={10} label="Description of program" name="description" value={formData.description} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h2">Header Image:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Button variant="outlined" component='label'>
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            {formData.headerImage && <Typography>Image uploaded successfully!</Typography>}
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h2">Color:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Select className="tagContainer" value={colorData.color} onChange={handleColorInputChange} options={programColors}></Select>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h2">Tags:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Select isMulti className="tagContainer" value={tagData.tags} onChange={handleTagInputChange} options={allTags} styles={tagStyles}></Select>
          </Grid>

        </Grid>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" type="submit">Update program</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete program</Button>
          </Grid>
        </Grid>

      </form>
    </div>
  );
};

export default EditProgramForm;
