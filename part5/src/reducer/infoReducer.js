const infoReducer = (state = { msg: null, error: false }, action) => {
  switch (action.type) {
    case 'ADD_INFO':
      return { msg: action.msg, error: action.error }
    default:
      return state
  }
}

export function addInfo(data) {
  return {
    type: 'ADD_INFO',
    msg: data.msg,
    error: data.error,
  }
}

export default infoReducer
