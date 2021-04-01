import React from 'react';
import AddForm from './components/AddForm';
import AllUsers from './components/AllUsers';
import Navbar from './components/Navbar';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div >
        <Navbar />

        <Switch>
          <Route exact path="/">
            <AddForm />
          </Route>

          <Route path="/users/create">
            <AddForm />
          </Route>
          
          <Route path="/users/view">
            <AllUsers />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}


