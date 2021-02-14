import React from 'react';
import { NavLink } from 'react-router-dom';
import { ingredientsInfoStatic } from './../Special/IngredientsInfo.js';

const ingredientList = () => {
  return (
    <main role="main" className="container">
      <h2>Here are the ingredients that the pizza uses:</h2>
      <div className="container ingredientList">
        {
          Object.keys(ingredientsInfoStatic).map((ingredientKey, index) => {
            return (
              <div className="ingredientLink" key={ingredientKey + "-" + index}>
                <NavLink to={"/ingredients/" + ingredientKey} exact activeClassName="activeLink">
                  <div
                    className="card ingredientContainer"
                    style={{ backgroundImage: "url(" + ingredientsInfoStatic[ingredientKey].image + ")" }}
                  >
                  </div>
                </NavLink>
                <h4>{ingredientsInfoStatic[ingredientKey].display}</h4>
              </div>
            );
          })
        }
      </div>
    </main>
  );
};

export default ingredientList;
