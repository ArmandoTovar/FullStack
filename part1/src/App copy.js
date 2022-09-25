import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'

import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import { useSelector, useDispatch } from 'react-redux'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeNotes , toggleImportanceOf } from './reducers/noteReducer'
const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes)
  const showAll = useSelector(state => state.filter)
  const [errorMessage, setErrorMessage] = useState(null)
  const noteFormRef = useRef()
  const [user,setUser]=useState(null)
  const toggleImportance = id => {
    const note = notes.find(n => n.id === id)
    console.log(note)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        dispatch(toggleImportanceOf(returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        dispatch(initializeNotes(notes.filter(n => n.id !== id)))

      })
  }
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

  const notesToShow = showAll === 'ALL' ? notes :
    showAll === 'IMPORTANT' ? notes.filter(note => note.important):
      notes.filter(note => !note.important)

  const handleLogin = async ( { username,password }) => {
    try {
      const user = await loginService.login({
        username,password
      })

      window.localStorage.setItem(
        'loggedNoteappUser',JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
    }
    catch(exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
    console.log('logging in with',username,password)
  }
  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const noteForm = () => (

    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm/>
    </Togglable>
  )


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user===null && loginForm()}
      {user !== null && noteForm()}
      <VisibilityFilter/>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
        )}
      </ul>
      <Footer/>
    </div>
  )
}

export default App