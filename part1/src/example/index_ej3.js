import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = ({anecdotes}) => {
 

  const [selected, setSelected] = useState(0)
  const [vote ,setVote]=useState([...anecdotes].fill(0,0,anecdotes.length))
  
  
   
  const finMax=()=>
  {
    let max=0;
      vote.map(ele=>max= ele > max ? ele: max  )
    
    
    
    return anecdotes[vote.findIndex(e=> e===max)]
  }
  
  return (
    <div>
        <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
     <p> has {vote[selected]} vote</p>
     <button onClick={()=> {
      
      let temp = [...vote];
      console.log(temp)
      temp[selected]+=1
      console.log(temp)
      setVote(temp);    
      }     
      } >vote</button>
      <button onClick={()=> setSelected(Math.floor(Math.random()*anecdotes?.length))}>next anecdote</button>
     <h1>Anecdote with most votes</h1>
      {
      
        finMax()
          
        
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)