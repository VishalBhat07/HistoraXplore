import React, { useState } from 'react';
import { getUserInfo } from '../../../firebaseFunctions/getUserInfo'; // This function gets user info from Firebase Auth
import { Post } from '../../../firebaseFunctions/discussion'; // Import the Post class you provided
import './AddPost.css';  // Import the CSS file

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // State for toggling the form visibility

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await getUserInfo();
      if (user) {
        const { email, displayName } = user;
        const newPost = new Post(title, text, email, displayName);

        // Upload the post to db
        await newPost.updateInDatabase();

        setTitle('');
        setText('');
        alert('Post published successfully!');
      }
    } catch (err) {
      setError('Error while publishing post. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle visibility on button click
  };

  return (
    <div className="add-post-container">
      <h2>Create a Post</h2>
      
      {/* Button to toggle visibility */}
      <button className="toggle-btn" onClick={toggleFormVisibility}>
        {isFormVisible ? '-' : '+'}
      </button>

      {/* Conditional rendering of the form based on isFormVisible */}
      {isFormVisible && (
        <form id="post-form" onSubmit={handlePostSubmit}>
          <div>
            <label htmlFor="post-title">Post Title</label>
            <input
              type="text"
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="post-text">Post Content</label>
            <textarea
              id="post-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div>
            <button id="post-submit" type="submit" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default AddPost;
