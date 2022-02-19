import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";
import CartContext from "./../../store/cart-context";

const HeaderCartButton = (props) => {
  const [buttonIsHighLighted, setButtonIsHighLighted] = useState(false);

  const CartCtx = useContext(CartContext);
  const { items } = CartCtx;
  const numberOfCartContext = items.reduce((CurNumber, item) => {
    return CurNumber + item.amount;
  }, 0);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighLighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const buttonClasses = `${classes.button} ${
    buttonIsHighLighted ? classes.bump : ""
  }`;
  return (
    <button className={buttonClasses} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartContext}</span>
    </button>
  );
};

export default HeaderCartButton;
