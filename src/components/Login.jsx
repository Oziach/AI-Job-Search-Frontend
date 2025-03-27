
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AllContext } from '../contexts/AllContext';

const Login = () => {

  const {token, setToken, navigate} = useContext(AllContext); 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [currentState, setCurrentState] = useState('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token])

  const onSubmitHandler = async (e) => {

    e.preventDefault(); 
    try {
      if(currentState == 'Sign Up'){
        const response = await axios.post(backendUrl + '/user/register', {username, password});
        
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('restumeJobSearchToken', response.data.token);
        }else{
          toast.error(response.data.message);
        }
      }
      else{
        const response = await axios.post(backendUrl + '/user/login', {username, password});
        
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('resumeJobSearchToken', response.data.token);
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // useEffect(()=>{
  //   if(token){
  //     navigate('/');
  //   }
  // }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
      </div>
      <input onChange={(e)=>setUsername(e.target.value)} value = {username} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Username'   required/>
      <input onChange={(e)=>setPassword(e.target.value)} value = {password} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState === 'Login' 
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login instead</p>
        }
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 hover:cursor-pointer'>{currentState}</button>

    </form>
  )
}

export default Login