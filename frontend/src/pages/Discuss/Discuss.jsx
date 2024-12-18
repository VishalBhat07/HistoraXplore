import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
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
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-purple-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Add Post Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AddPost />
        </motion.div>

        {/* Posts Section */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts == null ? (
            <motion.p
              className="text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              No posts yet. Be the first to contribute!
            </motion.p>
          ) : (
            posts.map((post) => (
              <motion.div key={post.id} variants={cardVariants}>
                <PostCard postId={post.id} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Discuss;
