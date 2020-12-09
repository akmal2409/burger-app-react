import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => (
  <div className={[classes.Loader, classes[props.class]].join(' ')}>Loading...</div>
);

export default spinner;