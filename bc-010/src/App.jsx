// @flow
import './styles/reset.css';
import rootReducer from './rootReducer';

import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

import ThemeWrapper from './components/ThemeWrapper';

const middleware = [];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

type Props = {};
type State = {};

class App extends Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <ThemeWrapper />
      </Provider>
    );
  }
}

export default App;
