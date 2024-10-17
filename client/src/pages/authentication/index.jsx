import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import show from '@/assets/show.png'
import hide from '@/assets/hide.png'
import login from '@/assets/login2.png'
import React, { useState } from 'react'
// import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import apiClient from '@/lib/api-client';
import { SIGNUP_ROUTE, LOGIN_ROUTE } from '@/utils/constants';


function Authentication() {

  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const signupurl = import.meta.env.VITE_SIGNUP_URL;
  // const loginurl = import.meta.env.VITE_LOGIN_URL;

  const validatesignup = () => {

    if (!signupEmail) {
      toast.error("Email is required");
      return false;
    }
    if (!signupPassword) {
      toast.error("Password is required");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Please re-enter the password");
      return false;
    }
    if (signupPassword !== confirmPassword) {
      toast.error("Please enter same password");
      return false;
    }
    return true;
  }
  const validatelogin = () => {
    if (!loginEmail) {
      toast.error("Email is required");
      return false;
    }
    if (!loginPassword) {
      toast.error("Password is required");
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    if (validatelogin()) {
      const response = await apiClient.post(LOGIN_ROUTE, { email: loginEmail, password: loginPassword }, { withCredentials: true });
      try {
        console.log(response);

        if (response.status === 200 && response.data.user.id) {
          setUserInfo(response.data.user);
          // Redirect based on whether the user's profile is set up
          if (response.data.user.profileSetup) {
            navigate('/chat'); // If profile is set, navigate to chat
          } else {
            navigate('/profile'); // If profile is not set, navigate to profile setup
          }
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        toast.error(response.data.message);
      }
    }
  }

  const handleSignUp = async () => {
    if (validatesignup()) {

      const response = await apiClient.post(SIGNUP_ROUTE, { email: signupEmail, password: signupPassword }, { withCredentials: true })
      console.log({ response });
      if (response.status === 201) {
        // setUserInfo(response.data.user)
        navigate("/auth")
        toast.success(response.data.user.message)
        setActiveTab('login');
        setSignupEmail('');
        setSignupPassword('');
        setConfirmPassword('')
      }
      else {

        toast.error(response.data.message)
      }
    }

  }


  return (

    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-purple-50">
      <div className="h-[80vh] bg-white border-2 border-purple-50 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            </div>
            <p className="text-center font-medium">Fill in the details to get started with best chat app!</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full ">
                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-purple-500 data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>

                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-purple-500 data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">SignUp</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="flex flex-col gap-5 mt-10 ">
                <Input placeholder="Email" type="email" className="rounded-xl p-6 focus:border-purple-500 focus:outline-none focus-visible:ring-0 " value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></Input>


                <div className="relative">
                  <Input placeholder="Password" type={showLoginPassword ? 'text' : 'password'} className="rounded-xl p-6 focus:border-purple-500 focus:outline-none focus-visible:ring-0 " value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></Input>
                  <img
                    src={showLoginPassword ? show : hide}
                    alt="image"
                    className="h-4 w-4 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded-full"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  />
                </div>

                <Button className="bg-purple-500" onClick={handleLogin}>Login</Button>
              </TabsContent>

              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input placeholder="Email" type="email" className="rounded-xl p-6 focus:border-purple-500 focus:outline-none focus-visible:ring-0 " value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}></Input>

                <div className="relative">
                  <Input placeholder="Password" type={showSignupPassword ? 'text' : 'password'} className="rounded-xl p-6 focus:border-purple-500 focus:outline-none focus-visible:ring-0 " value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}></Input>
                  <img
                    src={showSignupPassword ? show : hide}
                    alt="image"
                    className="h-4 w-4 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded-full"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                  />
                </div>

                <div className="relative">
                  <Input
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="rounded-xl p-6 focus:border-purple-500 focus:outline-none focus-visible:ring-0 w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <img
                    src={showConfirmPassword ? show : hide}
                    alt="image"
                    className="h-4 w-4 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded-full"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>

                <Button className="bg-purple-500 rounded-xl" onClick={handleSignUp}>Sign Up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='hidden xl:flex justify-center items-center'>
          <img src={login} alt="" srcSet="" className='h-[550px]' />
        </div>
      </div>
    </div>
  )
}

export default Authentication
