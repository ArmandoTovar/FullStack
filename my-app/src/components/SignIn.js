import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Text from './Text'
import React, { useEffect, useState } from 'react'

import FormikTextInput from './FormikTextInput'
import theme from '../theme'

import { useSignIn } from '../hooks/useSignIn'
import AuthStorage from '../utils/authStorage'
import {  useNavigate } from 'react-router-native'
import Form from './Form'

export default function SignIn() {
    const [signIn] = useSignIn()
    const navigate = useNavigate()
    const [messageError,setMessageError]= useState(null)
    
    const onSubmit = async (values,resetForm) => {
        
        const { name:username, password } = values; 
        try {
         await signIn({ username, password });
         navigate('/');
         resetForm()
         setMessageError(null)
        } catch (e) {
            setMessageError( e.toString().replace('Error: ',''))
      
        }
      };
  return (
    <View style={styles.containerForm}>
        <Form onSubmit={onSubmit} messageError={messageError} />
        {messageError!==null?<Text color='textInvalid'>{messageError}</Text>:<></>}
    </View>
  )
}

const styles = StyleSheet.create({
  containerForm:{
      display:'flex',
      flexDirection:'column',
      margin:10,  
  },})
