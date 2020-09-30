import React from "react";

export default function Recipe({ title, calories, image }) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>Calories = {calories}</h2>
      <img src={image} alt={title} />
    </div>
  );
}
