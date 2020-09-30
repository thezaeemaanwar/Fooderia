import React from "react";
import style from './recipe.module.css';

export default function Recipe({ title, calories, image, ingredients }) {
  return (
    <div className = {style.Recipe}>
      <h2>{title}</h2>
      <h3 className ={style.calories} >Ingredients</h3>
      <ol>
          {ingredients.map(ingredient => (
              <li key = {ingredients.indexOf(ingredient.text)}>{
                ingredient.text}</li>
          ))}
      </ol>
      <h3 className = {style.calories} >Calories : {calories}</h3>
      <img className = {style.image} src={image} alt={title} />
    </div>
  );
}
