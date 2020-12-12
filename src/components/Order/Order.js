import React, { useState } from "react";
import classes from "./Order.module.css";
import Styled from "styled-components";
import Button from "../UI/Button/Button";

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

const Order = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return (
      <StyledIngredient>
        {igKey} {props.ingredients[igKey]}
      </StyledIngredient>
    );
  });

  const viewDetailsHandler = () => {
    setShowDetails((prevDetails) => !prevDetails);
  };

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <div className={classes.Footer}>
        <p>
          Price: <strong>USD {props.price.toFixed(2)}$</strong>
        </p>
        <Button btnType="Info" clicked={viewDetailsHandler}>
          Details
        </Button>
      </div>
      {showDetails ? (
        <div className={classes.Details}>
          <p>Address: dsad</p>
          <p>Street: adsda</p>
          <p>Customer: dsadsa</p>
          <p>Email: dsadsda</p>
        </div>
      ) : null}
    </div>
  );
};

export default Order;
