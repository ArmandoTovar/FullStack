import { useQuery } from '@apollo/client'
import FormBirthyear from './FormBirthyear'
import { ALL_AUTHOR } from './queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHOR)
  if (result.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set Birthyear</h3>
      <FormBirthyear
        updateCacheWithAuthor={props.updateCacheWithAuthor}
        authors={authors}
      />
    </div>
  )
}

export default Authors
