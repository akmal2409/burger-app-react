import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
  
  return (
    <div className={classes.SideDrawer}>
      <Logo height="11"
            style={{marginBottom: '15px'}}/>
      <nav>
        <NavigationItems mobile/>
      </nav>
    </div>
  );
}

export default sideDrawer;