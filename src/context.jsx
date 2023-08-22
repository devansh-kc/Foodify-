import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext(" hi");

const SearchedUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=c";
const SearchByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

export function AppProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeals, setSelectedMeal] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [favourite, setFavourite] = useState(getFavFromLocalStorage);

  function selectMeals(id, favMeal) {
    let meal;
    if (favMeal) {
      meal = favourite.find((meal) => meal.idMeal === id);
    } else {
      meal = meals.find((meal) => meal.idMeal === id);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  }

  function addToFav(id) {
    const meal = meals.find((meal) => meal.idMeal === id);
    const alreadyFav = favourite.find((meal) => meal.idMeal == id);
    if (alreadyFav) return;
    /* The line `const updatedFav = [...favourite, meal]` is creating a new array called `updatedFav` by
   spreading the elements of the `favourite` array and adding the `meal` object at the end. This is
   a way to add a new element to an existing array without modifying the original array. */
    const updatedFav = [...favourite, meal];
    setFavourite(updatedFav);

    localStorage.setItem("favourite", JSON.stringify(updatedFav));
  }
  function removeFromFav(id) {
    const updatedFavourite = favourite.filter((meal) => meal.idMeal !== id);
    setFavourite(updatedFavourite);
    localStorage.setItem("favourite", JSON.stringify(updatedFavourite));
  }

  function closeModal() {
    setShowModal(() => !true);
  }

  function getFavFromLocalStorage() {
    let Favv = localStorage.getItem("favourite");
    if (Favv) {
      Favv = JSON.parse(localStorage.getItem("favourite"));
    } else {
      Favv = [];
    }
    return Favv;
  }

  async function fetchMeals(url) {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      console.log(data);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  }
  async function randomFetchMeals() {
    fetchMeals(randomUrl);
  }

  useEffect(() => {
    fetchMeals(`${SearchByName}${searchTerm}`);
  }, [searchTerm]);
  useEffect(() => {
    fetchMeals(`${SearchedUrl}`);

    // randomFetchMeals();
  }, []);
  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        randomFetchMeals,
        showModal,
        selectMeals,
        closeModal,
        selectedMeals,
        addToFav,
        favourite,

        removeFromFav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useMyContext = () => {
  return useContext(AppContext);
};
