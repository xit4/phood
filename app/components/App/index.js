import React from 'react';
import PropTypes from 'prop-types';
import Home from '../Home';
import ReactRouter from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import './style.scss';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route render={
                function () {
                  return <p>Not Found</p>
                }
              }/>
          </Switch>
        </div>
      </Router>

    )
  }
}

App.propTypes = {

}


export default App;