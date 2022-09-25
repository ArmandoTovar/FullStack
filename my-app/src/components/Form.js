

import React from 'react'
import * as yup from 'yup'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'

import { Formik } from 'formik'
const validationSchema = yup.object().shape({
    name: yup
    .string()
    .min(3,'Name min length 3 char')
    .required('Name is required'),
    password:
    yup.string()
    .min(5,'Password min length 5 char')
  .required('Password is require')
})


export default function Form({onSubmit,messageError}) {
    return (
        <View style={styles.containerForm}>
            <Formik
            initialValues={{
                name:'',
                password:''
            }}
            validationSchema={validationSchema}
            onSubmit={(values,{resetForm})=>{
               
                onSubmit(values,resetForm)
                 
            
            }}
            >
                {({handleSubmit})=>{
                    return <>
                        <FormikTextInput style={styles.input}  name='name' placeholder='UserName' />
                        <FormikTextInput style={styles.input}  name='password' placeholder='Password' secureTextEntry={true} />
                        <TouchableWithoutFeedback onPress={(e)=>handleSubmit(e)} >
                            <Text fontWeight='bold' fontSize='subheading' style={styles.button}>Sign in</Text>
                        </TouchableWithoutFeedback>
                    </>
                }}
            </Formik>
            {messageError!==null?<Text color='textInvalid'>{messageError}</Text>:<></>}
        </View>
      )
  
}



const styles = StyleSheet.create({
    containerForm:{
        display:'flex',
        flexDirection:'column',
        margin:10,  
    },
    input:{
        borderColor:'#aaa',
        borderWidth:1,
        marginVertical:10,
        padding:10
    },
    button:{
        backgroundColor:theme.colors.primary,
        borderRadius:4,
        marginVertical:10,
        padding:10,
        textAlign:'center',
        color:theme.colors.textThird
    }

})