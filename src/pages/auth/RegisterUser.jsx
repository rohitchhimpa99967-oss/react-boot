import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  });

  const onSubmit = async (values) => {
    try {
      const response = await baseUrl.post("User", values);

      navigate("/verify-otp", {
        state: { email: values.email },
      });
    } catch (error) {
      alert(error?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
      <div className="bg-white hidden md:flex items-center justify-center">
        <img
          src="/src/assets/Images/undraw_secure-login_m11a-removebg-preview (1).png"
          alt="Register Illustration"
          className="max-w-[90%]"
        />
      </div>

      <div className="bg-white flex justify-center items-center flex-col px-4">
        <div className="mb-4">
          <img
            src="/src/assets/images/Logo.png"
            alt="Logo"
            className="w-[200px] sm:w-[130px]"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm p-8 rounded-md bg-slate-50"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

          <div className="mb-4">
            <label className="block text-lg mb-1">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "First name is required",
              })}
              placeholder="Enter  Name"
              className="w-full border border-black rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-1">MObile No.</label>
            <input
              type="text"
              {...register("mobileNo", {
                required: "Mobile no. is required",
              })}
              placeholder="Enter Mobile No."
              className="w-full border border-black rounded-md p-2"
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNo.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter Email"
              className="w-full border border-black rounded-md p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              placeholder="Enter Password"
              className="w-full border border-black rounded-md p-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mb-4">
            <Link to="/">
              <span className="text-blue-600 text-sm cursor-pointer">
                Already have an account?
              </span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 rounded-md text-white p-2 font-semibold hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>

        <h1 className="text-xl mt-5 font-semibold">|| Taste Maker ||</h1>
      </div>
    </div>
  );
}
