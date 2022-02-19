import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "./../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState();
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const onRemoveItem = (id) => {
    cartCtx.removeItem(id);
  };
  const onAddItem = (item) => {
    cartCtx.addItem(item);
  };
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          name={item.name}
          key={item.id}
          price={item.price}
          amount={item.amount}
          onRemove={onRemoveItem.bind(null, item.id)}
          onAdd={onAddItem.bind(null, item)}
        />
      ))}
    </ul>
  );
  const onOrderHandler = () => {
    setIsCheckout(true);
  };
  const onConfirmHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://foodorder-30a3e-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        order: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const theCart = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={onConfirmHandler} onClose={props.onHideHandler} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onHideHandler}
          >
            Close
          </button>
          {hasItem && (
            <button className={classes.button} onClick={onOrderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
  const whileIsSubmitting = (
    <React.Fragment>
      <p>Sending The Data ...</p>
    </React.Fragment>
  );
  const whenCartDidSubmit = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onHideHandler}
        >
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onHide={props.onHideHandler}>
      {isSubmitting && !didSubmit && whileIsSubmitting}
      {didSubmit && !isSubmitting && whenCartDidSubmit}
      {!didSubmit && !isSubmitting && theCart}
    </Modal>
  );
};

export default Cart;
