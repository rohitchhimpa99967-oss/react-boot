import React from 'react'

const ResetPassword = () => {
  return (
    
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
            <div className="bg-[#ffffff] hidden md:flex  items-center justify-center">
                <img
                    src="../src/assets/Images/png-transparent-reset-password-illustration-removebg-preview.png"
                    alt="Not found" width={"350px"}
                />
            </div>

            <div className="bg-[#ffffff] flex justify-center items-center  flex-col">
                <div>
                    <img src="../src/assets/images/Logo.png" alt="not found"  class="w-[250px] sm:w-[130px]"  />
                </div>
           
                <div className="p-[40px] sm:p-[60px] rounded-md bg-slate-50 " style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}>
                    <h1 className="text-4xl font-bold mb-5 ">Reset Password</h1>

                    <div>
                        <h1 className="text-[20px]">New Password :- </h1>
                        <input
                            type="text"
                            className="text-red-500 border-[1px] rounded-md border-black w-60 p-1 "
                            placeholder="Enter New Password"
                        />
                    </div>
                    <div className="mt-5">
                        <h1 className="text-[20px]">Confirm Password :- </h1>
                        <input
                            type="text"
                            className="text-red-500 border-[1px] rounded-md border-black w-60 p-1"
                            placeholder="Confirm Password"
                        />
                        <br />
                      
                        
                    </div>
                    <button className="w-60 border-1 border-white bg-green-500 rounded-md text-white p-2 mt-5">Login</button>
                </div>
                   <h1 className="text-2xl mt-5 font-semibold">|| Taste Maker ||</h1>
            </div>
        </div>


  )
}

export default ResetPassword
