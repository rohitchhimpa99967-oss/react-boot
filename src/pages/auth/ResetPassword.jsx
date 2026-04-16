

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Btn1 from "../../components/buttons/Btn1";
import { baseUrl } from "../../services/BaseUrl";

const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const userEmail = location.state;

  console.log(userEmail);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    data.email = userEmail;
    try {
      const response = baseUrl.post("/Auth/reset-password", data);
      if (response) {
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      console.log("Reset Password Data:", data);
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
      <div className="bg-white hidden md:flex items-center justify-center">
        <img
          src="/src/assets/Images/forgot-password-concept-illustration_114360-1095-removebg-preview.png"
          alt="Reset Password"
          className="max-w-[90%]"
        />
      </div>

      <div className="bg-white flex justify-center items-center flex-col px-4">
        {/* LOGO */}
        <div className="mb-4">
          <img
            src="/src/assets/images/Logo.png"
            alt="Logo"
            className="w-[200px] sm:w-[130px]"
          />
        </div>

        {/* CARD */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[40px] sm:p-[50px] rounded-md bg-slate-50 w-full max-w-md"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Reset Password
          </h1>

          {/* NEW PASSWORD */}
          <div className="mb-4">
            <label className="text-lg block mb-1">Enter New Password</label>
            <input
              type="password"
              {...register("newPassword", {
                required: "Confirm your password",
                minLength: {
                  value: 6,
                  message: "Enter min 6 char",
                },
              })}
              className="border rounded-md border-black w-full p-2"
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6">
            <label className="text-lg block mb-1">Confirm Password</label>
            <input
              type="confirmPassword"
              {...register("confirmpassword", {
                required: "Confirm your password",
                minLength: {
                  value: 6,
                  message: "Enter min 6 char",
                },
              })}
              className="border rounded-md border-black w-full p-2"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <Btn1 btntxt="Reset Password" width="w-full" />
        </form>

        <h1 className="text-xl mt-4 font-semibold">|| Taste Maker ||</h1>
      </div>
    </div>
  );
};

export default ResetPassword;
