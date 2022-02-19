import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const hasFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = hasFiveChar(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };
  const nameIsNotValid = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetIsNotValid = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalCodeIsNotValid = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityIsNotValid = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div className={nameIsNotValid}>
        <label htmlFor="name">Your name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetIsNotValid}>
        <label htmlFor="street">Your address</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeIsNotValid}>
        <label htmlFor="postal">Postal code</label>
        <input id="postal" type="text" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters)</p>
        )}
      </div>
      <div className={cityIsNotValid}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
