import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

const ContactData = React.lazy(() => import("./ContactData/ContactData"));

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: +price });
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
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => {
            return (
              <Suspense fallback={<Spinner />}>
                <ContactData {...props} price={this.state.totalPrice.toFixed(2)} ingredients={this.state.ingredients} />
              </Suspense>
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
