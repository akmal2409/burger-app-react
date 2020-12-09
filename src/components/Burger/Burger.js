import React from "react";
import PropTypes, { number } from "prop-types";
import {withRouter} from 'react-router-dom';
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient type={igKey} key={index + igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if(ingredients.length === 0) {
      ingredients = <p>Please start adding ingredients</p>;
    }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.object,
};

export default withRouter(burger);
