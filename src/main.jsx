import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebaseConfig.jsx'
import { store } from './store.jsx'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import Forgot from './Component/Forgot/Forgot.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import Setting from './Pages/Setting/Setting.jsx'
import User from './Pages/User/User.jsx'
import Friend from './Pages/Friend/Friend.jsx'
import ProfileUpload from './Component/ProfileUpload/ProfileUpload.jsx'
import Chat from './Component/Chat/Chat.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home> ,
  },
  {
    path: "/register",
    element:<Register></Register>,
  },
  {
    path: "/login",
    element:<Login></Login>,
  },
  {
    path: "/forgot",
    element:<Forgot></Forgot>,
  },
  {
    path: "/profile",
    element:<Profile></Profile>,
  },
  {
    path: "/setting",
    element:<Setting></Setting>,
  },
  {
    path: "/user",
    element:<User></User>,
  },
  {
    path: "/friend",
    element:<Friend></Friend>,
  },
  {
    path: "/profileupload",
    element:<ProfileUpload></ProfileUpload>
  },
  {
    path: "/chat",
    element:<Chat></Chat>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    
  </React.StrictMode>,
)
