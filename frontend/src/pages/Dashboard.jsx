import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]); // Store all events
  const [filter, setFilter] = useState("upcoming"); // Upcoming or past events
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch user info (if logged in)
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
      console.error("User not logged in");
    }
  };

  // Fetch paginated events
  const fetchEvents = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/event?page=${page}&limit=10`);
      if (data.events) {
        setEvents(data.events);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchEvents();
  }, []);

  // Filter out user's own events (if logged in)
  const filteredEvents = useMemo(() => {
    const userFiltered = user ? events.filter((event) => event.host !== user._id) : events;
    const now = Date.now();
    return userFiltered.filter((event) => {
      const eventDate = new Date(event.date).getTime();
      return filter === "upcoming" ? eventDate > now : eventDate < now;
    });
  }, [user, events, filter]);

  // Sort events by name
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  }, [filteredEvents, sortOrder]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Filters & Sort */}
      <div className="flex items-center space-x-4 mb-6">
        <select
          className="p-2 border border-gray-300 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="upcoming">Upcoming Events</option>
          <option value="past">Past Events</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      {/* Event List */}
      {loading ? (
        <p>Loading events...</p>
      ) : sortedEvents.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <div key={event._id} className="p-4 border border-gray-300 rounded shadow-sm">
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="p-2 border rounded"
          disabled={currentPage === 1}
          onClick={() => fetchEvents(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="p-2 border rounded"
          disabled={currentPage === totalPages}
          onClick={() => fetchEvents(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
