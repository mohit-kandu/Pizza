import React, { Component } from 'react';
import { ingredientsInfoStatic, pizzaCrustImage } from './../Special/IngredientsInfo.js';

import IngredientBlock from './IngredientBlock/IngredientBlock.js';
import ShowScreen from './ShowScreen/ShowScreen.js';
import OrderSummary from './../Ordering/OrderSummary.js';
import { connect } from 'react-redux';
import * as actions from './../store/actions/actions.js';


class PizzaBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsInfo: { ...ingredientsInfoStatic },
      basePrice: 3.00,
      checkoutPageActivated: false,
      loadWindowActivated: false,
    };
    this.fillPizzaComposition();

  }

  fillPizzaComposition = () => {
    this.props.onLoadInitialComposition(this.generateEmptyPizza());
  };

  generateEmptyPizza = () => {
    let tempPizzaObject = {};

    let keysArray = Object.keys(this.state.ingredientsInfo);
    for (let i = 0; i < keysArray.length; i++) {
      tempPizzaObject[keysArray[i]] = 0;
      console.log(tempPizzaObject)
    }

    return tempPizzaObject;
  };


  calculateTotalPrice = () => {
    let total = this.state.basePrice;
    let keysIngredients = Object.keys(this.props.pizzaComposition);
    for (let i = 0; i < keysIngredients.length; i++) {
      total += this.props.pizzaComposition[keysIngredients[i]] * this.state.ingredientsInfo[keysIngredients[i]].price;
    }

    return parseFloat(Math.round(total * 100) / 100).toFixed(2);
  };


  clickHandler = (type, value) => {
    if (value) {
      this.props.onIncrementIngredient(type);
      this.props.pizzaSavedHandler(false);
    }
    else {
      if (this.props.pizzaComposition[type] > 0) {
        this.props.onDecrementIngredient(type);
        this.props.pizzaSavedHandler(false);
      }
    }

    this.checkoutPageToggler(false);
  };

  enableCheckoutButton = () => {
    return this.calculateTotalPrice() !== parseFloat(Math.round(this.state.basePrice * 100) / 100).toFixed(2);
  };

  //Reset the pizza
  resetPizza = () => {
    this.props.onLoadInitialComposition(this.generateEmptyPizza());
    this.props.pizzaSavedHandler(false);
    this.checkoutPageToggler(false);

  };

  //Modify the checkoutActivated
  checkoutPageToggler = (bool) => {
    this.setState({ checkoutPageActivated: bool });
  };


  render() {

    let orderWindow = null;

    if (this.enableCheckoutButton() && this.state.checkoutPageActivated) {
      orderWindow = <OrderSummary
        checkoutPageToggle={this.checkoutPageToggler}
        ingredientsInfo={this.state.ingredientsInfo}
        pizzaComposition={this.props.pizzaComposition}
        totalPrice={this.calculateTotalPrice()}
      />;
    }

    let loadWindow = null;
    return (
      <main role="main" className="container">
        {loadWindow}
        <div className="container">
          {orderWindow}
          <div className="py-5 text-center">
            <h2>Pizza Fast</h2>
            <p className="lead">Create your custom pizza with just a few clicks.</p>
          </div>

          <div className="row">
            <ShowScreen
              pizzaComposition={this.props.pizzaComposition}
              ingredientsInfo={this.state.ingredientsInfo}
              pizzaCrustImage={pizzaCrustImage}
            />
            <IngredientBlock
              totalPrice={this.calculateTotalPrice()}
              ingredientsInfo={this.state.ingredientsInfo}
              pizzaComposition={this.props.pizzaComposition}
              clickHandler={this.clickHandler}
              checkoutEnabled={this.enableCheckoutButton()}
              resetHandler={this.resetPizza}
              checkoutHandler={this.checkoutPageToggler}
            />
          </div>

        </div>
      </main>
    );
  };

}

const mapStateToLocalProps = state => {
  return {
    pizzaComposition: state.pizzaReducer,
    pizzaBuild: state.pizzaBuild,
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    onLoadInitialComposition: (initialComposition) => dispatch({ type: actions.COMPOSITION_INITIALIZE, payload: initialComposition }),
    onIncrementIngredient: (ingredientType) => dispatch({ type: actions.COMPOSITION_INCREMENT, payload: { ingredient: ingredientType } }),
    onDecrementIngredient: (ingredientType) => dispatch({ type: actions.COMPOSITION_DECREMENT, payload: { ingredient: ingredientType } }),
    pizzaSavedHandler: (value) => dispatch({ type: actions.BUILD_SAVED, payload: { isSaved: value } }),
  }
};


export default connect(mapStateToLocalProps, mapDispatchActionsToProps)(PizzaBuilder);
