import React from 'react'
import Btn1 from '../../components/buttons/Btn1'
import { useNavigate, useNavigation } from 'react-router-dom'


const Forgotpass = () => {

    const navigate = useNavigate()
    const handleSumbit = ()=>{
        navigate("/reset-password")
    }
  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
            <div className="bg-[#ffffff] hidden md:flex  items-center justify-center">
                <img
                    src="../src/assets/Images/forgot-password-concept-illustration_114360-1095-removebg-preview.png"
                    alt="Not found"
                />
            </div>

            <div className="bg-[#ffffff] flex justify-center items-center  flex-col">
                <div>
                    <img src="../src/assets/images/Logo.png" alt=""  class="w-[250px] sm:w-[130px]"  />
                </div>
           
                <div className="p-[35px] sm:p-[50px] rounded-md bg-slate-50 " style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"}}>
                    <h1 className="text-4xl font-bold mb-5 ">Forgot Password</h1>

                    <div>
                        <h1 className="text-[20px]">Admin Id :- </h1>
                        <input
                            type="text"
                            className="text-red-500 border-[1px] rounded-md border-black w-72 p-1 "
                            placeholder="Enter Id"
                        />
                       <div className='mt-2'>
                         <Btn1 btntxt={'Get OTP'} />
                       </div>

                    </div>
                    <div className="mt-5">
                        <h1 className="text-[20px]">OTP :- </h1>
                        <input
                            type="text"
                            className="text-red-500 border-[1px] rounded-md border-black w-72 p-1"
                            placeholder="Enter OTP"
                        />
                        <br />
                      
                        
                    </div>
                      <div className='mt-2'><Btn1 btntxt={'Sumbit'} width='w-[100%]' onclick={handleSumbit}/></div>
                </div>
                   <h1 className="text-2xl mt-4 font-semibold">|| Taste Maker || </h1>
            </div>
        </div>
  )
}

export default Forgotpass
