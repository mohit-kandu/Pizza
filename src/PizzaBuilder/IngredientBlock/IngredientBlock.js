import React from 'react';

//Ingredients needed
import IngredientIndividual from './IngredientIndividual.js';



const IngredientBlock = (props) => {

  let classesButtonCheckout = "btn btn-primary";

  if (!props.checkoutEnabled) {
    classesButtonCheckout += " disabled";
  }
  return (
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your pizza</span>
        <span className="badge badge-secondary badge-pill">${props.totalPrice}</span>
        <button type="button" className="btn btn-warning" onClick={props.resetHandler}>Reset pizza</button>
      </h4>
      <ul className="list-group mb-3">
        {
          Object.keys(props.ingredientsInfo).map((aKey, index) => {
            return (
              <IngredientIndividual
                name={props.ingredientsInfo[aKey].display}
                price={props.ingredientsInfo[aKey].price}
                quantity={props.pizzaComposition[aKey]}
                key={aKey + '-' + index}
                type={aKey}
                clickHandler={props.clickHandler}
              />
            );
          })
        }
        <li className="list-group-item d-flex justify-content-between bg-light">
          <span>Total</span>
          <strong>${props.totalPrice}</strong>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <button type="button" className={classesButtonCheckout} onClick={() => { if (props.checkoutEnabled) { props.checkoutHandler(true); } }}>Checkout</button>
        </li>
      </ul>

    </div>
  );
};

export default IngredientBlock;
