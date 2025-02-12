import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!Object.values(eventData).every(field => field.trim())) {
      setError('All fields are required!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to log in first.');
        return;
      }

      await axios.post('http://localhost:3000/api/event/', eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to create event. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#F6DED8]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 mt-8">
          <h1 className="text-4xl font-bold mb-6 text-[#B82132] border-b-2 border-[#D2665A] pb-3">
            Create New Event
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-[#F2B28C] text-[#B82132] rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-[#B82132] mb-2">
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
                placeholder="Enter event name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-medium text-[#B82132] mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
                placeholder="Describe your event..."
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-lg font-medium text-[#B82132] mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-lg font-medium text-[#B82132] mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
                placeholder="Enter event location"
              />
            </div>

            <div>
              <label htmlFor="maxLimit" className="block text-lg font-medium text-[#B82132] mb-2">
                Max Attendees
              </label>
              <input
                type="number"
                id="maxLimit"
                name="maxLimit"
                value={eventData.maxLimit}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
                placeholder="Enter maximum number of attendees"
                min="1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#B82132] hover:bg-[#D2665A] text-white font-bold rounded-lg transition-colors duration-300 mt-6"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;