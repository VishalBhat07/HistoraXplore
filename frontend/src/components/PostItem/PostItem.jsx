import React, { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import CommentList from "../CommentList/CommentList";
import CreateComment from "../CreateComment/CreateComment";

const PostItem = ({ post, onVote }) => {
  const [showComments, setShowComments] = useState(false);

  const handleVote = async (direction) => {
    try {
      await fetch(`http://localhost:3000/api/posts/${post.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      onVote();
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <div className="text-sm text-gray-500">
            Posted on:{" "}
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : "Unknown Date"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote("up")}
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            <ArrowUpCircle size={24} />
          </button>
          <span className="font-bold text-lg">{post.votes}</span>
          <button
            onClick={() => handleVote("down")}
            className="text-gray-600 hover:text-red-500 transition-colors"
          >
            <ArrowDownCircle size={24} />
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{post.content}</p>

      <button
        onClick={() => setShowComments(!showComments)}
        className="text-blue-500 hover:text-blue-600 transition-colors"
      >
        {showComments
          ? "Hide Comments"
          : `Show Comments (${post.comments.length})`}
      </button>

      {showComments && (
        <div className="mt-4">
          <CreateComment postId={post.id} onCommentAdded={onVote} />
          <CommentList comments={post.comments} />
        </div>
      )}
    </div>
  );
};

export default PostItem;
