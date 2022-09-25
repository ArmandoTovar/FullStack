import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants'
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/AuthStorageContext';

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage);
export default function App() {
  console.log(Constants.manifest.extra.apollouri)
  return (
   <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
         <Main/>
      </AuthStorageContext.Provider>
  </ApolloProvider>
   </NativeRouter>
  );
}

