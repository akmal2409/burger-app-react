import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends Component {
  state = {
    ingredients: null,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let checkout = <Spinner />;

    if (this.state.ingredients) {
      checkout = (
        <CheckoutSummary
          canceled={this.checkoutCanceledHandler}
          continued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
      );
    }

    return (
      <div>
        {checkout}
      </div>
    );
  }
}

export default Checkout;
