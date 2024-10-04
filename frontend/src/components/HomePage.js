import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaComment } from 'react-icons/fa';  // Import the heart and comment icons

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState({});  // Track comments for each post
  const token = localStorage.getItem('authToken'); // Assuming the token represents the user's unique ID

  // Fetch posts from the backend
  useEffect(() => {
    axios.get('https://social-xndp.onrender.com/posts/getpost')
      .then(response => setPosts(response.data.posts))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Create a new post
  const handlePostSubmit = (e) => {
    e.preventDefault();
  
    if (newPost.trim()) {
      axios.post('https://social-xndp.onrender.com/posts/createPost', { content: newPost }, {
        headers: {
          authToken: token,
        }
      })
      .then(response => {
        const newPostWithAuthor = response.data.post;
        setPosts([newPostWithAuthor, ...posts]);  
        setNewPost('');  
      })
      .catch(error => console.error('Error posting:', error));
    }
  };

  
  const handleLikePost = (postId) => {
    axios.put(`https://social-xndp.onrender.com/posts/like/${postId}`, {}, {
      headers: { authToken: token }
    })
      .then(response => {
        const updatedPost = response.data.post;
        setPosts(posts.map(post => post._id === postId ? updatedPost : post)); // Update post in state
      })
      .catch(error => console.error('Error liking post:', error));
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();

    if (newComment[postId]?.trim()) {
      axios.post(`https://social-xndp.onrender.com/posts/comment/${postId}`, { content: newComment[postId] }, {
        headers: { authToken: token }
      })
      .then(response => {
        const updatedPost = response.data.post;
        setPosts(posts.map(post => post._id === postId ? updatedPost : post)); // Update post in state
        setNewComment(prevComments => ({ ...prevComments, [postId]: '' }));  // Clear the comment input for that post
      })
      .catch(error => console.error('Error commenting:', error));
    }
  };

  // Handle comment input change
  const handleCommentChange = (postId, value) => {
    setNewComment(prevComments => ({ ...prevComments, [postId]: value }));  // Track comment per post
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

              <div className="flex items-center mt-2">
               
                <button
                  onClick={() => handleLikePost(post._id)}
                  className={`mr-4 flex items-center ${
                    post.likes.includes(token) ? 'text-red-500' : 'text-gray-400'
                  } hover:text-red-600 transition duration-300`}
                >
                  <FaHeart className="mr-1" /> {post.likes.length}
                </button>

               
                <button className="flex items-center text-gray-400 hover:text-green-400 transition duration-300">
                  <FaComment className="mr-1" /> {post.comments.length}
                </button>
              </div>

            
              <div className="mt-4">
                <form onSubmit={(e) => handleCommentSubmit(e, post._id)} className="flex">
                  <input
                    type="text"
                    value={newComment[post._id] || ''}  // Get the comment value for the specific post
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow p-2 bg-gray-800 text-white rounded-l-md focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-md"
                  >
                    Comment
                  </button>
                </form>

                <div className="mt-4 space-y-2">
                    {post.comments.map((comment, index) => (
                    <div key={index} className="text-gray-400">
                        <strong>@{comment?.author?.username || 'Unknown User'}</strong>: {comment.content}
                    </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
