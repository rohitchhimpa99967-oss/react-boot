import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";
import DeleteButton from "../../components/buttons/DeleteButton";
import { toast } from "react-toastify";
import { useUserDetail } from "../../pages/hooks/useUserDetail";

export default function StaffPage() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const { decode, role } = useUserDetail();
  console.log("decoded token:", decode);
  const isAdmin = role === 1;
  console.log(isAdmin);

  const staffGet = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await baseUrl.get("user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
      toast.error("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };
  const ROLE_MAP = {
    1: "Admin",
    2: "Chef",
    3: "Server",
    4: "Receptionist",
  };

  const onDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await baseUrl.delete(`User/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff((prev) => prev.filter((s) => s.id !== id));
      toast.success("Staff member deleted ✅");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    staffGet();
  }, []);

  return (
    <div className="p-5 max-w-full">
  
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Staff</h1>

        {isAdmin && (
          <button
            onClick={() => navigate("/create-user")}
            className="flex w-[180px] items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
          >
            <i className="fa-solid fa-plus"></i>
            Add Staff
          </button>
        )}
      </div>

      
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading staff...</p>
        </div>
      ) : staff.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <i className="fa-solid fa-users text-6xl text-gray-300 mb-4"></i>
          <p className="text-xl text-gray-500">No staff members found</p>
          <p className="text-gray-400 mt-2">
            Add your first staff member to get started
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
   
          <div className="hidden sm:grid grid-cols-5 bg-green-50 text-green-700 font-semibold text-sm px-6 py-3 border-b border-green-100">
            <span>#</span>
            <span>Name</span>
            <span>Email</span>
            <span>Mobile</span>
            <span>Job</span>
            {isAdmin && <span></span>}
          </div>

     
          {staff.map((member, index) => (
            <div
              key={member.id}
              className={`grid grid-cols-1 sm:grid-cols-5 ${
                isAdmin ? "sm:grid-cols-6" : "sm:grid-cols-5"
              } items-center gap-2 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition`}
            >
              
              <span className="hidden sm:block text-gray-400 text-sm font-medium">
                {index + 1}
              </span>

             
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {member.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  {member.name}
                </span>
              </div>

             
              <span className="text-gray-500 text-sm truncate">
                {member.email}
              </span>

              
              <span className="text-gray-600 text-sm">
                {member.mobileNo || "—"}
              </span>
              <span
                className={`inline-flex items-center w-fit gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  member.role
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {ROLE_MAP[member.role] || "Unknown"}
              </span>
             
              {isAdmin && (
                <div className="flex justify-end">
                  <DeleteButton onClick={() => onDelete(member.id)} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
