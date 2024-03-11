import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import Select from 'react-select';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEventForm = ({ existingEventData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    description: '',
    startDate: dayjs(),
    endDate: dayjs(),
    recurringEndDate: dayjs(),
    tags: [],
    admins: [],
    recurring: 'None',
    requireRegistration: false,
    receiveRegistrationNotification: false
  });

  useEffect(() => {
    if (existingEventData) {
      setFormData({
        eventName: existingEventData.eventName || '',
        location: existingEventData.location || '',
        description: existingEventData.description || '',
        startDate: existingEventData.startDate ? dayjs(existingEventData.startDate) : dayjs(),
        endDate: existingEventData.endDate ? dayjs(existingEventData.endDate) : dayjs(),
        recurringEndDate: existingEventData.recurringEndDate ? dayjs(existingEventData.recurringEndDate) : dayjs(),
        tags: existingEventData.tags || [],
        admins: existingEventData.admins || [],
        recurring: existingEventData.recurring || 'None',
        requireRegistration: existingEventData.requireRegistration || false
      });
    }
  }, [existingEventData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/events/${existingEventData.id}`, formData);
      console.log('Event updated successfully:', response.data);
      navigate('/EventDashboard'); 
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('/api/tags');
        const tags = response.data.map(tag => ({ value: tag.tag_id, label: tag.tag_name }));
        setTagOptions(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/admins');
        const admins = response.data.map(admin => ({ value: admin.ucinetid, label: admin.ucinetid }));
        setAdminOptions(admins);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchTags();
    fetchAdmins();
  }, []);

  const [tagOptions, setTagOptions] = useState([]);
  const [adminOptions, setAdminOptions] = useState([]);

  const recurringOptions = [
    { value: 'None', label: 'None' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  // Define a custom style object for the Select components
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      fontFamily: 'Open Sans, sans-serif',
    }),
    menu: (provided) => ({
      ...provided,
      fontFamily: 'Open Sans, sans-serif',
    }),
    option: (provided) => ({
      ...provided,
      fontFamily: 'Open Sans, sans-serif',
    }),
  };

  const handleCancel = () => {
    navigate('/EventDashboard'); 
  };

  return (
    <div style={{ marginTop: '2rem', padding: '0 1.25rem' }}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="flex-start" justifyContent="space-between" style={{ marginBottom: '2rem' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Edit Event</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleCancel} color="error">
              Cancel Event
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">Event Name:</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                fullWidth
                label="Event Name"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">Location:</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">Start Date:</Typography>
            </Grid>
            <Grid item xs={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">End Date:</Typography>
            </Grid>
            <Grid item xs={9}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(newValue) => setFormData({ ...formData, endDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="flex-start">
            <Grid item xs={3}>
              <Typography variant="h6">Description:</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">Tags:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Select
                isMulti
                options={tagOptions}
                value={formData.tags.map(tag => ({ value: tag, label: tag }))}
                onChange={(selected) => setFormData({ ...formData, tags: selected.map(s => s.value) })}
                styles={customSelectStyles} 
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">Admins:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Select
                isMulti
                options={adminOptions}
                value={formData.admins.map(admin => ({ value: admin, label: admin }))}
                onChange={(selected) => setFormData({ ...formData, admins: selected.map(s => s.value) })}
                styles={customSelectStyles} 
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6">Recurring:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Select
                options={recurringOptions}
                value={recurringOptions.find(option => option.value === formData.recurring)}
                onChange={(selected) => setFormData({ ...formData, recurring: selected.value })}
              />
            </Grid>
          </Grid>

          {formData.recurring !== 'None' && (
            <Grid item container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography variant="h6">Recurring End Date:</Typography>
              </Grid>
              <Grid item xs={9}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Recurring End Date"
                    value={formData.recurringEndDate}
                    onChange={(newValue) => setFormData({ ...formData, recurringEndDate: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    disabled={formData.recurring === 'None'}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          )}

          <Grid item container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.requireRegistration}
                    onChange={handleCheckboxChange}
                    name="requireRegistration"
                  />
                }
                label="Require Registration"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2rem' }}>
            <Button variant="contained" type="submit">Update Event</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditEventForm;
