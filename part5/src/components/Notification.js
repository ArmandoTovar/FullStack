import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.infoReducer)

  return message.msg === null ? (
    <></>
  ) : !message.error ? (
    <>
      <div
        className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
        role="alert"
      >
        <span className="font-medium"> {message.msg}</span>{' '}
      </div>
    </>
  ) : (
    <>
      <div
        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert"
      >
        <span className="font-medium">{message.msg}</span>
      </div>
    </>
  )
}

export default Notification
