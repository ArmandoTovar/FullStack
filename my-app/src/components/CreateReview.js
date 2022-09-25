
import React, { useState } from 'react'
import * as yup from 'yup'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'

import { Formik } from 'formik'
import { useMutation } from '@apollo/client'
import { NEW_REVIEW } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'
const validationSchema = yup.object().shape({
    ownerName: yup
    .string()
    .required('Name is required'),
    repositoryName:yup
    .string()
    .required('Name is required'),
    rating:yup
    .number()
    .max(100)
    .min(1)
    .required('Name is required'),
})


export default function CreateReview() {
    const [messageError,setMessageError]=useState(null)
    const [mutate,error, result]  = useMutation(NEW_REVIEW)
    const navigate= useNavigate()

    const onSubmit= async (values,resetForm)=>{
        try{
        
           const  {data}=  await mutate({variables:{review:{...values,rating:Number(values.rating)}}})
             navigate(`/repos/${data.createReview.repositoryId}`)
    }catch(e){
        setMessageError( e.toString().replace('Error: ',''))
    }
    }
    return (
        <View style={styles.containerForm}>
            <Formik
            initialValues={{
                ownerName:'',
                repositoryName:'',
                rating:0,
                text:''
            }}
            validationSchema={validationSchema}
            onSubmit={(values,{resetForm})=>{
               
                onSubmit(values,resetForm)
                 
            
            }}
            >
                {({handleSubmit})=>{
                    return <>
                        <FormikTextInput style={styles.input}  name='ownerName' placeholder='Repository owner name' />
                        <FormikTextInput style={styles.input}  name='repositoryName' placeholder='Repository name' />
                        <FormikTextInput style={styles.input}  name='rating' placeholder='Rating between 0 and 100'/>
                        <FormikTextInput  style={styles.input}  name='text' placeholder='Review' multiline />
                        <TouchableWithoutFeedback onPress={(e)=>handleSubmit(e)} >
                            <Text fontWeight='bold' fontSize='subheading' style={styles.button}>Create a review</Text>
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