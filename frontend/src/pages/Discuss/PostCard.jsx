import React, { useState, useEffect } from 'react';
import { Post } from '../../../firebaseFunctions/discussion';  // Import the Post class
import './PostCard.css';  // Import the CSS file

const PostCard = ({ postId }) => {
  const [post, setPost] = useState(null);  // State to store the post data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');  // Error state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await Post.getPost(postId);  // Fetch the post by ID
        setPost(fetchedPost);
      } catch (err) {
        setError('Error fetching post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpvote = async () => {
    if (post) {
      await post.upvote();  // Upvote the post
      setPost({ ...post, votes: post.votes + 1 });  // Update the vote count locally
    }
  };

  const handleDownvote = async () => {
    if (post) {
      await post.downvote();  // Downvote the post
      setPost({ ...post, votes: post.votes - 1 });  // Update the vote count locally
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h3 className="post-title">{post.title}</h3>
        <span className="post-username">{post.username}</span>
      </div>
      <div className="post-card-body">
        <p className="post-content">{post.text}</p>
      </div>
      <div className="post-card-footer">
        <span className="post-email">{post.emailId}</span>
        <div className="vote-section">
          <span className="vote-count">{post.votes} Votes</span>
          <button className="vote-button upvote" onClick={handleUpvote}>Upvote</button>
          <button className="vote-button downvote" onClick={handleDownvote}>Downvote</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
