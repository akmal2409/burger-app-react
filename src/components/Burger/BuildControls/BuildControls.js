import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import Styled from "styled-components";
import PropTypes from 'prop-types';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const PriceTag = Styled.div`
  padding-top: 2px;
  width: 11.5em;
  height: 1.7em;
  border: 1.5px solid #f4d004;
  background-color: #DAD735;
  font-weight: 700;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  position: relative;
  left: 2.96em;
  transition: all 0.25s;
  &:hover {
    background-color: #eeef20;
    border: 1.5px solid #fb5607;
    color: black;
    font-weight: bold;
    box-shadow: 0 0.25em 0.25em -0.1em #eeef20;
    transform: translateY(-0.2em);

    .red {
      color: red;
    }
  }
`;

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <PriceTag>Current Price: <span className="red">{props.totalPrice.toFixed(2)}</span> $</PriceTag>
      {controls.map((control) => {
        return (
          <BuildControl
            disabled={props.disabled[control.type]}
            label={control.label}
            key={control.label}
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)}
          />
        );
      })}
      <button
        onClick={props.ordered}
        disabled={!props.purchasable}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

buildControls.propTypes = {
  disabled: PropTypes.object,
  ordered: PropTypes.func,
  purchasable: PropTypes.bool
}

export default buildControls;
