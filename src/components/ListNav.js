import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/unanswered' activeClassName='active'>
            Unanswered Questions
          </NavLink>
        </li>
        <li>
          <NavLink to='/answered' activeClassName='active'>
            Answered Questions
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}