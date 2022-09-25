const initialState = {
    filter:''
}

const FilterReducer = (state = initialState, action) => {
    switch(action.type)
    {
      case 'SET_FILTER':
         return { filter :action.msg}
      default:
        return state
    }
  }
  export const setFilter = (content)=>{
    return {type:'SET_FILTER', msg:content}
  
  }
  
  export default FilterReducer