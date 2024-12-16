import React, { useState, useEffect } from "react";
import { Post } from "../../../firebaseFunctions/discussion"; // Import the Post class
<<<<<<< HEAD
import { getUserInfo } from "../../../firebaseFunctions/getUserInfo"; // Function to get the current user's info
=======
import { Comment } from "../../../firebaseFunctions/discussion"; // Import the Comment class
import "./PostCard.css"; // Import the CSS file
>>>>>>> 4435fd8 (added comments)

const PostCard = ({ postId }) => {
  const [post, setPost] = useState(null); // State to store the post data
  const [comments, setComments] = useState([]); // Comments state
  const [newComment, setNewComment] = useState(""); // New comment input state
  const [showComments, setShowComments] = useState(false); // Toggle state for comments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
<<<<<<< HEAD
  const [user, setUser] = useState(null); // State to store user info
=======
>>>>>>> 4435fd8 (added comments)

  // Fetch post on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await Post.getPost(postId);
        setPost(fetchedPost);
      } catch (err) {
        setError("Error fetching post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    const fetchUser = async () => {
      try {
        const currentUser = await getUserInfo(); // Fetch the current user's info
        setUser(currentUser);
      } catch (err) {
        console.error("Could not fetch user info", err);
      }
    };

    async function getComments() {
      if (post) {
        try {
          const fetchComments = await post.getComments();
          console.log(fetchComments);
        } catch {
          console.log("Error fetching comments", err);
        }
      } else {
        console.warn("Post is null, cannot fetch comments");
      }
    }

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
=======
    fetchPost();
  }, [postId]);

  const toggleComments = async () => {
    if (!showComments) {
      // Fetch comments only when opening the section
      try {
        const fetchedComments = await post.getCommentObjects();
        setComments(fetchedComments);
      } catch (err) {
        setError("Error fetching comments");
        console.error(err);
      }
>>>>>>> 4435fd8 (added comments)
    }
    setShowComments(!showComments);
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = new Comment(newComment, post.emailId, post.username); // Create a new Comment object
    await post.addComment(comment); // Add the comment to the database

    setComments([...comments, comment]); // Update comments locally
    setNewComment(""); // Clear the input
  };

  const handleUpvoteComment = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    await comment.upvote(commentId);

    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === commentId ? { ...c, votes: c.votes + 1 } : c
      )
    );
  };

  const handleDownvoteComment = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    await comment.downvote(commentId);

    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === commentId ? { ...c, votes: c.votes - 1 } : c
      )
    );
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
<<<<<<< HEAD
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
=======
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
          <button className="button upvote" onClick={() => post.upvote()}>
            Upvote
          </button>
          <button className="button downvote" onClick={() => post.downvote()}>
>>>>>>> 4435fd8 (added comments)
            Downvote
          </button>
        </div>
      </div>

      {/* Toggle Comments Section */}
      <div>
        <button className="button" onClick={toggleComments}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <h4>Comments</h4>
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="add-comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p className="comment-text">{comment.text}</p>
              <div className="comment-footer">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-votes">{comment.votes} Votes</span>
                <button
                  className="button upvote"
                  onClick={() => handleUpvoteComment(comment.id)}
                >
                  Upvote
                </button>
                <button
                  className="button downvote"
                  onClick={() => handleDownvoteComment(comment.id)}
                >
                  Downvote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
