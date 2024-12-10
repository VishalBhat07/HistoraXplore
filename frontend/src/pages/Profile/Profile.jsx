import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import heroImage from "../../assets/history.jpeg"; // Assuming you still want the background image
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Monitor auth state and update user details
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handle Sign Out
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

  // Handle Edit Profile
  const handleEditProfile = () => {
    // Show toast immediately
    toast.info("Edit profile feature coming soon!");
    // Additional logic for editing profile can be added here if needed
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4"
      >
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-3 gap-6 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Loading profile...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-3 gap-6 p-8">
        {/* Profile Overview Column */}
        <div className="col-span-1 flex flex-col items-center justify-center space-y-6 border-r pr-6">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <i className="fa fa-user-circle w-24 h-24 text-blue-400"></i>
                </div>
              )}
              <div
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                onClick={handleEditProfile}
              >
                <i className="fa fa-edit w-5 h-5"></i>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{user.displayName}</h2>
            <p className="text-gray-600 mt-2">{user.email}</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${user.profileCompleteness}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">Profile Completeness: {user.profileCompleteness}%</p>
        </div>

        {/* Profile Details Column */}
        <div className="col-span-1 space-y-6 border-r px-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 flex items-center">
            <i className="fa fa-user mr-3 text-blue-500"></i> Personal Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              <p className="text-gray-800 font-medium">{user.displayName}</p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email Address</label>
              <p className="text-gray-800 font-medium flex items-center">
                <i className="fa fa-envelope mr-2 text-blue-500"></i> {user.email}
              </p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Member Since</label>
              <p className="text-gray-800 font-medium flex items-center">
                <i className="fa fa-calendar mr-2 text-blue-500"></i>
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity and Actions Column */}
        <div className="col-span-1 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-3">Recent Activity</h3>

          {user.recentActivity?.map((activity, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-700">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.date).toLocaleDateString()}
              </p>
            </div>
          ))}

          <div className="mt-6 space-y-4">
            <button
              onClick={handleEditProfile}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition flex items-center justify-center"
            >
              <i className="fa fa-edit mr-2"></i> Edit Profile
            </button>

            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition flex items-center justify-center"
            >
              <i className="fa fa-sign-out mr-2"></i> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container to display notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Profile;
