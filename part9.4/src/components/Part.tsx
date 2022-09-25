import React from "react";
import { courseParts } from "./types";

const  hande= ( part : never) : never =>{
 throw new Error(`Type dont define${JSON.stringify(part)}`)
}

const assertNever = (value:never):never =>{
    throw new Error(`Unhandled discriminated union member:${JSON.stringify(value)}`)
  }
const Part = () =>
(<div>
    {
    courseParts.map( part =>
        {
        switch(part.name)
        {
          case "Fundamentals":
            return <p>{part.description +" "+part.exerciseCount+" "+ part.name}</p>
          case "Using props to pass data":
            return  <p>{part.groupProjectCount +" "+part.exerciseCount+" "+ part.name}</p>
          case "Deeper type usage":
          return     <p>{part.exerciseSubmissionLink+" "+ part.description +" "+part.exerciseCount+" "+ part.name}</p>
          case "NewType":
            return <p>{part.description+" "+ part.exerciseCount+" "+part.name}</p>
          default:assertNever(part)
            break;
          
        }
      })
    }
</div>
)


export default Part;