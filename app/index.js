import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import Home from './components/Home';
import Diet from './components/Diet';
import MineSweeper from './components/MineSweeper';
import DietLinker from './components/DietLinker';
import './index.scss';

ReactDOM.render(
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
  </BrowserRouter>, document.getElementById('app'));
