import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    maxLimit: '',
  });
  
  const [error, setError] = useState('');
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!eventData.name || !eventData.description || !eventData.date || !eventData.location || !eventData.maxLimit) {
      setError('All fields are required!');
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        setError('You need to log in first.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:3000/api/event/', 
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.response?.data?.msg || 'Failed to create event. Please try again.');
    }
  };
  
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      
      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter event name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter event description"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-lg">Date & Time</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-lg">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter event location"
          />
        </div>

        <div>
          <label htmlFor="maxLimit" className="block text-lg">Max Attendees</label>
          <input
            type="number"
            id="maxLimit"
            name="maxLimit"
            value={eventData.maxLimit}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter max limit of attendees"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
