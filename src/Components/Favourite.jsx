import React from "react";
import { useMyContext } from "../context";

function Favourite() {
  const { removeFromFav, favourite, selectMeals } = useMyContext();
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>favorites</h5>
        <div className="favorites-container">
          {favourite.map((item) => {
            const { idMeal, strMealThumb: image } = item;
            return (
              <div className="favorite-item" key={idMeal}>
                <img
                  className="favorites-img img "
                  src={image}
                  onClick={() => selectMeals(idMeal, true)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFav(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Favourite;
