import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">ZOTSUPPORT</Link></li>
        <li><Link to="/AboutUs">About Us</Link></li>
        <li><Link to="/SignIn">Sign in</Link></li>
        <li><Link to="/StudentDashboard">Student dashboard</Link></li>

        <li><Link to="/CreateNewProgram">Create new program</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;