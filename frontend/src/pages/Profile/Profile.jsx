import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import heroImage from "../../assets/history.jpeg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseFunctions/firebaseConfig";
import { Post, Comment, getPosts } from "../../../firebaseFunctions/discussion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    toast.info("Edit profile feature coming soon!");
  };

  const fetchUserActivities = async (userEmail) => {
    try {
      const posts = await Post.getUserPosts(userEmail);
      setUserPosts(posts);

      const allPosts = await getPosts();
      const userComments = [];

      for (const post of allPosts) {
        const postInstance = new Post(
          post.title,
          post.text,
          post.emailId,
          post.username,
          post.id,
          post.votes
        );
        const postComments = await postInstance.getComments();
        const userPostComments = postComments.filter(
          (comment) => comment.emailId === userEmail
        );

        userPostComments.forEach((comment) => {
          userComments.push({
            ...comment,
            postTitle: post.title,
            postId: post.id,
          });
        });
      }
      setUserComments(userComments);
    } catch (error) {
      console.error("Error fetching user activities:", error);
      toast.error("Failed to fetch recent activities");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchUserActivities(currentUser.email);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error signing out");
      console.error("Sign out error", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await Post.deletePost(postId);
      setUserPosts(userPosts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const commentRef = doc(db, "Posts", postId, "comments", commentId);
      await deleteDoc(commentRef);
      setUserComments(
        userComments.filter((comment) => comment.id !== commentId)
      );
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  const renderRecentActivities = () => {
    const activities = [
      ...userPosts.map((post) => ({
        type: "post",
        id: post.id,
        title: post.title,
        text: post.text,
        date:
          post.createdAt ||
          new Date(parseInt(post.id.split("_")[0])).toISOString(),
      })),
      ...userComments.map((comment) => ({
        type: "comment",
        id: comment.id,
        postId: comment.postId,
        postTitle: comment.postTitle,
        text: comment.text,
        date: new Date().toISOString(),
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return activities.map((activity, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-start hover:shadow-lg transition duration-200"
      >
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-800">
            {activity.type === "post"
              ? `Post: ${activity.title}`
              : `Comment on: ${activity.postTitle}`}
          </p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {activity.text}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(activity.date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col items-end">
          {activity.type === "post" ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDeletePost(activity.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm mb-2 transition duration-150"
            >
              <i className="fa fa-trash"></i>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDeleteComment(activity.postId, activity.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm mb-2 transition duration-150"
            >
              <i className="fa fa-trash"></i>
            </motion.button>
          )}
        </div>
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-3 gap-6 p-8"
        >
          <div className="text-center">
            <motion.h2
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  repeat: Infinity,
                  duration: 1,
                },
              }}
              className="text-2xl font-bold text-gray-800"
            >
              Loading profile...
            </motion.h2>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-3 gap-6 p-8"
      >
        {/* Profile Overview Column */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 flex flex-col items-center justify-center space-y-6 border-r pr-6"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
              {user.photoURL ? (
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <i className="fa fa-user-circle w-24 h-24 text-blue-400"></i>
                </div>
              )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                onClick={handleEditProfile}
              >
                <i className="fa fa-edit w-5 h-5"></i>
              </motion.div>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold text-gray-800"
            >
              {user.displayName}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mt-2"
            >
              {user.email}
            </motion.p>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${user.profileCompleteness || 85}%` }}
            transition={{ duration: 0.5 }}
            className="w-full bg-gray-200 rounded-full h-2.5"
          >
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${user.profileCompleteness || 85}%` }}
            ></div>
          </motion.div>
          <p className="text-sm text-gray-600">
            Profile Completeness: {user.profileCompleteness || 85}%
          </p>
        </motion.div>

        {/* Profile Details Column */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 space-y-6 border-r px-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 flex items-center">
            <i className="fa fa-user mr-3 text-blue-500"></i> Personal
            Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <p className="text-gray-800 font-medium">{user.displayName}</p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Email Address
              </label>
              <p className="text-gray-800 font-medium flex items-center">
                <i className="fa fa-envelope mr-2 text-blue-500"></i>{" "}
                {user.email}
              </p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Member Since
              </label>
              <p className="text-gray-800 font-medium flex items-center">
                <i className="fa fa-calendar mr-2 text-blue-500"></i>
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity and Actions Column */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-span-1 space-y-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-3">
            Recent Activity
          </h3>

          <div className="max-h-96 overflow-y-auto">
            <AnimatePresence>{renderRecentActivities()}</AnimatePresence>
          </div>

          <div className="mt-6 space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEditProfile}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition flex items-center justify-center"
            >
              <i className="fa fa-edit mr-2"></i> Edit Profile
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition flex items-center justify-center"
            >
              <i className="fa fa-sign-out mr-2"></i> Sign Out
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <ToastContainer position="top-right" autoClose={5000} />
    </motion.div>
  );
};

export default Profile;
