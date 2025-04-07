import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false); // Close menu on search
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo on Left */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition">
          MovieDB
        </Link>

        {/* Right Section: Hamburger and Search */}
        <div className="flex items-center space-x-4">
          

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              className="p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 md:w-48"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Hamburger Menu Button (Mobile Only) */}

          <button
            className="md:hidden text-white focus:outline-none z-20"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links (Centered on Desktop, Slide-in on Mobile) */}
        <div
          className={`${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static top-0 left-0 w-3/4 md:w-auto h-screen md:h-auto bg-gray-800 md:bg-transparent transition-transform duration-300 ease-in-out md:flex md:space-x-6 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 p-6 md:p-0 mt-16 md:mt-0">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/top-rated"
              className="text-white hover:text-gray-300 transition text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Top Rated
            </Link>
            <Link
              to="/upcoming"
              className="text-white hover:text-gray-300 transition text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Upcoming
            </Link>
          </div>
        </div>

        {/* Overlay for Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-0"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;