import { View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Text from './Text'
import { Link } from 'react-router-native'

export default function AppBarTap(props) {
  return (
    <View >
       <TouchableWithoutFeedback >
        <Link to={props.to} >
      <Text style={{  textAlign:'center' ,paddingHorizontal:5}} color='textThird' fontWeight='bold' fontSize='subheading'>{props.name}</Text>
        </Link>
        </TouchableWithoutFeedback> 
    </View>
  )
}