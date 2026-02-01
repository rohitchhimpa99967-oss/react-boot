import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Btn1 from "../../components/buttons/Btn1";
import { baseUrl } from "../../services/BaseUrl";

const Forgotpass = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  
  const handleGetOtp = async (data) => {
    try {
     
      const response = await baseUrl.post("Auth/forgot-password", {
        email: data.email,
      });
      console.log("OTP sent to:", data.email);
      setStep("otp"); 
    } catch (error) {
      console.error(error?.response?.data?.message || "Error sending OTP");
    }
  };


  const handleSubmitOtp = async (data) => {
    try {
      
      const response = await baseUrl.post("Auth/verify-otp", {
        otp: data.otp,
        email: data.email, // keep email in form hidden or state
      });
      console.log("OTP verified!");
      if (response) {
        navigate("/reset-password",{state:data?.email});
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
      {/* LEFT IMAGE */}
      <div className="bg-white hidden md:flex items-center justify-center">
        <img
          src="/src/assets/Images/forgot-password-concept-illustration_114360-1095-removebg-preview.png"
          alt="Forgot Password"
          className="max-w-[90%]"
        />
      </div>

      {/* RIGHT FORM */}
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
        <div
          className="p-[35px] sm:p-[50px] rounded-md bg-slate-50 w-full max-w-md"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <h1 className="text-3xl font-bold mb-5 text-center">
            Forgot Password
          </h1>

          {step === "email" && (
            <form onSubmit={handleSubmit(handleGetOtp)}>
              <div className="mb-4">
                <label className="text-lg block mb-1">Email Id</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  })}
                  className="border rounded-md border-black w-full p-2"
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
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
              <Btn1 btntxt="Get OTP" width="w-full" />
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleSubmit(handleSubmitOtp)}>
              <div className="mb-4">
                <label className="text-lg block mb-1">OTP</label>
                <input
                  type="text"
                  {...register("otp", {
                    required: "OTP is required",
                    minLength: {
                      value: 4,
                      message: "OTP must be at least 4 digits",
                    },
                  })}
                  className="border rounded-md border-black w-full p-2"
                  placeholder="Enter OTP"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>
              <Btn1 btntxt="Submit OTP" width="w-full" />
            </form>
          )}
        </div>

        <h1 className="text-xl mt-4 font-semibold">|| Taste Maker ||</h1>
      </div>
    </div>
  );
};

export default Forgotpass;
