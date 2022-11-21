import React from 'react';
import logo from './logo.svg';
import './App.css';
import EcgChart from "./EcgChart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EcgChart chartcolor={'darkblue'} height={250} width={400} />
      </header>
    </div>
  );
}

export default App;
