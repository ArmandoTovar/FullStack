import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../util';
const router = express.Router();
router.get('/',(_req,res)=>{
    res.send(diaryService.getNonSensitiveEntries());
});
router.get('/:id',(req,res)=>{
    const diary = diaryService.findById(Number(req.params.id));
    if(diary){
        res.set(diary);
    }else{
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try{
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addEntry(newDiaryEntry) ;
    res.json(addedEntry);}
    catch (e){
        if(e instanceof Error)
        res.status(400).send(e.message);
    }
  });
export default router;
