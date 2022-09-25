
import React from 'react'
import { Total as TotalTypes } from './types';

 const Total:React.FC<TotalTypes> =({courseParts})=>{
  return (
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}
export default Total;