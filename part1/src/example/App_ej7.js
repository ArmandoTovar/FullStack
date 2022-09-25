import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.API_KEY;
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);

  const personFilter =
    persons === []
      ? []
      : persons.filter((ele) => {
          return ele.name.match(new RegExp(`${filter}`, "gi"));
        });

        useEffect(()=>{
         if( personFilter.length===1)
          {setFilter(personFilter[0].name)
            setCity(personFilter[0].name)}
        

          
        },[filter])





  useEffect(() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    axios.get(url).then((response) => {


      setWeather({
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
      });
    });
  }, [city]);
  useEffect(() => {

    axios.get("https://restcountries.com/v3.1/all").then((response) => {

      const temp = response.data.map(
        ({ name, capital, population, flags, languages }) => {
          console.log(capital);
          return {
            name: name.common,
            capital: capital === undefined ? "" : capital[0],
            population: population,
            flags: flags.png,
            languages: languages === undefined ? [] : Object.values(languages),
          };
        }
      );
      setPersons(temp);
      console.log(temp);
    });
  }, []);
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      {personFilter.length < 0 || personFilter.length > 10 ? (
        <p>too many matches,specify another filter</p>
      ) : personFilter.length === 1 ? (
        <div>
           <button onClick={()=>setFilter('')}>Reset Find</button>
          <h1>{personFilter[0].name}</h1> 
          <p>capital: {personFilter[0].capital}</p>
          <p>pupulation: {personFilter[0].population}</p>
          <h2>Spoken languages</h2>
          <ul>
            {personFilter[0].languages.map((ele, i) => (
              <li key={"index" + i}>{ele}</li>
            ))}
          </ul>
          <img src={personFilter[0].flags} alt="img" />
          <h2>Weather in {personFilter[0].name}</h2>
          {weather === [] ? (
            <></>
          ) : (
            <>
              <p>temperature: {weather.temperature}</p>
              <p>wind: {weather.wind}</p>
            </>
          )}
        
        </div>
      ) : (
        personFilter.map((ele, i) => (
          <p key={i + "persons"}>
            {ele.name}
            <button onClick={() => setFilter(ele.name)}>show more</button>
          </p>
        ))
      )}
    </div>
  );
};

export default App;
