import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/app.css";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { BrowserRouter } from 'react-router-dom'
import App from './App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <ToastContainer position="top-right" autoClose={2000} />
    <App />
   </BrowserRouter>
)
