import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Customer_Dashboard.jsx' 
//import App from './Mechanic_Dashboard.jsx'
//import App from './Admin_Dashboard.jsx' 
//import App from './SignupSigninApp.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>,
)


