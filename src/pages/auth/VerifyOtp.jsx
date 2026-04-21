import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/BaseUrl";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromRegister = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailFromRegister,
    },
  });

const onSubmit = async (values) => {
  try {
    const payload = {
      email: values.email.trim(), 
      otp: values.otp.toString().trim(),
    };

    console.log("VERIFY OTP PAYLOAD 👉", payload);

    const response = await baseUrl.post("auth/verify-otp", payload);

    alert("OTP Verified Successfully ✅");
    navigate("/");
  } catch (error) {
    console.log("VERIFY OTP ERROR 👉", error.response?.data);
    alert(error.response?.data?.message || "Invalid or expired OTP");
  }
};


  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/src/assets/Images/undraw_secure-login_m11a-removebg-preview (1).png"
          alt="OTP"
          className="max-w-[90%]"
        />
      </div>

      <div className="flex justify-center items-center flex-col px-4 bg-white">
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
          <h1 className="text-3xl font-bold mb-6 text-center">
            Verify OTP
          </h1>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-lg mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full border border-black rounded-md p-2 bg-gray-100"
              readOnly
            />
          </div>

          {/* OTP */}
          <div className="mb-6">
            <label className="block text-lg mb-1">OTP</label>
            <input
              type="text"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be 4 digits",
                },
              })}
              placeholder="Enter OTP"
              className="w-full border border-black rounded-md p-2"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 rounded-md text-white p-2 font-semibold hover:bg-green-600 transition"
          >
            Verify OTP
          </button>
        </form>

        <h1 className="text-xl mt-5 font-semibold">|| Taste Maker ||</h1>
      </div>
    </div>
  );
};

export default VerifyOtp;
