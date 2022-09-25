




import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find((e) => e.name === newName) !== undefined) {
      alert(`${newName} is already added`);
      setNewName("");
      return 0;
    }

    axios.post('http://localhost:3001/persons',{ name: newName, number: newNumber })
    .then(response=>{
        setPersons([...persons, response.data]);
        setNewName("");



    })
    
    
  };

  const handleDelete=(id,name)=>{
  if(window.confirm(`Delete ${name} ?`)
  )
  
 { axios.delete(`http://localhost:3001/persons/${id}`)
  .then(()=>{
     setPersons([...persons].filter((e)=>e.id!==id));

  }).catch((error)=>console.log(error))

 }
}
  const personFilter = persons.filter((ele) => {
    console.log(`{filter}`);

    return ele.name.match(new RegExp(`${filter}`, "gi"));
  });

  
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
     
      setPersons(response.data);
      console.log(response.data)
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
          <h2>add a new</h2>
      <form>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <br />
          number:{" "}
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      {personFilter.map((ele, i) => (
          <div key={i + "persons"}>
            <span >{ele.name + " " + ele.number+" "}</span>
          <button onClick={()=>handleDelete(ele.id,ele.name)}>delete</button>
          </div>
      ))}
    </div>
  );
};

export default App;
