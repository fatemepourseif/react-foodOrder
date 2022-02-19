import React from "react";

import classes from "./Header.module.css";

import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShow={props.onShowHandler}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="a table full of delicious foods!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
