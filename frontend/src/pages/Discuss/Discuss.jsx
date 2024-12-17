import React, { useState, useEffect } from "react";
import AddPost from "./AddPost";
import PostCard from "./PostCard";
import { getPosts } from "../../../firebaseFunctions/discussion";

function Discuss() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posted = await getPosts();
        if (posted) {
          // Sort posts by upvotes in descending order
          posted.sort((a, b) => b.votes - a.votes);
          setPosts(posted);
        }
      } catch (error) {
        console.error("Could not fetch posts", error);
      }
    }
    fetchPosts();
  }, [posts]);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(to bottom right, #ff7e5f, #feb47b)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Add Post Section */}
        <div className="mb-8">
          <AddPost />
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          {posts == null ? (
            <p className="text-center text-gray-600">
              No posts yet. Be the first to contribute!
            </p>
          ) : (
            posts.map((post) => <PostCard key={post.id} postId={post.id} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Discuss;
