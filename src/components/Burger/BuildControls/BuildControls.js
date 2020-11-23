import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";
import Styled from 'styled-components';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  
  const PriceTag = Styled.div`
  padding-top: 2px;
  width: 10em;
  height: 3.2em;
  border: 1.5px solid #f4d004;
  background: linear-gradient(#228c1d, #91ce50);
  font-weight: 700;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  text-shadow: inset -2px -1px grey;

  .price-tag {
    margin: 0 auto;
    border-radius: 15px 15px 5px 5px;
    border: 3px solid ${props.totalPrice < 5 ? '#001f3f' : '#FF4136'};
    width: 40%;
    height: 45%;
    color: ${props.totalPrice < 5 ? '#001f3f' : '#FF4136'};
  }
`;

  return (
    <div className={classes.BuildControls}>
      <PriceTag>Current Price: <div className="price-tag">{props.totalPrice}</div></PriceTag>
      {controls.map((control) => {
        return <BuildControl 
        disabled={props.disabled[control.type]}
        label={control.label} 
        key={control.label} 
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}/>;
      })}
    </div>
  );
};

export default buildControls;
