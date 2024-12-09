import React from "react";
import PostItem from "../PostItem/PostItem";

const PostList = ({ posts, onVote }) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <PostItem key={post.id} post={post} onVote={onVote} />
    ))}
  </div>
);

export default PostList;
