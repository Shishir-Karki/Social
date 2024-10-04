import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchProfileData = async (token, setUserData, setLoading, setError) => {
  try {
    const response = await fetch('https://social-xndp.onrender.com/auth/profile', {
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

const fetchUserPosts = async (token, setUserPosts) => {
  try {
    const response = await axios.get('https://social-xndp.onrender.com/posts/user-posts', {
      headers: { authToken: token },
    });
    setUserPosts(response.data.posts); 
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};

const ProfilePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null); // Track which post is being edited
  const [editedContent, setEditedContent] = useState('');  // Content for editing
  const token = localStorage.getItem('authToken');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    fetchProfileData(token, setUserData, setLoading, setError); 
    fetchUserPosts(token, setUserPosts); 
  }, [token]);

  const handleDelete = (postId) => {
    axios.delete(`https://social-xndp.onrender.com/posts/delete-post/${postId}`, {
      headers: { authToken: token }
    })
      .then(response => {
        setUserPosts(userPosts.filter(post => post._id !== postId)); // Remove deleted post from UI
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditedContent(post.content);
  };

  const handleUpdateSubmit = (postId) => {
    axios.put(`https://social-xndp.onrender.com/posts/update-post/${postId}`, { content: editedContent }, {
      headers: { authToken: token }
    })
      .then(response => {
        setUserPosts(userPosts.map(post => (post._id === postId ? response.data.post : post)));
        setEditingPostId(null); // Exit editing mode
      })
      .catch(error => console.error('Error updating post:', error));
  };

  if (loading) return <div className="text-center mt-12 text-lg text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-12 text-lg text-red-500">Error: {error}</div>;

  return (
    <div className="profile-page min-h-screen bg-gray-900 flex flex-col items-center ">
      <div className="w-full max-w-4xl bg-gray-800 p-10 rounded-lg shadow-xl">
        <div className="relative text-center">
          <div className="bg-gray-700 h-64 rounded-t-lg mb-[-5rem] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-semibold">
              Add a Cover Photo
            </div>
          </div>

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

          <div className="mt-6">
            <h2 className="text-4xl font-bold text-white">{userData.username}</h2>
            <p className="text-gray-400">@{userData.username}</p>
          </div>

          <div className="mt-8">
            <button className="px-8 py-3 text-white border border-gray-500 rounded-full hover:bg-gray-700 transition-colors duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

    
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md mt-10">
        <h3 className="text-2xl font-bold text-white mb-4">Your Posts</h3>
        <div className="space-y-6">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <div key={post._id} className="p-4 bg-gray-700 rounded-lg">
                <div className="text-gray-400 mb-2">
                  @{post.author.username} · {new Date(post.createdAt).toLocaleDateString()}
                </div>
                {editingPostId === post._id ? (
                  <div>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-24 p-3 bg-gray-600 text-white rounded-md mb-2"
                    />
                    <button onClick={() => handleUpdateSubmit(post._id)} className="mr-2 bg-blue-200 hover:bg-blue-700 text-black py-1 px-3 rounded-md">
                      Save
                    </button>
                    <button onClick={() => setEditingPostId(null)} className="bg-red-200 hover:bg-red-700 text-black py-1 px-3 rounded-md">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p className="text-white">{post.content}</p>
                )}

                <div className="flex mt-2">
                  <button onClick={() => handleEditClick(post)} className="mr-4 bg-green-200 hover:bg-yellow-700 text-black py-1 px-3 rounded-md">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="bg-red-200 hover:bg-red-700 text-black py-1 px-3 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">You haven't posted anything yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
