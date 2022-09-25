import React from "react";
import ReactDOM from "react-dom";



const App = () => {
  const course = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  },{
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1,
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2,
      },
    ],
  },]

  return course.map((course)=> <Course key={course.id} course={course} />)
}



const Course = props => {
 

  const { course } = props
  const total = course.parts.reduce((a,b)=> a+b.exercises,0)

  return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map(({name,exercises,id})=>{
   return (<p key={id}>{name}<span>{exercises}</span></p>)
    
    })}
    <span>total of {total} exercises</span>
    </div>
  )
}

ReactDOM.render(<App/>,document.getElementById('root'))
