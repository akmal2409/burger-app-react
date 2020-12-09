import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route
              path="/checkout"
              render={(props) => (
                <Suspense fallback={<Spinner />}>
                  <Checkout {...props} />
                </Suspense>
              )}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
