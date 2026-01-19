import React from 'react'
import Btn1 from '../../components/buttons/Btn1'
import { useNavigate } from 'react-router-dom'

const UserCart = () => {

  const navigate = useNavigate()
  const handleBack = () => {
    navigate("/User-Home")
  }

  return (
    <div className='flex flex-col lg:flex-row justify-center gap-2 p-6 sm:p-6 lg:p-12 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen'>

      {/* LEFT : CART ITEMS */}
      <div
        className='w-full lg:w-[800px] bg-white border rounded-2xl flex flex-col overflow-hidden
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] transition-all duration-500'
      >

        {/* HEADER */}
        <div className='flex sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-b gap-4'>
          <div className='flex items-center gap-1'>
            <img src="../src/assets/images/Logo.png" alt="not found" width="80px"  className='sm:w-[120px]'/>
            <h1 className='font-bold text-xl sm:text-2xl'>Taste Maker</h1>
          </div>
          <div className="hover:scale-110 transition-all duration-300">
            <Btn1 btntxt={"Back"} onclick={handleBack} />
          </div>
        </div>

        {/* ITEM CARDS */}
        {[
          { img: "Pizzacart.jpg", title: "Pizza", desc: "Corn, Capsicum, Cheese", qty: 2, price: "$18" },
          { img: "DrinkCart.jpg", title: "Mojito", desc: "Mint leaves, Soda, Sugar", qty: 4, price: "$10" },
          { img: "RiceCart.webp", title: "Veg Biryani", desc: "Rice, Soya, Paneer, Lemon", qty: 1, price: "$25" },
        ].map((item, i) => (
          <div
            key={i}
            className='group flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-5 border-b gap-4
            hover:bg-gradient-to-r hover:from-gray-50 hover:to-white
            hover:-translate-y-1 transition-all duration-500'
          >
            <div className='flex items-center gap-4'>
              <div className='overflow-hidden rounded-xl'>
                <img
                  src={`../src/assets/images/${item.img}`}
                  alt="not found"
                  width="90px"
                  className='rounded-xl group-hover:scale-110 transition-transform duration-500'
                />
              </div>

              <div>
                <h1 className='font-semibold text-lg group-hover:text-red-500 transition'>{item.title}</h1>
                <p className=' text-sm text-gray-500 '>{item.desc}</p>
              </div>
            </div>
            

            <div className='flex items-center gap-6 mr-28 sm:mr-0'>

              <div className='flex items-center justify-between border rounded-md w-[90px] h-[36px] px-2
              hover:shadow-lg hover:scale-105 transition-all duration-300'>
                <button className="hover:text-red-600 transition"><i className="fa-solid fa-minus"></i></button>
                <span className='font-semibold'>{item.qty}</span>
                <button className="hover:text-green-600 transition"><i className="fa-solid fa-plus"></i></button>
              </div>
              <h1 className='font-semibold group-hover:text-green-600 transition'>{item.price}</h1>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT : BILL SUMMARY */}
      <div className='w-full lg:w-[360px]'>

        <div className='border rounded-2xl bg-white p-6
        hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]
        transition-all duration-500'>

          <h2 className='font-semibold text-lg border-b pb-3 mb-4'>
            Bill Summary
          </h2>

          <div className='flex justify-between text-sm mb-3'>
            <span className='text-gray-600'>Subtotal</span>
            <span className='font-medium'>₹300</span>
          </div>

          <div className='flex justify-between text-sm mb-4'>
            <span className='text-gray-600'>GST (5%)</span>
            <span className='font-medium'>₹15</span>
          </div>

          <div className='flex justify-between border-t pt-4'>
            <span className='font-semibold text-lg'>Total</span>
            <span className='font-semibold text-lg text-green-600'>₹315</span>
          </div>

          <div className='flex justify-end border-t pt-6 hover:scale-110 transition-all duration-300'>
            <Btn1 btntxt={"Place Order"} width='w-[150px]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCart
