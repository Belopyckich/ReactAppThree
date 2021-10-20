import React from 'react';
import './App.css';
import About from './pages/About'
import Posts from './pages/Posts'
import Navbar from './components/UI/Navbar';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
const App = () => {
  
  return (
    <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/posts">
            <Posts/>
          </Route>
          <Redirect to='/posts'/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
