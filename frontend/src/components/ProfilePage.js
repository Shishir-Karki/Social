import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fetchProfileData = async () => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch('http://localhost:5000/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) return <div className="text-center mt-12 text-lg text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-12 text-lg text-red-500">Error: {error}</div>;

  return (
    <div className="profile-page min-h-screen bg-gray-900 flex justify-center ">
      {/* Increased width and height of the profile box */}
      <div className="w-full max-w-4xl bg-gray-800 p-10 rounded-lg shadow-xl">
        <div className="relative text-center">
          {/* Larger Cover Photo */}
          <div className="bg-gray-700 h-64 rounded-t-lg mb-[-5rem] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-semibold">
              {/* Add cover photo text */}
              Add a Cover Photo
            </div>
          </div>

          {/* Larger Profile Image */}
          <div
            className="relative inline-block mt-[-6rem] w-40 h-40"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-gray-800 object-cover transition-all duration-300 ease-in-out"
            />
            {isHovered && (
              <div className="absolute top-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-full cursor-pointer transform hover:scale-110 transition-transform">
                ✏️
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="mt-6">
            <h2 className="text-4xl font-bold text-white">{userData.username}</h2>
            <p className="text-gray-400">@{userData.username}</p> {/* Displaying username */}
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8">
            <button className="px-8 py-3 text-white border border-gray-500 rounded-full hover:bg-gray-700 transition-colors duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
