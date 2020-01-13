import React from 'react';
import Users from './components/Users';
import Footer from './components/Footer';
import User from './components/User';
import { Route, NavLink } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to Hobbiton</h1>
        <NavLink to='/'>Home</NavLink>
      </header>
      
      <Route exact path='/' component={Users} />
      <Route path='/users/:id' component={User} />
      <Footer />
    </div>
  );
}

export default App;
