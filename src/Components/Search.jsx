import React from "react";
import { useState } from "react";
import { useMyContext } from "../context";

function Search() {
  const { setSearchTerm, randomFetchMeals } = useMyContext();
  const [searchMeal, SetSearchMeal] = useState("");

  function changeHandler(e) {
    SetSearchMeal(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchMeal) {
      setSearchTerm(searchMeal);
      SetSearchMeal("");
    }
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          value={searchMeal}
          onChange={changeHandler}
        />
        <button type="submit" className="btn">
          submit
        </button>
        <button
          className="btn btn-hipster"
          onClick={randomFetchMeals}
          type="button"
        >
          surprise me
        </button>
      </form>
    </header>
  );
}
export default Search;
