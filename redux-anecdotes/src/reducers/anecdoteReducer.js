const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const AnecdoteReducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'VOTE':
       return [...state].map(e=> action.id === e.id ? {...e,votes:e.votes+1}:e)
    case 'ADD_NOTE':
      return [...state,action.note]
    default:
      return state
  }
}
export const addVote = (id)=>{
  return {type:'VOTE', id}

}
export const addNote = (content) => {
  return {type:'ADD_NOTE', note:asObject(content)}
}

export default  AnecdoteReducer 