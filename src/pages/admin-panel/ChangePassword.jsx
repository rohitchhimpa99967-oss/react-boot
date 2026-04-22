
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../services/BaseUrl";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const newPassword = watch("newPassword", "");

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await baseUrl.post("auth/reset-password", {
        token,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully!");
      reset();
      navigate("/profile");
    } catch (error) {
      const msg = error.response?.data?.message;
      toast.error(msg || "Something went wrong.");
    }
  };

  const inputClass =
    "w-full border rounded-lg px-4 py-2 bg-gray-50 outline-none focus:ring-2 focus:ring-green-400 pr-10";

  const EyeToggle = ({ show, toggle }) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      {show ? "🙈" : "👁"}
    </button>
  );

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="w-32 bg-green-500 rounded-md text-white p-2 font-semibold hover:bg-green-600 transition"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold ms-6 text-gray-800">
            Change Password
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className={inputClass}
              />
              <EyeToggle show={showNew} toggle={() => setShowNew(!showNew)} />
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConf ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) =>
                    val === newPassword || "Passwords do not match",
                })}
                className={inputClass}
              />
              <EyeToggle show={showConf} toggle={() => setShowConf(!showConf)} />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-44 bg-green-500 rounded-md text-white p-2 font-semibold hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;