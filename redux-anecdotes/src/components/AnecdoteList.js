import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

export default function AnecdoteList() {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(
      state => 
        state.anecdote
        .sort((a,b)=> 
        a.votes  === b.votes 
        ? 0 
        : a.votes>b.votes? -1:1)
        .filter((e) => {
          const temp = new RegExp(filter.filter,'gi')
          console.log(filter.filter)
        return temp.test(e.content)
        })
        
        )
    const vote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setMessage({
          msg: `vote for "${anecdote.content}"`,
          visible:true})
           )
           setTimeout(() => {
             dispatch(setMessage({
               msg:'',
               visible:false})
                )
           }, 4000);
      }
  return (
   <> {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
