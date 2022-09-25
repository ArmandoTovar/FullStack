import  {Patientsssn , Patients } from "../data/patients"
import { Entry, HealthCheckRating, newPatient, patient, PublicPatient } from "../types"
   

const addPatient = (patient: newPatient):patient => {

    const addedPatient:patient = {
    ...patient,
        id : (Patients.map(({id})=>id).length+1).toString()
    }
   
   Patients.push(addedPatient)
    return addedPatient;
}

const faiulireType = (type : never):never => 
 {
    throw new Error(`dont exist type ${type}`)
}
 
const addEntries = (entry: Entry,id:any):Entry => {
  
    
    if(!id || typeof id !== 'string' ){
        throw new Error(`malformated id`)
    }
    const temp = Patients.find(e=>e.id===id)
    if(temp === undefined)
    {
        throw new Error(`id not exist`)
    }
    switch(entry.type) {
        case "HealthCheck":
            if(entry.healthCheckRating===undefined || !Object.values(HealthCheckRating).includes(entry.healthCheckRating))
            throw new Error(`Error healthCheckRating require for HealthCheck`)
            
        break;
        case "Hospital":
            if(!entry.discharge)
            throw new Error(`Error discharge require for Hospital`)
            
            break;
        case "OccupationalHealthcare":
            if(!entry.sickLeave)
            throw new Error(`Error sickLeave require for OccupationalHealthcare`)
            if(!entry.employerName)
            throw new Error(`Error employerName require for OccupationalHealthcare`)
            
        break;
        default: faiulireType(entry);
    }
  
    const addedEntry:Entry = {
        ...entry,
            id : (Patients.map(({id})=>id).length+1).toString()
        }
   Patients.map((p)=> p.id===temp.id ? {...temp,entry: addedEntry}:p)
    return addedEntry;
}
const getPatients =():PublicPatient[]=> Patientsssn;
const getPatient = (id:string):patient=>
Patients.filter((p)=>p.id===id)[0];

export  { addPatient,getPatients,getPatient,addEntries}