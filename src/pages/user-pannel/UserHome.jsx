import React, { useState } from 'react'
import Btn1 from '../../components/buttons/Btn1'
import { useNavigate } from 'react-router-dom'

const UserHome = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleCart = () => {
    navigate("/User-cart")
  }

  return (
    <>
      <div className="flex relative min-h-screen">

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-black text-white px-3 py-2 rounded 
          hover:bg-gray-800 hover:scale-110 transition-all duration-200"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <div
          className={`
            w-40 h-screen bg-slate-100 border-r-2 border-white p-5 text-center 
            absolute top-0 left-0 z-40 transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0
          `}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 20px"
          }}
        >
          <img src="../src/assets/images/Logo.png" alt="not found" />

          <div className='mt-20 flex flex-col gap-6'>
            {["Home", "About", "Contact", "Rate Us"].map((item, i) => (
              <div
                key={i}
                className='border-b-[1.5px] cursor-pointer px-2 py-2 rounded
                hover:bg-black hover:text-white hover:translate-x-2 transition-all duration-300'
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 gap-10 p-4 sm:ms-40">

          {/* Banner */}
          <div className='w-full h-52 sm:h-72 rounded-xl overflow-hidden group'>
            <img
              src="../src/assets/images/Userdemo-home.avif"
              alt="not found"
              className="w-full h-full object-cover rounded-xl 
              group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Search + Button */}
          <div className='flex sm:flex-row justify-between items-center gap-6'>
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className='border-b-2 ml-3 w-15 sm:w-64 focus:outline-none focus:border-black transition'
                placeholder='Search'
              />
            </div>

            <div className="hover:scale-110 hover:shadow-xl transition-all duration-300">
              <Btn1 btntxt={"Go To Cart"} width='w-[120px]' onclick={handleCart} />
            </div>
          </div>

          {/* Categories */}
          <div className='grid grid-cols-2 sm:flex gap-6 justify-items-center'>
            {["Pizza", "Soft drinks", "Ice Cream", "Sweets"].map((item, i) => (
              <div
                key={i}
                className='w-[180px] sm:w-[240px] h-[200px] border rounded-xl text-center overflow-hidden group
                cursor-pointer hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500'
              >
                <div className="overflow-hidden">
                  <img
                    src="../src/assets/images/UserDemo1.jpg"
                    alt=""
                    className="w-full h-[150px] rounded-t-xl object-cover 
                    group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h1 className='mt-2 font-bold group-hover:text-red-500 transition'>
                  {item}
                </h1>
              </div>
            ))}
          </div>

          {/* Pizza Section */}
          <div className='w-full bg-slate-100 rounded-xl p-5'>
            <h1 className='text-2xl font-bold mb-6'>Pizza :-</h1>

            <div className='flex flex-wrap justify-center gap-6'>
              {[399, 119, 229].map((price, i) => (
                <div
                  key={i}
                  className='w-[300px] h-[300px] border rounded-xl text-center p-2 overflow-hidden group
                  cursor-pointer hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-500'
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src="../src/assets/images/UserDemo1.jpg"
                      alt=""
                      className="w-full h-[150px] object-cover 
                      group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <h1 className='mt-2 font-bold group-hover:text-red-600 transition'>Corn Pizza</h1>
                  <h1>Price: {price}</h1>
                  <h1>Cheese, Corn, Tomato</h1>

                  <button
                    className='bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg mt-3
                    hover:from-black hover:to-gray-800 hover:scale-110 transition-all duration-300'
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default UserHome
