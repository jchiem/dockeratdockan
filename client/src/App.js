import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListItems from './ListItems';

const App = () =>
  (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">En till j*vla list-app!</h1>
        </header>
        <div className="route-container">
          <Route exact path="/" component={ListItems} />
        </div>
      </div>
    </Router>
  );

export default App;
