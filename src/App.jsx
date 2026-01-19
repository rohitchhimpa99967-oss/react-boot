import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router-dom'

import Password from './pages/auth/Password'
import Forgotpass from './pages/auth/Forgotpass'
import ResetPassword from './pages/auth/ResetPassword'
import UserLanding from './pages/user-pannel/UserLanding'
import UserHome from './pages/user-pannel/UserHome'
import UserCart from './pages/user-pannel/UserCart'
import LandingPage from './pages/auth/LandingPage'


function App() {
  const [count, setCount] = useState(0)

  return (
     <>
     
     {/* <Routes>
       <Route path='/' element={<Password/>}/>
       <Route path='/forgot-password' element={<Forgotpass/>}/>
       <Route path='/reset-password' element={<ResetPassword/>}/>


     </Routes> */}

     

      {/* these are the admin pannel   */}

       {/* <LandingPage/>  

      <Password/>
      <Forgotpass/>
      <ResetPassword/>  */}



     {/* these are the user pages */}

  
     {/* <Routes>
       <Route path='/' element={<UserHome/>}/>
       <Route path='/User-cart' element={<UserCart/>}/>
       <Route path='/User-Home' element={<UserHome/>}/>
     </Routes>  */}

    {/* <UserLanding/> 

    
     <UserHome/> 

    <UserCart/> */}

   

     </>
  )
}

export default App
