import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [inputIsValid, setInputIsValid] = useState(true);
  const refEnteredInput = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredInputAmount = refEnteredInput.current.value;
    const enteredInputAmountNumber = +enteredInputAmount;
    if (
      enteredInputAmount.trim().length === 0 ||
      enteredInputAmountNumber < 1 ||
      enteredInputAmountNumber > 5
    ) {
      setInputIsValid(false);
      return;
    }
    props.onAddToItem(enteredInputAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={refEnteredInput}
        label="Amount"
        input={{
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          type: "number",
          id: "amount_" + props.id,
        }}
      />
      <button>+ Add</button>
      {!inputIsValid && <p>please Enter a Valid amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
