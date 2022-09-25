

import {  Entry, Gender, newPatient, Type } from "./types";

const verifyData =  ( object : any ) : newPatient =>{
  
    return {
        name: parseName(object.name),
        dateOfBirth:parseDate(object.dateOfBirth),
        ssn:parseSsn(object.ssn),
        gender:parseGender(object.gender),
        occupation:parseOccupation(object.occupation),
        entries: parseOnlyType(object.entries)        
    }
}
const isType =( type:any): type is Type=>{
    
    return Boolean(Object.values(Type).includes(type))
}
const parseOnlyType = (object:any) : any =>
{   
    if(typeof object !=='object')
    {throw new Error('Type incorrect')}
    
    Object.values(object).forEach((e:any)=>{
        if(!e.type ){
            return e
        }
        if( !isString(e.type) || !isType(e.type)){
            throw new Error('Type incorrect')
        }
    })
    
    return object

}
const isGender = (gender : any) : gender is Gender =>{
    return Object.values(Gender).includes(gender)
}
const parseGender = ( gender:any) : Gender =>{

    if(!gender || !isString(gender)  || !isGender(gender) )
    {throw new Error(`Bad gender value`)}
    return gender;
}
const isString = (text:any) : text is string =>
{
    return text instanceof String || typeof text == 'string' 
}
const parseName = (name:any): string =>{
    if(!name ||!isString(name))
        {throw new Error(`Bad name value`)}
        return name;

}
const parseOccupation = (occupation:any): string =>{
    if( !occupation ||!isString(occupation))
    {throw new Error(`Bad occupation value`)}
    return occupation;

}
const parseDescription = (description:any): string =>{
    if( !description ||!isString(description))
    {throw new Error(`Bad occupation value`)}
    return description;

}

const parseSpecialist = (specialist:any): string =>{
    if( !specialist ||!isString(specialist))
    {throw new Error(`Bad specialist value`)}
    return specialist;

}
const parseSsn = (ssn:any): string =>{
    if(!ssn || !isString(ssn))
    {throw new Error(`Bad ssn value`)}
    return ssn;

}
const parseDate = (date:any): string =>{
    if(!date || !isString(date) || !isDate(date))
    {throw new Error(`Bad date value`)}
    return date;

}
const isDate = (date:any): boolean =>{
    return Boolean(Date.parse(date))
}
const verifyEntry = (data:any):Entry =>{
    if(data instanceof Object)
    return {

        date:parseDate(data.date),
        description:parseDescription(data.description),
        specialist:parseSpecialist(data.specialist),
        type:parseOnlyType(data),
        ...data
    }

    throw new Error("Bad Data entry");
    

}
export  {verifyData,verifyEntry};