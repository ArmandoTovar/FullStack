import express = require('express');
import calculador from './bmiCalculator';
import exercise from './exerciseCalculator';
import { Request } from 'express';

const app = express();
app.use(express.json());
app.get('/ping', (_req, res) => {
  res.send('pong');
});
app.get('/bmi', (req, res) => {
  const {height , weight} = req.query;
  if(typeof height ==='string' &&typeof weight ==='string' )
  res.send(calculador({height,weight}));
});

type RequestBody<T> = Request<{}, {}, T>;
interface inputValue {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      daily_exercises: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any

}

app.post('/exercise',(req:RequestBody<inputValue>, res)=>{ 
{        

  if (!req.body) return res.sendStatus(400);
  
  return res.send(exercise(req.body.daily_exercises,req.body.target));}
});
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running`);
});
