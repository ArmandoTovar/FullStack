import { useState } from 'react'

export const useInput = (type) => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    onChange,
    value,
    type,
    reset,
  }
}
