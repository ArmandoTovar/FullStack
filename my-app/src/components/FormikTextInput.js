import React from 'react'
import { useField } from 'formik';
import { StyleSheet } from 'react-native'
import Text from './Text';
import TextInput from './TextInput';
import theme from '../theme';




const styles = StyleSheet.create({
    errorText:{
        marginTop:5,
        color:theme.colors.invalid
    },
    errorBorder:{
        borderColor:theme.colors.invalid

    }
});
const FormikTextInput = ({style,name,...props})=>{
    const [field,meta,helpers] = useField(name);
    const showError = meta.touched && meta.error;
    return ( <>
        <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={()=> helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={[style,showError&&styles.errorBorder]}
        {...props}
        />
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}

    </>)
}
export default FormikTextInput;