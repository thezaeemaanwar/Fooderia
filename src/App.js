import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";

import "./App.css";

const App = () => {
  const APP_ID = "23b19a81";
  const APP_KEY = "10d454b3c2543dcdf8e1858b3e1b8f51";

  const [Recipes, setRecipes] = useState([]);
  const [Search, setSearch] = useState("");
  const [Query, setQuery] = useState("");

  useEffect(() => {
    (async () => getRecepies())();
  }, [Query]);

  const exampleRed = `https://api.edamam.com/search?q=${Query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

  const getRecepies = async () => {
    const response = await fetch(exampleRed);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(Search);
    setSearch("");
  };

  const capitalize = (word) =>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={Search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <h1>{capitalize(Query)} Recipes</h1>
      {Recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;
