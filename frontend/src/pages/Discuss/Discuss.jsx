import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import AddPost from "./AddPost";
import PostCard from "./PostCard";
import { getPosts } from "../../../firebaseFunctions/discussion";

function Discuss() {
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [keywordInput, setKeywordInput] = useState(""); // For user input
  const [keywords, setKeywords] = useState([]); // Array to hold user-added keywords

  // Fetch posts on initial render
  useEffect(() => {
    async function fetchPosts() {
      try {
        const posted = await getPosts();
        if (posted) {
          posted.sort((a, b) => b.votes - a.votes); // Sort posts by upvotes
          setPosts(posted);
          setFilteredPosts(posted); // Initialize filtered posts with all posts
        }
      } catch (error) {
        console.error("Could not fetch posts", error);
      }
    }
    fetchPosts();
  }, []);

  // Update filteredPosts whenever keywords or posts change
  useEffect(() => {
    if (!posts) return;

    if (keywords.length === 0) {
      setFilteredPosts(posts); // Show all posts if no keywords
    } else {
      const filtered = posts.filter((post) =>
        post.keywords && post.keywords.some((postKeyword) =>
          keywords.includes(postKeyword.toLowerCase())
        )
      );
      setFilteredPosts(filtered);
    }
  }, [keywords, posts]);

  // Add keyword to array (and avoid duplicates)
  const addKeyword = () => {
    const keyword = keywordInput.trim().toLowerCase();
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setKeywordInput(""); // Clear input field
    }
  };

  // Remove a keyword
  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((k) => k !== keywordToRemove));
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1, scale: 1, transition: { duration: 0.5 },
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

        {/* Keyword Input Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Filter by Keywords:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter a keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={addKeyword}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Add
            </button>
          </div>

          {/* Display Added Keywords */}
          <div className="flex flex-wrap gap-2 mt-3">
            {keywords.map((k, index) => (
              <span
                key={index}
                className="flex items-center bg-purple-100 px-3 py-1 rounded-full text-sm text-purple-700"
              >
                {k}
                <button
                  onClick={() => removeKeyword(k)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Posts Section */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts == null || filteredPosts.length === 0 ? (
            <motion.p
              className="text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              No posts found. Try a different keyword or add a new post!
            </motion.p>
          ) : (
            filteredPosts.map((post) => (
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
