import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

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

  const filteredEvents = useMemo(() => {
    const userFiltered = user ? events.filter((event) => event.host !== user._id) : events;
    const now = Date.now();
    return userFiltered.filter((event) => {
      const eventDate = new Date(event.date).getTime();
      return filter === "upcoming" ? eventDate > now : eventDate < now;
    });
  }, [user, events, filter]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  }, [filteredEvents, sortOrder]);

  return (
    <div className="min-h-screen p-6 bg-[#F6DED8]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#B82132] border-b-2 border-[#D2665A] pb-2">
          Event Dashboard
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              className="px-4 py-2 rounded-lg border-2 border-[#B82132] bg-white text-gray-700 focus:outline-none focus:border-[#D2665A] transition-colors"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="upcoming">Upcoming Events</option>
              <option value="past">Past Events</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border-2 border-[#B82132] bg-white text-gray-700 focus:outline-none focus:border-[#D2665A] transition-colors"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#B82132] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-xl text-gray-600">No events found</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#B82132]">{event.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-3">{event.description}</p>
                  <div className="flex items-center text-sm text-[#D2665A]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {new Date(event.date).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#B82132] hover:bg-[#D2665A]"
            } text-white transition-colors`}
            disabled={currentPage === 1}
            onClick={() => fetchEvents(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page <span className="font-bold text-[#B82132]">{currentPage}</span> of{" "}
            <span className="font-bold text-[#B82132]">{totalPages}</span>
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#B82132] hover:bg-[#D2665A]"
            } text-white transition-colors`}
            disabled={currentPage === totalPages}
            onClick={() => fetchEvents(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;