import React, { useState, useEffect } from 'react';
import PostList from '../../components/PostList/PostList';
import CreatePost from '../../components/CreatePost/CreatePost';

const Discuss = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discuss</h1>
      <CreatePost onPostCreated={fetchPosts} />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <PostList posts={posts} onVote={fetchPosts} />
    </div>
  );
};

export default Discuss;
