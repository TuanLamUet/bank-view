import React from 'react';

import logo from '../logo.jpg'
const Logo = () => {
  return (
    <img
      alt="Logo"
      src={logo}
     style = {{width: '50px', height: '48px', borderRadius: '50%', marginLeft: '30px'}}/>
  );  
};

export default Logo;
