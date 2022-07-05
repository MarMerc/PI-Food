import React, { Component }  from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx';
import Home from './Components/Home.jsx';
import RecipeCreate from './Components/RecipeCreate';
import Details from './Components/Details';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />    
          <Route path='/create' component={RecipeCreate} />
          <Route path='/recipes/:id' component={Details} />  
      </div>      
    </BrowserRouter>
  );
};

export default App;
