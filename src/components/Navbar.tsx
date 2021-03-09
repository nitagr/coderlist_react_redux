import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserState } from '../API';

const Navbar = (state: UserState) => (

  <nav>
    <section>
      <Link to="/users/create">CREATE</Link>
      <Link to="/users/view">VIEW</Link>
      <h1>Registered Users: {state.users.length}</h1>
    </section>
  </nav>

);

const mapStateToProps = (state: UserState) => {
  console.log('map', state.users);
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {})(Navbar);