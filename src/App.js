import React from 'react';
import logo from './logo.svg';
import './App.css';
import LogIn from "./view/LogIn";
import ToDo from "./view/ToDo";

function App() {
  //check has token
  if (localStorage.getItem("token") == null) {
    return (
      <div className="App">
        <LogIn />
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: "fit-content" }}>
        To Do
      </header>
      <body>
        <ToDo />
      </body>
    </div>
  );
}

export default App;
