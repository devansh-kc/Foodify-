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

  function selectMeals(id, favMeal) {
    let meal;
    meal = meals.find((meal) => meal.idMeal === id);
    setSelectedMeal(meal);
    setShowModal(true);
    console.log(id);
  }

  function closeModal() {
    setShowModal(() => !true);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useMyContext = () => {
  return useContext(AppContext);
};
