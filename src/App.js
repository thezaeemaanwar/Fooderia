import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = '23b19a81';
  const APP_KEY = '10d454b3c2543dcdf8e1858b3e1b8f51';

  // The Recepies Fetched
  const [Recipes, setRecipes] = useState([]);
  // The value tyoed in search
  const [Search, setSearch] = useState('');
  // Complete Search
  const [Query, setQuery] = useState('');
  // Health Type
  const [Health, setHealth] = useState('alcohol-free');
  // Diet Type
  const [Diet, setDiet] = useState('balanced');

  // The rendering function
  useEffect(() => {
    (async () => getRecepies())();
  }, [Query]);

  const exampleRed = `https://api.edamam.com/search?q=${Query}&app_id=${APP_ID}&app_key=${APP_KEY}&diet=${Diet}&health=${Health}`;

  // Fetch data from the API and set the state of Recipe
  const getRecepies = async () => {
    const response = await fetch(exampleRed);
    const data = await response.json();
    setRecipes(data.hits);
  };

  // Update the state Search on every change
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // Get the value of Search when a complete word is entered
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(Search);
    setHealth(document.getElementById('health').value);
    setDiet(document.getElementById('diet').value);
    setSearch('');
    window.location = '#recipe';
  };

  // Capitalize the first letter of word
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className='App'>
      <h1 className='header'>Welcome to fooderia</h1>
      <h3 className='description'>
        Get the recipes of your favorite foods Type in the Search bar what you
        want to make alongwith the calories and food-type{' '}
      </h3>
      <div className='navbar'>
        <div id='logo'>
          <h2>fooderia</h2>
        </div>
        <form onSubmit={getSearch} className='search-form'>
          <select className='dropdown' id='health'>
            <option value='alcohol-free'> Alcohol Free</option>
            <option value='tree-nut-free'> Tree Nut free </option>
            <option value='peanut-free'> Peanut Free </option>
            <option value='sugar-conscious'> Sugar Conscious </option>
            <option value='vegan'> Vegan </option>
            <option value='vegetarian'> Vegetarian </option>
          </select>
          <select className='dropdown' id='diet'>
            <option value='balanced'> Balanced </option>
            <option value='high-protein'> High Protein </option>
            <option value='low-carb'> Low Carb </option>
            <option value='low-fat'> Low Fat </option>
          </select>

          <input
            className='search-bar'
            type='text'
            value={Search}
            onChange={updateSearch}
          />
          <a href='#head' className='search-button' type='submit'>
            View
          </a>
        </form>
      </div>
      <div id='head'>
        <h1 className='heading'>{capitalize(Query)} Recipes</h1>
        <div className='recipes'>
          {Recipes.map((recipe) => (
            <Recipe
              key={Recipes.indexOf(recipe)}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories.toFixed(5)}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
