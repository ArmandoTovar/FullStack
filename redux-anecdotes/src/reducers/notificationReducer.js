const initialState = {
    visible: false,
    msg:''
}

const NotificationReducer = (state = initialState, action) => {
    switch(action.type)
    {
      case 'SET_MESSAGE':
         return {visible:action.visible, msg:action.msg}
      default:
        return state
    }
  }
  export const setMessage = ({msg,visible})=>{
    return {type:'SET_MESSAGE', msg, visible}
  
  }

  export default NotificationReducer