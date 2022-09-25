import express = require('express');
import cors = require('cors');
import { Diagnoses } from './data/diagnoses';
import {getPatients ,addPatient,addEntries, getPatient} from './services/patients';
import {verifyData, verifyEntry} from './utils';
const app  = express();

app.use(express.json());
app.use(cors());
app.get('/api/ping',(_req,res)=>{
    res.send('gong');
});

app.get('/api/diagnoses',(_req,res)=>{
    res.send(Diagnoses);
});
app.get('/api/patients',(_req,res)=>{
    const data = getPatients();
    res.send(data);
});
app.get('/api/patients/:id',(req,res)=>{
    const data = getPatient(req.params.id);
    res.send(data);
});
app.post('/api/patients',(req,res)=>{

    try{
       const newPatient= verifyData(req.body)
       const AddedPatiente = addPatient(newPatient)
       res.json(AddedPatiente);
    }catch(e){
        if(e instanceof Error)
        res.status(400).send(e.message);
    }

})

app.post('/api/patients/:id/entries',(req,res)=>{
    try{
    
        const newEntries = verifyEntry(req.body);
        const AddedEntries = addEntries(newEntries,req.params.id);
        res.json(AddedEntries); 
    } catch (e){
        if(e instanceof Error)
        res.status(400).send(e.message)
    }
});
const PORT = 3001;


app.listen(PORT,()=>{
    console.log(`server starting on port ${PORT}`);
});