import React, { useState, useEffect } from "react";
import { Post } from "../../../firebaseFunctions/discussion"; // Import the Post class
import { getUserInfo } from "../../../firebaseFunctions/getUserInfo";
import "./PostCard.css"; // Import the CSS file

const PostCard = ({ postId }) => {
  const [post, setPost] = useState(null); // State to store the post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [currentUser, setCurrentUser] = useState(null);

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

    // async function fetchUserInfo() {
    //   try {
    //     const user = await getUserInfo();

    //     setCurrentUser(user);

    //   } catch {
    //     console.error("Could not fetch current user info");
    //   }
    // }

    fetchPost();
    // fetchUserInfo();
  }, []);

  const handleUpvote = async () => {
    if (post) {
      await post.upvote(); // Upvote the post
      setPost(await Post.getPost(postId)); // Update the vote count locally
    }
  };

  const handleDownvote = async () => {
    if (post) {
      await post.downvote(); // Downvote the post
      setPost(await Post.getPost(postId)); // Update the vote count locally
    }
  };

  const handleDelete = async () => {
    if (post) {
      await post.deleteFromDatabase();
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="post-username">{post.username}</span>

          {/* {currentUser && post && currentUser.email == post.emailid && (
            <button className="button" onClick={handleDelete}>
              Delete
            </button>
          )} */}
        </div>
      </div>
      <div className="post-card-body">
        <p className="post-content">{post.text}</p>
      </div>
      <div className="post-card-footer">
        <span className="post-email">{post.emailId}</span>
        <div className="vote-section">
          <span className="vote-count">{post.votes} Votes</span>
          <button className="button upvote" onClick={handleUpvote}>
            Upvote
          </button>
          <button className="button downvote" onClick={handleDownvote}>
            Downvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
