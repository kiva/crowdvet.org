import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Footer />
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
