import React, { useContext } from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from './../../../store/cart-context';

const MealItem = (props) => {
  const CartCtx = useContext(CartContext);

  const onAddToItemHandler = (amount) => {
    CartCtx.addItem({
      name: props.name,
      price: props.price,
      amount: amount,
      id:props.id 
    });
  };

  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToItem={onAddToItemHandler} />
      </div>
    </li>
  );
};

export default MealItem;
