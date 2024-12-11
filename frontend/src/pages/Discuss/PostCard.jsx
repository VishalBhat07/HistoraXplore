import React, { useState, useEffect } from "react";
import { Post } from "../../../firebaseFunctions/discussion"; // Import the Post class
import { getUserInfo } from "../../../firebaseFunctions/getUserInfo"; // Function to get the current user's info

const PostCard = ({ postId }) => {
  const [post, setPost] = useState(null); // State to store the post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await Post.getPost(postId); // Fetch the post by ID
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Error fetching post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const currentUser = await getUserInfo(); // Fetch the current user's info
        setUser(currentUser);
      } catch (err) {
        console.error("Could not fetch user info", err);
      }
    };

    fetchPost();
    fetchUser();
  }, [postId]);

  const handleUpvote = async () => {
    if (!user) {
      alert("You must be signed in to upvote!");
      return;
    }
    if (post) {
      await post.upvote(); // Upvote the post
      setPost(await Post.getPost(postId)); // Update the vote count locally
    }
  };

  const handleDownvote = async () => {
    if (!user) {
      alert("You must be signed in to downvote!");
      return;
    }
    if (post) {
      await post.downvote(); // Downvote the post
      setPost(await Post.getPost(postId)); // Update the vote count locally
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
        <span className="text-sm text-gray-500">{post.username}</span>
      </div>

      {/* Body Section */}
      <div className="mb-4">
        <p className="text-gray-700">{post.text}</p>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{post.emailId}</span>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{post.votes} Votes</span>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={handleUpvote}
          >
            Upvote
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleDownvote}
          >
            Downvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
