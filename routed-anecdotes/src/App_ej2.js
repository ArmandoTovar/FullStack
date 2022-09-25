import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate, Link } from 'react-router-dom'
import { useField } from './hooks'
import axios from 'axios'
const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>

      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
          <li>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      <li>{anecdote.content}</li>
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetC, ...content } = useField('text')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      votes: 0,
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            resetC()
          }}
        >
          reset
        </button>
        <button type="onSubmit">create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = async (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    const temp = anecdote
    console.log(temp)
    axios.post('http://localhost:3001/anecdotes', temp).then((response) => {
      setAnecdotes(anecdotes.concat(response.data))
    })

    setNotification(`a new anecdote${anecdote.content}`)
    setTimeout(() => setNotification(''), 10000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }
  const { pathname } = useLocation()
  const temp = new RegExp('/anecdotes/', 'gi')
  const id = pathname.match(temp) ? pathname.replace('/anecdotes/', '') : false
  const anecdote = id ? anecdotes.find((ele) => Number(id) === ele.id) : null
  useEffect(() => {
    fetch('http://localhost:3001/anecdotes', { method: 'GET' }).then(
      (response) => {
        response.json().then((data) => setAnecdotes(data))
      }
    )
  }, [])

  return (
    <div>
      {notification}
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App