import React, { children, useEffect, useState } from 'react'
import { BrowserRouter ,Navigate,Route , Routes } from 'react-router-dom'
import Authentication from './pages/authentication'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import apiClient from './lib/api-client'
import { GETUSERDATA_ROUTE } from './utils/constants'
import Loading from './components/ui/spinner'
// import axios from 'axios'

function App() {

  const PrivateRoute = ({children})=>{
    const {userInfo} =useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth"/>;    
  }

  const AuthRoute = ({children})=>{
    const {userInfo} =useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/chat"/> : children;    
  }

  const {userInfo, setUserInfo} = useAppStore();
  const [loading,setLoading] = useState(true);
  // const getuserdata_url = import.meta.env.VITE_getUser_URL

  
  useEffect(()=>{
    const getUserData = async()=>{
      try {
        const response = await apiClient.get(GETUSERDATA_ROUTE,{withCredentials:true});

        if(response.status === 200 && response.data.id){
          setUserInfo(response.data);
        }
        else{
          setUserInfo(undefined)
        }
        
      } catch (error) {
        setUserInfo(undefined)
      }finally{
        setLoading(false)
      }
    }
    if(!userInfo){
      getUserData();
    } else{
      setLoading(false)
    }

  },[userInfo, setUserInfo]);

  if(loading){
    return <Loading/>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Authentication/></AuthRoute>}/>
        <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path="*" element={<Navigate to="/auth"/>}/> 
        
        {/* <Route path='/auth' element={<Authentication/>}/> */}
        {/* <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="*" element={<Navigate to="/auth"/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
