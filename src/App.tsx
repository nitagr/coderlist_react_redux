import React from 'react';
import logo from './logo.svg';
import AddForm from './components/AddForm';
import UserList from './components/UserList';
import './App.css';
import Navbar from './components/Navbar';
import { UserState } from './API';

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
            <UserList />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}


