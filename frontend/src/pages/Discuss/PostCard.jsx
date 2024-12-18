import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Post } from "../../../firebaseFunctions/discussion";
import { getUserInfo } from "../../../firebaseFunctions/getUserInfo";
import { Comment } from "../../../firebaseFunctions/discussion";
import "./PostCard.css";

const PostCard = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

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

    const fetchUser = async () => {
      try {
        const user = await getUserInfo();
        setUser(user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
    fetchUser();
  }, [postId]);

  const toggleComments = async () => {
    if (!showComments) {
      try {
        const fetchedComments = await post.getCommentObjects();
        setComments(fetchedComments);
      } catch (err) {
        setError("Error fetching comments");
        console.error(err);
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = new Comment(newComment, user?.email, user?.displayName);
    await post.addComment(comment);

    setComments([...comments, comment]);
    setNewComment("");
  };

  if (loading) {
    return (
      <motion.div
        className="text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-center text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="post-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
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
            Downvote
          </button>
        </div>
      </div>

      <button className="button" onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      <AnimatePresence>
        {showComments && (
          <motion.div
            className="comments-section"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4>Comments</h4>
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
              <motion.div
                key={comment.id}
                className="comment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;
