import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './reducers';

import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div> { /* This div is needed otherwise BrowserRouter won't wrap things properly */ }
        <Header />
        <div className="app-body">
          <Switch>
          {/* Need to place most specific routes at the top of Switch, */}
          {/* because the first match will be used, and "/" matches everything */}
          <Route path="/" component={Home} />
        </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#app'));
