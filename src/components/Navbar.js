import React from 'react';
const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '10px' }}>
            Sign In
        </li>
        <li>
            <a href='/add'>Add Patient</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
