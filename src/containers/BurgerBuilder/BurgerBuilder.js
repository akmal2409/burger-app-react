import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    purchasable: false,
    purchaseMode: false,
  };

  purchaseHandler = () => {
    this.setState({ purchaseMode: true });
  };

  purchaseContinueHandler = () => {
    alert("You contrinue!");
  };

  modalCloseHandler = () => {
    this.setState({ purchaseMode: false });
  };

  updatePurchaseState = (ingredients) => {
    const totalIngredients = Object.values(ingredients).reduce(
      (sum, value) => sum + value,
      0
    );

    this.setState({ purchasable: totalIngredients > 0 });
  };

  addIngredientHandler = (type) => {
    let ingredientCount = this.state.ingredients[type];

    const updated = {
      ...this.state.ingredients,
    };

    updated[type] = ++ingredientCount;
    let updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

    this.setState({ ingredients: updated, totalPrice: updatedPrice });
    this.updatePurchaseState(updated);
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
    this.updatePurchaseState(updated);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          modalClosed={this.modalCloseHandler}
          show={this.state.purchaseMode}
        >
          <OrderSummary
            totalPrice={this.state.totalPrice}
            purchaseCancelled={this.modalCloseHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
