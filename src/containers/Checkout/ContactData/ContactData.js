import React, { useState } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

const ContactData = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({ street: "", postalCode: "" });

  return(
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postCode" placeholder="Post Code" />
        <Button btnType="Success">ORDER</Button>
      </form>
    </div>
  );
};

export default ContactData;
