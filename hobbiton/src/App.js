import React from 'react';

import Users from './components/Users';
import User from './components/User';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div className="App"> 
      <Route exact path='/' component={Users} />
      <Route path='/users/:id' component={User} />   
    </div>
  );
}

export default App;
