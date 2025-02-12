import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyEvents = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEvent, setEditEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', date: '', location: '', maxLimit: '' });
  
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchUser();
    fetchMyEvents();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchMyEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/event/my-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };

  const handleEdit = (event) => {
    setEditEvent(event._id);
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      maxLimit: event.maxLimit,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/api/event/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditEvent(null);
      fetchMyEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Events</h1>
      {user && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow-sm">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      )}

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="p-4 border border-gray-300 rounded shadow-sm">
              {editEvent === event._id ? (
                <div className="space-y-2">
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 w-full" />
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2 w-full" />
                  <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="border p-2 w-full" />
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="border p-2 w-full" />
                  <input type="number" value={formData.maxLimit} onChange={(e) => setFormData({ ...formData, maxLimit: e.target.value })} className="border p-2 w-full" />
                  <button onClick={() => handleUpdate(event._id)} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  <button onClick={() => setEditEvent(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Location: {event.location}</p>
                  <p className="text-sm text-gray-500">Max Limit: {event.maxLimit}</p>
                  <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
