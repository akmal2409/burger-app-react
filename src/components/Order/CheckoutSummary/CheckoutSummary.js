import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import PropTypes from "prop-types";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.canceled} btnType="Danger">
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </div>
  );
};

checkoutSummary.propTypes = {
  ingredients: PropTypes.object,
  cancel: PropTypes.func,
};

export default checkoutSummary;
