import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditProgramForm = ({ existingProgramData }) => {
  const [formData, setFormData] = useState({
    programName: '',
    headerImage: null,
    description: '',
    tags: [],
    color: ''
  });
  const navigate = useNavigate();

  const handleColorChange = (event) => {
    setFormData({ ...formData, color: event.target.value });
  };

  const handleTagChange = (event) => {
    setFormData({ ...formData, tags: event.target.value });
  };

  const tagOptions = [
    { value: 'tag1', label: 'Tag 1' },
    { value: 'tag2', label: 'Tag 2' },
    { value: 'tag3', label: 'Tag 3' },
    // Add more tag options as needed
  ];

  useEffect(() => {
    if (existingProgramData) {
      setFormData({
        programName: existingProgramData.programName || '',
        headerImage: existingProgramData.headerImage || null,
        description: existingProgramData.description || '',
        tags: existingProgramData.tags || [],
        color: existingProgramData.color || ''
      });
    }
  }, [existingProgramData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'headerImage') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCancel = () => {
    navigate('/ProgramDashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call logic here
  };

  return (
    <div className='editProgramForm' style={{ marginTop: '30px', padding: '0 20px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="flex-start" justifyContent="space-between" style={{ marginBottom: '20px' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Edit Program</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleCancel} color="error">
              Cancel Action
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <Typography variant="h6">Program Name:</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <TextField
                required
                fullWidth
                label="Program Name"
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={2}>
              <Typography variant="h6" style={{ paddingTop: '8px' }}>Description:</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <TextField
                required
                fullWidth
                multiline
                rows={5}
                label="Program Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <Typography variant="h6">Header Image:</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" hidden name="headerImage" onChange={handleInputChange} />
              </Button>
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <Typography variant="h6">Color:</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <FormControl fullWidth>
                <InputLabel id="color-select-label">Select Color</InputLabel>
                <Select
                  labelId="color-select-label"
                  id="color-select"
                  value={formData.color}
                  label="Select Color"
                  onChange={handleColorChange}
                >
                  {/* Color options */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <Typography variant="h6">Tags:</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <FormControl fullWidth>
                <InputLabel id="tags-select-label">Select Tags</InputLabel>
                <Select
                  multiple
                  value={formData.tags}
                  onChange={handleTagChange}
                  labelId="tags-select-label"
                  id="tags-select"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {tagOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

        </Grid>

        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '30px' }}>
          <Grid item>
            <Button variant="contained" type="submit">
              Publish Program
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => { /* handle delete logic */ }} style={{ borderColor: 'red', color: 'red', background: 'white' }}>
              Delete Program
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditProgramForm;
