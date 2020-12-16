import React, { Component } from "react";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchaseMode: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchaseMode: true });
  };

  purchaseContinueHandler = () => {
    // // alert("You contrinue!");
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice.toFixed(2),
    //   customer: {
    //     name: "Akmal Alikhujaev",
    //     address: {
    //       street: "Teststreet 1",
    //       zipCode: "41351",
    //       country: "Netherlands",
    //     },
    //     email: "test@test.com",
    //   },
    //   deliveryMethod: "fastest",
    // };

    // this.setState({ loading: true });
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchaseMode: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchaseMode: false });
    //   });

    const queryPrams = [];
    for (let i in this.state.ingredients) {
      queryPrams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryPrams.push('price=' + this.state.totalPrice);
    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryPrams.join("&"),
    });
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

    let orderSummary = null;

    let burgerAndControls = this.state.error ? (
      <p>Ingredients can'tb be loaded</p>
    ) : (
      <Spinner class={"Center"} />
    );

    if (this.state.ingredients) {
      burgerAndControls = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          purchaseCancelled={this.modalCloseHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          modalClosed={this.modalCloseHandler}
          show={this.state.purchaseMode}
        >
          {orderSummary}
        </Modal>
        {burgerAndControls}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
