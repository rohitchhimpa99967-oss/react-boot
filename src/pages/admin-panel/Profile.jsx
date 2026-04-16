

import React, { useEffect, useState } from "react";
import { baseUrl } from "../../services/BaseUrl";
import { useUserDetail } from "../hooks/useUserDetail";

export default function ProfilePage() {
  const { decode } = useUserDetail();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("/src/assets/images/photo1.jpg");

  const getUserByEmail = async (email) => {
    try {
      const res = await baseUrl.get("User");
      const allUsers = res.data.data;

      const matchedUser = allUsers.find(
        (u) => u.email?.toLowerCase() === email?.toLowerCase()
      );

      console.log(res);

      if (matchedUser) setUser(matchedUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!decode) return;

    const email =
      decode?.["username"] ||
      decode[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] ||
      decode.sub;

    if (email) getUserByEmail(email);
  }, [decode]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2 flex items-center gap-6">
            <img
              src={image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
            />

            {/* <label className="cursor-pointer bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label> */}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              value={user?.mobileNo || ""}
              readOnly
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none"
            />
          </div>

        </div>
      </div>
    </div>
  );
}