import React from 'react';

const CommentList = ({ comments }) => (
  <div className="mt-4 space-y-3">
    {comments.map((comment) => (
      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
        <p className="text-gray-700">{comment.content}</p>
        <div className="text-sm text-gray-500 mt-1">
          {new Date(comment.created_at).toLocaleString()}
        </div>
      </div>
    ))}
  </div>
);

export default CommentList;