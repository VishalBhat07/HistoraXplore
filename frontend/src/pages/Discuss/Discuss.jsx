import React, { useState, useEffect } from "react";
import PostList from "../../components/PostList/PostList";
import CreatePost from "../../components/CreatePost/CreatePost";

const Discuss = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    }
  };

  return (
    <div className="about-us">
      {/* Hero Section */}
      <div className="hero">
        <h1>Discuss</h1>
        <p>Engage with the community by creating posts and sharing ideas!</p>
      </div>

      {/* Create Post */}
      <div className="section">
        <CreatePost onPostCreated={fetchPosts} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* Post List */}
      <div className="section">
        <PostList posts={posts} onVote={fetchPosts} />
      </div>
    </div>
  );
};

export default Discuss;