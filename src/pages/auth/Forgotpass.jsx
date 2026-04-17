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
        email: data.email,
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
   
      <div className="bg-white hidden md:flex items-center justify-center">
        <img
          // src="/src/assets/Images/forgot-password-concept-illustration_114360-1095-removebg-preview.png"
         src="data:image/jpeg;base64,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"
          alt="Forgot Password"
          className="max-w-[90%]"
        />
      </div>

    
      <div className="bg-white flex justify-center items-center flex-col px-4">
    
        <div className="mb-4">
          <img
            // src="/src/assets/images/Logo.png"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcpYygu8PAVlYDukS-XCM2EOnl1DX-Qtil4NfC8DgwCr7UAD8S"

            alt="Logo"
            className="w-[200px] sm:w-[130px]"
          />
        </div>

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
