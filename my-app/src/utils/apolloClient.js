
import { ApolloClient ,InMemoryCache } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http';
import Constants from 'expo-constants'
import {setContext} from '@apollo/client/link/context'
const { apollouri } = Constants.manifest.extra;
const httpLink = createHttpLink({
    uri:apollouri
})
const createApolloClient = (authStorage)=>{
    const authLink = setContext(async (_,{headers})=>{
        try{
            const accessToken = await authStorage.getAccessToken();
            return {
                headers:{
                    ...headers,
                    authorization:accessToken ? `Bearer ${accessToken}`:'',

                }
            };
        }
        catch(e){
            console.log(e)
            return {
                headers,
            };
        }
    });

    return new ApolloClient({
        link:authLink.concat(httpLink),
        cache: new InMemoryCache(),
       
    });
};
export default createApolloClient