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

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
  };
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
        <p key={i + "persons"}>{ele.name + " " + ele.number}</p>
      ))}
    </div>
  );
};

export default App;
