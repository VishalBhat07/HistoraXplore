import React, { useState } from "react";
import { getUserInfo } from "../../../firebaseFunctions/getUserInfo"; // This function gets user info from Firebase Auth
import { Post } from "../../../firebaseFunctions/discussion"; // Import the Post class you provided

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // State for toggling the form visibility

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await getUserInfo();
      if (user) {
        const { email, displayName } = user;
        const newPost = new Post(title, text, email, displayName);

        // Upload the post to db
        await newPost.updateInDatabase();

        setTitle("");
        setText("");
        alert("Post published successfully!");
      }
    } catch (err) {
      setError("Please sign in to publish a post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle visibility on button click
  };

  return (
    <div className="p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Create a Post</h2>
        <button
          className="px-4 py-2 text-lg font-semibold bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 focus:ring focus:ring-orange-300 transition"
          onClick={toggleFormVisibility}
        >
          {isFormVisible ? "Close" : "New Post"}
        </button>
      </div>

      {isFormVisible && (
        <form className="space-y-6" onSubmit={handlePostSubmit}>
          <div>
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-gray-700"
            >
              Post Title
            </label>
            <input
              type="text"
              id="post-title"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="post-text"
              className="block text-sm font-medium text-gray-700"
            >
              Post Content
            </label>
            <textarea
              id="post-text"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-lg shadow-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 transition"
              }`}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default AddPost;
