import React, { useState } from 'react'
import { login } from '../services/login'
export default function Login({setUser,setError}) {
    const [username,setUserName]= useState('')
    const [password, setPassword]=useState('')
    
    const handleSubmit = (e)=>{
        e.preventDefault()
  
        login({user:username,password}).then(
          (response)=>{
           
            setUser(response)
            console.log(response)
            window.localStorage.setItem('login',JSON.stringify(response))

          }
        ).catch((e)=>{setError(e.response.data)})
       
      
     
   
    }
    
  return (
 <> <h1>Log in to application</h1>
  <form id='form' onSubmit={handleSubmit}>
        <input type='text' value={username}
        placeholder='username'
        onChange={({target})=>{setUserName(target.value)}}
        /> 
         <input  type='password' value={password}
        placeholder='password'
        onChange={({target})=>{setPassword(target.value)}}
        /> 
        <button  type='submit' >login</button>
        
    </form>
    </>
  )
}
