import React from 'react';
import { FaLocationArrow } from 'react-icons/fa'; // Import the icon from react-icons
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
 const navigate = useNavigate();
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Redirect to a new page with the location as query parameters
          navigate(`/store?lat=${latitude}&lng=${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Handle error (e.g., show a message to the user)
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        {/* Design heading and description */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Discover Your Next Destination</h1>
          <p className="text-lg text-white">Search for a location to find the best places to visit and explore.</p>
        </div>
        
        {/* Search Box */}
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for a location"
            className="flex-1 p-2 text-lg border-none rounded-l-lg focus:outline-none"
          />
          <button
          onClick={handleLocateMe}
          className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
            <FaLocationArrow className="mr-2" />
            Locate Me
          </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
