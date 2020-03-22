/* eslint-disable import/no-named-as-default */
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import Dashboard from '../pages/Dashboard/Dashboard';
import Countries from '../pages/Countries/Countries'
import { HashRouter, Route, Link } from "react-router-dom";
import India from "../pages/India/India";
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <HashRouter basename='/'>
          <Route exact path="/" component={Dashboard} />
          <Route path="/countries" component={Countries} />
          <Route path="/india" component={India} />
        </HashRouter>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
