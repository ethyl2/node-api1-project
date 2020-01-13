import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header>
          <h1>Welcome to Hobbiton</h1>
          <NavLink to='/'>Home</NavLink>
        </header>
    )
}

export default Header;