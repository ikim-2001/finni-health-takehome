import React from 'react';
const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#F28C28', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
      <li>
            <a href='/'>Home</a>
        </li>
        <li>
            <a href='/add'>Add Patient</a>
        </li>
        <li style={{ marginRight: '10px' }}>
            Sign In
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
