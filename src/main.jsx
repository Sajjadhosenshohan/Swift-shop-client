import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routes';
import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Context from './Context/ContextProvider';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* context provider */}
    <Provider store={store}>
      <Context>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </Context>
    </Provider>
  </React.StrictMode>
)
