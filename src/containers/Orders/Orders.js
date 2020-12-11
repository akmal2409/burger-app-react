import React, { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders.json")
      .then((response) => {
        console.log(response.data);
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        setOrders(fetchedOrders);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  let orderComponents = <Spinner />;

  if (orders) {
    orderComponents = orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      );
    });
  }

  return <div>{orderComponents}</div>;
};

export default withErrorHandler(Orders, axios);
