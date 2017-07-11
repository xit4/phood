import React from 'react';
import PropTypes from 'prop-types';
import DietLister from '../DietLister';
import Total from '../Total';
import Header from '../Header';
import storage from '../../utils/storage';
import './style.scss';

class Diet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dietsList: []
    };

    this.handleDeleteFood = this.handleDeleteFood.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.setStateCallback = this.setStateCallback.bind(this);
  }

  handleChangeQuantity(food, quantity) {
    const {dietId} = this.props.match.params;
    const {dietsList} = this.state;
    let newDietsList = [...dietsList]
    newDietsList[dietId].items[food.ndbno].quantity = quantity;
    storage.storeObject('dietsList', newDietsList, this.setStateCallback);
  }

  handleDeleteFood(food) {
    const {dietId} = this.props.match.params;
    const {dietsList} = this.state;
    let newDietsList = [...dietsList];
    delete newDietsList[dietId].items[food.ndbno];

    storage.storeObject('dietsList', newDietsList, this.setStateCallback);
  }

  componentDidMount() {
    const initialDietsList = storage.getStoredObject('dietsList', []);
    this.setState({dietsList: initialDietsList});
  }

  setStateCallback(obj) {
    this.setState(obj)
  }

  render() {
    const {dietId} = this.props.match.params;
    const {dietsList} = this.state;
    const diet = dietsList[dietId] || {};
    const itemList = diet.items ? Object.keys(diet.items).map(ndbno => diet.items[ndbno]) : [];

    return (
      <div className='diet-container'>
        <Header
          hasSearchEngine={false}/>
        <div className='diet'>
          <div className='left'>
            <DietLister
              dietName ={diet.name}
              dietList={itemList}
              onChangeQuantity={this.handleChangeQuantity}
              onDeleteFood={this.handleDeleteFood}/>
          </div>
          <div className='right'>
            <Total dietList={itemList} />
          </div>
          </div>
        </div>
    )
  }
}

Diet.propTypes = {}

export default Diet;
