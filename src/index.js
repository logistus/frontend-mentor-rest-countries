import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CountryDetails from './components/CountryDetails';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ThemeProvider from './Provider';

ReactDOM.render(
  <ThemeProvider>
    <Header />
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:country_code">
          <CountryDetails />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
