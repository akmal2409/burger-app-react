import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actionTypes";
import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


class BurgerBuilder extends Component {
  state = {
    purchaseMode: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  purchaseHandler = () => {
    this.setState({ purchaseMode: true });
  };

  purchaseContinueHandler = () => {
    const queryPrams = [];
    for (let i in this.state.ingredients) {
      queryPrams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryPrams.push("price=" + this.state.totalPrice);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryPrams.join("&"),
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

    return totalIngredients > 0;
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
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

    if (this.props.ingredients) {
      burgerAndControls = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            totalPrice={this.props.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          purchaseCancelled={this.modalCloseHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.props.ingredients}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: ingredientName,
      }),
    onRemoveIngredient: (ingredientName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingredientName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));


// addIngredientHandler = (type) => {
//   let ingredientCount = this.state.ingredients[type];

//   const updated = {
//     ...this.state.ingredients,
//   };

//   updated[type] = ++ingredientCount;
//   // let updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

//   // this.setState({ ingredients: updated, totalPrice: updatedPrice });
//   this.updatePurchaseState(updated);
// };

// removeIngredientHandler = (type) => {
//   let ingredientCount = this.state.ingredients[type];

//   const updated = {
//     ...this.state.ingredients,
//   };

//   updated[type] = ingredientCount > 0 ? --ingredientCount : 0;

//   // const updatedPrice =
//     // INGREDIENT_PRICES[type] < this.state.totalPrice
//       // ? this.state.totalPrice - INGREDIENT_PRICES[type]
//       // : 0;

//   // this.setState({ ingredients: updated, totalPrice: updatedPrice });
//   this.updatePurchaseState(updated);
// };