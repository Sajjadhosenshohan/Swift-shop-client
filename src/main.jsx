import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routes';
import {RouterProvider} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster  position="top-right"/>
    <RouterProvider router={router} />
  </React.StrictMode>
)
