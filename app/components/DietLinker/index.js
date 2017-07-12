import React from 'react';
import PropTypes from 'prop-types';
import DietGrid from '../DietGrid';
import Header from '../Header';
import storage from '../../utils/storage';
import './style.scss';

class DietLinker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dietsList: []
    };
    this.handleDeleteDiet = this.handleDeleteDiet.bind(this);
    this.setStateCallback = this.setStateCallback.bind(this);
  }

  componentDidMount() {
    const initialDietsList = storage.getStoredObject('dietsList', []);
    this.setState({dietsList: initialDietsList});
  }

  handleDeleteDiet(dietToDelete) {
    const {dietsList} = this.state;
    const newDietsList = [...dietsList].filter(diet => diet.id !== dietToDelete.id);
    storage.storeObject('dietsList', newDietsList, this.setStateCallback);
  }

  setStateCallback(obj) {
    this.setState(obj)
  }

  render() {
    const {dietsList} = this.state;

    return (
      <div className='diet-linker'>
        <Header hasSearchEngine={false}/>
        <div className='diet-linker-body'>
          <span className='title'>Your diets</span>
          <hr></hr>
          {(dietsList.length > 0 && <DietGrid dietsList={dietsList} onSelectDiet={diet => {
            this.props.history.push(`/diet/${diet.id}`)
          }} onDeleteDiet={this.handleDeleteDiet}/>) || <span className='message'>You have no diets</span>}
        </div>
      </div>
    )
  }
}

DietLinker.propTypes = {}

export default DietLinker;
