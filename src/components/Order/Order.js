import React from "react";
import classes from "./Order.module.css";
import Styled from 'styled-components';


const StyledIngredient = Styled.span`
  text-transform: capitalize;
  display: inline-block;
  margin: 0 8px;
  padding: 6px;
  border: 1px solid #ccc;
  background-color: #fb8500;
  border-radius: 33px;
  font-size: 0.93em;
  cursor: pointer;
  opacity: 0.75;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const order = (props) => {

  const ingredients = Object.keys(props.ingredients)
  .map(igKey => {
    return <StyledIngredient>
      {igKey} {props.ingredients[igKey]}
    </StyledIngredient>
  });
  

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}$</strong>
      </p>
    </div>
  );
};

export default order;
