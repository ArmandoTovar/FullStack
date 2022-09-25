// interface inputValue {
//   data: number[]
//   target: number
// }
interface Exercises {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

function calculateExercises(data: number[], target: number): Exercises {
  const average = data.reduce((a, b) => a + b, 0) / data.length;
  const temp = average / target;
  const rating = temp > 0.8 ? 3 : temp > 0.4 ? 2 : temp > 0.1 ? 1 : 0;
  return {
    periodLength: data.length,
    trainingDays: data.filter((e) => e !== 0).length,
    success: average >= 2 ? true : false,
    rating,
    ratingDescription: 'not too bad but could be better',
    target,
    average,
  };
}

// const parseArguments = (args: string[]): inputValue => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   const temp = args.slice(2).map((e) => {
//     if (isNaN(Number(e))) {
//       throw new Error('Provided values were not numbers');
//     }
//     return Number(e);
//   });

//   return {
//     data: temp.slice(1),
//     target: temp[0],
//   };
// };

interface result {
  "periodLength": number,
  "trainingDays": number,
  "success": boolean,
  "rating": number,
  "ratingDescription": string,
  "target": number,
  "average": number
}
interface error {
  error:string
}


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
 function exercise(daily_exercises:any,target:any):result|error{
  
try {
  console.log(daily_exercises);
    if(!(daily_exercises && target) )
  throw new Error(' parameters missing');
  

  if (typeof daily_exercises === 'object' && typeof target ==='number' )
 {
 
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const temp:any[]= [daily_exercises].flat();
  const daily:number[] = [];
 if( temp.every((e)=>typeof e ==='number' ? daily.push(e): false))
  {
  return calculateExercises(daily,target);
  }
}
  throw new Error('malformatted parameters');

} catch (e) {
  if(e  instanceof Error)
  return {error: e.message};
 
 
  return {error:"fff"};
}


}

export default exercise;