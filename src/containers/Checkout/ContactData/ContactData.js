import React, { useState, useEffect } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

const ContactData = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({ street: "", postalCode: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(props.price);
  });

  const updateStreetHandler = (event) => {
    const updatedAddress = { ...address };
    updatedAddress.street = event.target.value;
    setAddress(updatedAddress);
  };

  const updatePostalCodeHandler = (event) => {
    const updatedAddress = { ...address };
    updatedAddress.postalCode = event.target.value;
    setAddress(updatedAddress);
  };

  const orderHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: name,
        address: {
          street: address.street,
          zipCode: address.postalCode,
          country: "Netherlands",
        },
        email: email,
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        console.log(response);
        props.history.replace('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let form = (<form>
    <input
      type="text"
      onChange={(event) => setName(event.target.value)}
      name="name"
      placeholder="Your name"
    />
    <input
      type="email"
      onChange={(event) => setEmail(event.target.value)}
      name="email"
      placeholder="Your email"
    />
    <input
      type="text"
      onChange={(event) => updateStreetHandler(event)}
      name="street"
      placeholder="Street"
    />
    <input
      type="text"
      onChange={(event) => updatePostalCodeHandler(event)}
      name="postCode"
      placeholder="Post Code"
    />
    <Button btnType="Success" clicked={orderHandler}>
      ORDER
    </Button>
  </form>);

  if(loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      { form }
    </div>
  );
};

export default ContactData;
