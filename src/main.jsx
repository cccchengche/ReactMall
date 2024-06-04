import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { RouterProvider } from 'react-router';
import router from './router';
import { ServiceProvider } from './contexts/ServiceContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ServiceProvider>
        <RouterProvider router={router}>
        <App />
      </RouterProvider>
      </ServiceProvider>
  </React.StrictMode>,
)
