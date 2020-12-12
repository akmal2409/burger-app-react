import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.change}
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.change}
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          value={props.elementConfig.value}
          onChange={props.change}
          className={classes.Select}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.change}
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
