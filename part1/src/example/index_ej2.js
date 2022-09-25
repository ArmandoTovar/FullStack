import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Statistic = ({name,value})=> <tr><td>{name}</td><td>{value}</td></tr>

const Statistics= ({good,neutral,bad})=>{
  const total =good + neutral + bad;
  const average = (good-bad)/total;
  const positive = good*100/total
  if(total === 0) return <p>No feedback given</p>
  
  return(<table>
  
    <tbody>
  <Statistic name='good' value={good}/>
  <Statistic name='neutral' value={neutral}/>
  <Statistic name='bad' value={bad}/>
  <Statistic name='all' value={total}/>
  <Statistic name='average' value={average}/>
  <Statistic name='positive' value={positive}/>
  </tbody>
  </table>)
}
const Button =({name,handleOnClick})=>{
  return (
    <button onClick={handleOnClick}>{name}</button>
  )
}

const Feedback = ({ setBad , setGood ,setNeutral})=>{
  return (
    <>
    
    <Button name="good" handleOnClick={setGood}/>
    <Button name="neutral" handleOnClick={setNeutral}/>
    <Button name="bad" handleOnClick={setBad}/></>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const SetGood = ()=>{
    setGood(good+1)
  }
  const SetBad = ()=>{
    setBad(bad+1)
  }
  const SetNeutral = ()=>{
    setNeutral(neutral+1)
  }
  return (
    <div>
    <h1>give feedback</h1>
    <Feedback setBad={SetBad} setGood={SetGood} setNeutral={SetNeutral}/>
    <h1>give statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    
    
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)