import { useState } from 'react'

const useInput = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    type,
    reset,
  }
}

export default useInput
