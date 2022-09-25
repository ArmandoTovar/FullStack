import React, { useState ,useImperativeHandle,forwardRef } from 'react'

export default forwardRef(function Toggable({name,nameClose='cancel',children},ref) {
    const [visible,setVisible]=useState(false)
    const toggleVisibility = ()=>{
        setVisible(!visible)
    }
    useImperativeHandle(ref,()=>{

        return {
          toggleVisibility
        }
      })
    return (
    <>
      <button style={{display:visible?'none':'inline-block'}} onClick={()=>setVisible(true)}>{name}</button>    
         <button  style={{display:visible?'inline-block':'none'}} onClick={()=>setVisible(false)}>{nameClose}</button>
        
        <div className='visible' style={{display:visible?'block':'none'}}> 
       {children}
        </div>
     
         </>
    
    
    )
})
