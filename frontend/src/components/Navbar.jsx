import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiCalendar, FiPlus, FiUser } from 'react-icons/fi';
import {useState} from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-[#B82132] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FiCalendar className="text-[#F2B28C]" />
            EventHub
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="hover:text-[#F2B28C] transition-colors flex items-center gap-1">
              <FiCalendar /> Dashboard
            </Link>
            <Link to="/create-event" className="hover:text-[#F2B28C] transition-colors flex items-center gap-1">
              <FiPlus /> Create Event
            </Link>
            <Link to="/my-events" className="hover:text-[#F2B28C] transition-colors flex items-center gap-1">
              <FiUser /> My Events
            </Link>
            {token && (
              <button onClick={handleLogout} className="hover:text-[#F2B28C] transition-colors flex items-center gap-1">
                <FiLogOut /> Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/dashboard" className="block py-2 hover:text-[#F2B28C]">
              Dashboard
            </Link>
            <Link to="/create-event" className="block py-2 hover:text-[#F2B28C]">
              Create Event
            </Link>
            <Link to="/my-events" className="block py-2 hover:text-[#F2B28C]">
              My Events
            </Link>
            {token && (
              <button onClick={handleLogout} className="block py-2 hover:text-[#F2B28C] w-full text-left">
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;