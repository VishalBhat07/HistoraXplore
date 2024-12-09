import React, { useState } from "react";

const CreateComment = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        setContent("");
        onCommentAdded();
      }
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write a comment..."
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CreateComment;
