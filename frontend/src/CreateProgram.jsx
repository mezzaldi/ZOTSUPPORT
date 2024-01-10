// ProgramForm.js
import React, { useState } from 'react';
import axios from 'axios';

const Program = () => {
  const [formData, setFormData] = useState({
    programName: '',
    adminEmail: '',
    headerImage: '',
    description: '',
    tags: 'general', // Set a default value
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5125/api/program', formData);
      console.log('Program created successfully:', response.data);
      // You can handle the success response accordingly
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle the error appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '1400px', margin: 'auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Program Name:
          <input type="text" name="programName" value={formData.programName} onChange={handleInputChange} />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Admin Email(UCI email):
          <input type="text" name="adminEmail" value={formData.adminEmail} onChange={handleInputChange} />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Program Header Image:
          <input type="text" name="headerImage" value={formData.headerImage} onChange={handleInputChange} />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Tags:
          <select name="tags" value={formData.tags} onChange={handleInputChange}>
            <option value="general">General</option>
            <option value="english">English</option>
            <option value="history">History</option>
            <option value="math">Math</option>
            <option value="biology">Biology</option>
          </select>
        </label>
      </div>

      <div>
        <button type="submit">Publish new program page</button>
      </div>
    </form>
  );
};

export default Program;
