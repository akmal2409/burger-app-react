import React from "react";
import classes from "./Button.module.css";
import PropTypes from 'prop-types';

const button = (props) => (
  <button
    onClick={props.clicked}
    className={([classes.Button, classes[props.btnType]].join(' '))}
  >
    {props.children}
  </button>
);

button.propTypes = {
  clicked: PropTypes.func,
  btnType: PropTypes.string
}

export default button;