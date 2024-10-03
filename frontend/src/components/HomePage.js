import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const token = localStorage.getItem('authToken'); 

  // Fetch posts from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/posts/getpost')
      .then(response => setPosts(response.data.posts))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
  
    if (newPost.trim()) {
      axios.post('http://localhost:5000/posts/createPost', { content: newPost }, {
        headers: {
          authToken: token, 
        }
      })
      .then(response => {
        console.log('New post response:', response.data);
  
        // Add the newly created post (with populated author) to the existing posts
        const newPostWithAuthor = response.data.post;
        setPosts([newPostWithAuthor, ...posts]);  // Add new post to the top of the list
        setNewPost('');  // Clear the input field
      })
      .catch(error => console.error('Error posting:', error));
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">What's happening?!</h2>
        
        <form onSubmit={handlePostSubmit} className="mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write something..."
            className="w-full h-32 p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none mb-4 resize-none"
          />
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md"
          >
            Post
          </button>
        </form>

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post._id} className="p-4 bg-gray-700 rounded-lg">
              <div className="text-gray-400 mb-2">
                @{post.author.username} · {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <p className="text-white">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
