import React from "react";

const Password = () => {
    return (
        <div className="grid grid-cols-1 h-screen md:grid-cols-2">
            <div className="bg-[#f0b04a] hidden md:flex  items-center justify-center">
                <img
                    src="../src/assets/Images/undraw_secure-login_m11a-removebg-preview (1).png"
                    alt="Not found"
                />
            </div>

            <div className="bg-[#f0b04a] flex justify-center items-center ">
                <div className="p-[50px] sm:p-[90px] rounded-md bg-slate-50 " style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}>
                    <h1 className="text-4xl font-bold mb-5 ">Super Admin</h1>

                    <div>
                        <h1 className="text-[20px]">Admin Id :- </h1>
                        <input
                            type="text"
                            className="text-red-500 border-[1px] rounded-md border-black w-60 p-1 "
                            placeholder="Enter Id"
                        />
                    </div>
                    <div className="mt-5">
                        <h1 className="text-[20px]">Password :- </h1>
                        <input
                            type="text"
                            className="text-red-500 border-[1px] rounded-md border-black w-60 p-1"
                            placeholder="Enter Password"
                        />
                        <br />
                        <div className="flex justify-end">
                            <a href="http://">
                            <span className="text-blue-600 ">Forgot Password</span>
                        </a>
                        </div>
                        
                    </div>
                    <button className="w-60 border-1 border-white bg-green-500 rounded-md text-white p-2 mt-5">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Password;
