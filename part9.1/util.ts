import { NewDiaryEntry , Visibility, Weather } from "./types";
 

const toNewDiaryEntry = (object:any): NewDiaryEntry =>{
    const newEntry:NewDiaryEntry = {
        date:parseDate(object.date),
        comment:parseComment(object.comment),
        weather:parseWeather(object.weather),
        visibility:parseVisibility(object.visibility)
     };

     return newEntry;
};
const isDate = ( date : string):boolean =>{
    return Boolean(Date.parse(date));
};
const parseDate = ( date :any):string =>{
    if(!date || !isString(date) || !isDate((date))){
        throw new Error(`Incorrect or missing date: `+date);
    }
    return date;
};
const parseComment = (comment:any):string =>{
    if(!comment || !isString(comment)){
        throw new Error(`Incorrect or missing coment:`+comment);
    }
    return comment;
};
const isString = (text:any) : text is string =>{
    return typeof text==='string' || text instanceof String;
};
const parseWeather = ( weather : any): Weather =>{
    if(!weather || !isWeather(weather))
    {  throw new Error(`Incorrect or missing wather: ` + weather);
    }
    return weather;
};
const isWeather= ( param:any): param is Weather =>{
    return Object.values(Weather).includes(param);
};
const isVisibility= ( param :any ): param is Visibility =>{
    return Object.values(Visibility).includes(param);
};
const parseVisibility = ( visibility: any): Visibility =>
{
    if(!visibility || !isVisibility(visibility)){
        throw new Error(`Incorrect or missing visibility` + visibility);
    }
    return visibility;
};
export default toNewDiaryEntry;