import React from 'react'

export default Notification =({message}) =>{
  return  message === null ?
   ( <></>)
    : 
  (  <div style=
    {{border:'solid 5px',textAlign:'center',borderColor: message.err? 'red':'green',color: message.err? 'red':'green'}}>
      {message.msg}
      </div>)

}
