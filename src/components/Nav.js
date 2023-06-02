import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ backgroundColor: 'darkgray', padding: '10px' }}>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', padding:'0px 20px' }}>
            Home
          </Link>
        </li>
        <li style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Link to="/postblog" style={{ color: 'white', textDecoration: 'none', padding:'0px 20px'}}>
            Post Blog
          </Link>
          <Link to="/display" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px', padding:'0px 20px'}}>
            Display Blogs
          </Link>
        </li>
        <li>
          <div style={{ display: 'flex' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '10px',padding:'0px 20px' }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none',padding:'0px 20px' }}>
              Signup
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
