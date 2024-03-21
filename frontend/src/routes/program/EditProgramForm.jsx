import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Grid } from '@mui/material';
import Select from 'react-select';
import axios from 'axios';

const EditProgramForm = () => {
  const { program_id } = useParams();

  const [formData, setFormData] = useState({
    programName: '',
    headerImage: '',
    description: ''
  });

  const programColors = [
    { value: '#C41E3A', label: 'Red' },
    { value: '#11007B', label: 'Blue' },
    // Add more color options as needed
  ];
  
  const [colorData, setColorData] = useState({
    color: programColors[0] 
  });

  const [levelTags, setLevelTags] = useState([]);
  const [subjectTags, setSubjectTags] = useState([]);
  const [eventTypeTags, setEventTypeTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagData, setTagData] = useState({
    tags: [],
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

        // You might want to set selected tags and color here if they're part of programData
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };

    fetchProgram();
  }, [program_id]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/tags`);
        const fetchedTags = res.data;

        const newLevelTags = [];
        const newSubjectTags = [];
        const newEventTypeTags = [];

        fetchedTags.forEach(tag => {
          if (tag.tag_category === "Level") {
            newLevelTags.push({ value: tag.tag_id, label: tag.tag_name, color: tag.tag_color });
          } else if (tag.tag_category === "Subject") {
            newSubjectTags.push({ value: tag.tag_id, label: tag.tag_name, color: tag.tag_color });
          } else if (tag.tag_category === "Event Type") {
            newEventTypeTags.push({ value: tag.tag_id, label: tag.tag_name, color: tag.tag_color });
          }
        });

        setLevelTags(newLevelTags);
        setSubjectTags(newSubjectTags);
        setEventTypeTags(newEventTypeTags);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };
    getTags();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    tagData.tags.push({ value: 21, label: "Learning Support Program" });

    const postData = {
        name: formData.programName,
        description: formData.description,
        headerImage: formData.headerImage,
        color: colorData.color.value,
        tags: tagData.tags.map((tag) => String(tag.value)),
    };

    console.log(postData);

    try {
      const response = await axios.put(
        `http://localhost:3001/programs/${program_id}`,
        postData
    );
    
        console.log("Program updated successfully:", response.data);
        // You can handle the success response accordingly
    } catch (error) {
        console.error("Error updating program:", error);
        // Handle the error appropriately
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

  const tagStyles = {
    option: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
  };

  return (
    <div className='pageContent'>
      <div className="h1Container">
                <Typography variant="h1">Edit Program</Typography>
            </div>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems='center' paddingBottom='3rem' columnSpacing={2} rowSpacing={6}>
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
            <TextField fullWidth multiline rows={4} label="Description" name="description" value={formData.description} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h2">Header Image:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Button variant="outlined" component='label'>
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            {formData.headerImage && <img src={formData.headerImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }} />}
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h2">Color:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Select
              className="colorSelector"
              value={colorData.color}
              onChange={(selectedOption) => setColorData({ color: selectedOption })}
              options={programColors}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h2">Tags:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Select
              isMulti
              className="tagSelector"
              value={selectedTags}
              onChange={setSelectedTags}
              options={allTags}
              styles={tagStyles}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={2} marginTop="20px">
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Update Program
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete Program
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditProgramForm;

