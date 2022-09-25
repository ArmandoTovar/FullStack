import React from 'react';
import './App.css';
import Content from './components/Content';
import Total from './components/Total';
import Header from './components/Header';
import { courseParts } from './components/types';
const App: React.FC = () => {
  const courseName = "Half Stack application development";



  return (

    <div className="App">
      <div>
    <Header courseName={courseName}/>
     <Content/>
     <Total courseParts={courseParts}/>
    </div>
    </div>
  );
};

export default App;
