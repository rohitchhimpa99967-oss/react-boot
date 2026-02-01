import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "../../components/layout/NavBar1";
import DashBoardBar1 from "../../components/layout/DashBoardBar1";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Demo Vik",
    email: "demo@restaurant.com",
    phone: "9876543210",
  });

  const [image, setImage] = useState("/src/assets/images/photo1.jpg");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", profile);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Profile Image */}
          <div className="md:col-span-2 flex items-center gap-6">
            <img
              src={image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
            />

            <label className="cursor-pointer bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Role (Readonly) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              value="Manager"
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
