import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import Home from './components/Home';
import Diet from './components/Diet';
import MineSweeper from './components/MineSweeper';
import DietLinker from './components/DietLinker';
import './index.scss';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route path='/minesweeper' component={MineSweeper} />
          <Route path='/diet/:dietId' component={Diet} />
          <Route path='/diet' component={DietLinker} />
          <Route path='/' component={Home} />
          <Route render={
            function () {
              return <p>Not Found</p>
            }
          }/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('app'));
