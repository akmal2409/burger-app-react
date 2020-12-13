import React, { useState, useEffect } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { checkValidity } from '../../../components/Validator/Validator';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        digits: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email",
      },
      value: "",
      validation: {
        required: true,
        email: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      valid: true,
      value: "fastest",
    },
  });

  const [isValidForm, setIsValidForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = {};

    for (let id in orderForm) {
      formData[id] = orderForm[id].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        console.log(response);
        props.history.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const touchedHandler = (id) => {
    const updatedForm = {...orderForm};
    const updatedFormElement = {...updatedForm[id]};

    updatedFormElement.touched = true;
    updatedForm[id] = updatedFormElement;
    setOrderForm(updatedForm);
  }

  const inputChangedHandler = (event, id) => {
    const updatedForm = {
      ...orderForm,
    };

    const updatedFormElement = {
      ...updatedForm[id],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[id] = updatedFormElement;

    let isFormValid = true;

    for (let id in updatedForm) {
      if (!updatedForm[id].valid) {
        isFormValid = false;
        break;
      }
    }
    console.log(isFormValid);
    setOrderForm(updatedForm);
    setIsValidForm(isFormValid);
  };

  const formElementsArray = Object.keys(orderForm).map((key) => {
    return { id: key, config: orderForm[key] };
  });

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          clicked={() => touchedHandler(formElement.id)}
          key={formElement.id}
          touched={formElement.config.touched}
          invalid={!formElement.config.valid}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          change={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!isValidForm}>ORDER</Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
