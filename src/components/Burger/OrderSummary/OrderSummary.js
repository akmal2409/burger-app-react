import React from "react";
import Aux from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";
import PropTypes from 'prop-types';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total price: {props.totalPrice.toFixed(2)} $</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType={"Danger"} clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType={"Success"} clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

orderSummary.propTypes = {
  totalPrice: PropTypes.number,
  purchaseCancelled: PropTypes.func,
  purchaseContinue: PropTypes.func,
  ingredients: PropTypes.object
}

export default orderSummary;
