import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "./../UI/Card";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch(
        "https://foodorder-30a3e-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>IS LOADING ...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.errorMessage}>
        <p>{error}</p>
      </section>
    );
  }
  return (
    <Card className={classes.meals}>
      <ul>
        {meals.map((meal) => (
          <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
