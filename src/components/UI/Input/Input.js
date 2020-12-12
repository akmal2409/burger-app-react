import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onClick={props.clicked}
          onChange={props.change}
          className={inputClasses.join(' ')}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onClick={props.clicked}
          onChange={props.change}
          className={inputClasses.join(' ')}
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
          onClick={props.clicked}
          onChange={props.change}
          className={inputClasses.join(' ')}
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
