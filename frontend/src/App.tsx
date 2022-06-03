import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Swipe from './views/Swipe';

function App() {
  return (
    <div className="App">
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <header>
        <Navbar></Navbar>
      </header>
      <body>
        <Swipe></Swipe>
      </body>
    </div>
    
  );
}

export default App;
