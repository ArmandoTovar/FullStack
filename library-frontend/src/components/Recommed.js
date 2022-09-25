import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FILTER_BOOK, ME } from './queries'

const Recommend = (props) => {
  const result = useQuery(ME)

  const [allBooks, save] = useLazyQuery(FILTER_BOOK)
  const [books, setBooks] = useState()
  useEffect(() => {
    console.log(result)
    if (result.data) {
      const t = result.data.me?.favoriteGenre
      allBooks({ variables: { genre: t } })
    }
  }, [result])
  useEffect(() => {
    if (save.data) {
      console.log('s')
      setBooks(save.data.allBooks)
    }
  }, [save])

  if (!props.show) {
    return null
  }

  if (!save.data) {
    return <div>Loading...</div>
  }

  if (books.length === 0) return <p>no data</p>
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
