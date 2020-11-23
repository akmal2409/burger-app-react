import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    let ingredientCount = this.state.ingredients[type];

    const updated = {
      ...this.state.ingredients,
    };

    updated[type] = ++ingredientCount;
    let updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

    this.setState({ ingredients: updated, totalPrice: updatedPrice });
  };

  removeIngredientHandler = (type) => {
    let ingredientCount = this.state.ingredients[type];

    const updated = {
      ...this.state.ingredients,
    };

    updated[type] = ingredientCount > 0 ? --ingredientCount : 0;

    const updatedPrice =
      INGREDIENT_PRICES[type] < this.state.totalPrice
        ? this.state.totalPrice - INGREDIENT_PRICES[type]
        : 0;

    this.setState({ ingredients: updated, totalPrice: updatedPrice });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
