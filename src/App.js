import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



//Importing the components
import PizzaBuilder from './PizzaBuilder/PizzaBuilder.js';
import IngredientList from './Ingredients/IngredientList.js';
import Layout from './Layout/Layout.js';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Layout>
            <div className="appSpacer"></div>
            <Switch>
              <Route path="/" exact component={PizzaBuilder} />
              <Route path="/ingredients" component={IngredientList} />
              <Route path="/" component={PizzaBuilder} />
            </Switch>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
