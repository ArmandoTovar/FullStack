import React from 'react'
type Name = { courseName:string};
const Header:React.FC<Name>= ({courseName})=> {
  return (
     <h1>{courseName}</h1>
  )
}


export default Header
