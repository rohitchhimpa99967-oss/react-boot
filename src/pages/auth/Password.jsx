    import React from "react";
    import { Link } from "react-router-dom";

    const Password = () => {
        return (
            <div className="grid grid-cols-1 h-screen md:grid-cols-2">
                <div className="bg-[#ffffff] hidden md:flex  items-center justify-center">
                    <img
                        src="../src/assets/Images/undraw_secure-login_m11a-removebg-preview (1).png"
                        alt="Not found"
                    />
                </div>

                <div className="bg-[#ffffff] flex justify-center items-center  flex-col">
                    <div>
                        <img src="../src/assets/images/Logo.png" alt="not found"  class="w-[250px] sm:w-[130px]"  />
                    </div>
            
                    <div className="p-[50px] sm:p-[60px] rounded-md bg-slate-50 " style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}>
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
                                <Link to="/forgot-password">
                                <span className="text-blue-600 ">Forgot Password</span>
                            </Link>
                            </div>
                            
                        </div>
                        <button className="w-60 border-1 border-white bg-green-500 rounded-md text-white p-2 mt-5">Login</button>
                    </div>
                    <h1 className="text-2xl mt-5 font-semibold">|| Taste Maker ||</h1>
                </div>
            </div>
        );
    };

    export default Password;
