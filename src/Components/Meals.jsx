import React from "react";
import { useMyContext } from "../context";
import { AiOutlineLike } from "react-icons/ai";
function Meals() {
  const { meals, loading, selectMeals } = useMyContext();

  if (loading) {
    return (
      <section className="section-center">
        <h4>Loading ....</h4>
      </section>
    );
  }
  /* The code block `if (meals.length == null)` is checking if the `meals` array is empty or null. If it
is, it means that no meals matched the searched term, and a message is displayed to the user saying
"No meals matched your searched term. Please try again". */
  if (meals.length == null) {
    return (
      <section className="section">
        <h4>No meals matched your searched term. Please try again</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              alt={title}
              className="img"
              onClick={() => selectMeals(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn">
                <AiOutlineLike />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
}
export default Meals;
