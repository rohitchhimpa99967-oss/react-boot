import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { baseUrl } from "../../services/BaseUrl";

const Password = () => {
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
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState("");

  const onSubmit = async (values) => {
    try {
      const response = await baseUrl.post("auth/login", values);
      console.log(response.data.data);
      const token =response?.data?.data.token;
   
     localStorage.setItem("token", response?.data?.data);
      localStorage.setItem("role", res.data.data.role);
      navigate("/");
     
    } catch (error) {
      setLoginError(
        error?.response?.data?.message || "Invalid email or password",
      );
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
      <div className="bg-[#ffffff] hidden md:flex items-center justify-center">
        <img
          // src="/src/assets/Images/undraw_secure-login_m11a-removebg-preview (1).png"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQKZD_nr9zKeU8yARdsjjnj8Sn2Y97GIGyxlM-5KeGtlYXckI5n"
          
          alt="Secure Login"
        />
      </div>

      <div className="bg-[#ffffff] flex justify-center items-center flex-col">
        <div>
          <img
            // src="/src/assets/images/Logo.png"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcpYygu8PAVlYDukS-XCM2EOnl1DX-Qtil4NfC8DgwCr7UAD8S"
            alt="Logo"
            className="w-[250px] sm:w-[130px]"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[50px] sm:p-[60px] rounded-md bg-slate-50"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <h1 className="text-4xl font-bold mb-5">Super Admin</h1>

          <div>
            <label className="text-[20px] block mb-1">Admin Id :-</label>
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Enter Id"
              className="text-red-500 border border-black rounded-md w-60 p-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label className="text-[20px] block mb-1">Password :-</label>
            <div className="relative w-60">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter Password"
                className="text-red-500 border border-black rounded-md w-full p-1 pr-8"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="flex justify-end mt-1">
              <Link to="/forgetpassword">
                <span className="text-blue-600 text-sm cursor-pointer">
                  Forgot Password
                </span>
              </Link>
              
            </div>
          </div>
          <div>
            {loginError && (
              <p className="text-red-600 text-sm mb-3 text-center">
                {loginError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-60 bg-green-500 rounded-md text-white p-2 mt-5 font-semibold hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        <h1 className="text-2xl mt-5 font-semibold">|| Taste Maker ||</h1>
      </div>
    </div>
  );
};

export default Password;
