import axios from 'axios'

const login = (data)=>{

   const request =  axios.post('/api/login',data)
   return request.then(response => response.data)

}


export {login}