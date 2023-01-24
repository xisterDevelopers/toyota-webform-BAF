import React from 'react';
import logo from './assets/svg/toyota-logo.svg';

function App() {
  return (
    <div className="App px-5 py-4">
      <header className="App-header">
        <img className="mb-5" src={logo} alt="logo" />
          <h1 className="font-title black">Welcome on <span className="dark-red">Bank Account Form</span></h1>
      </header>
    </div>
  );
}

export default App;
