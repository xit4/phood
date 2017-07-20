import React from 'react';
import PropTypes from 'prop-types';
import DietLister from '../DietLister';
import Total from '../Total';
import Header from '../Header';
import storage from '../../utils/storage';
import { updateFoodQuantity, deleteFood, updateFoodNutrients } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import './style.scss';

class Diet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleDeleteFood = this.handleDeleteFood.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.setStateCallback = this.setStateCallback.bind(this);
  }

  handleChangeQuantity(food, quantity) {
    const { dietId } = this.props.match.params;
    this.props.updateFoodQuantity(dietId, food.ndbno, quantity)
  }

  handleDeleteFood(food) {
    const { dietId } = this.props.match.params;
    this.props.deleteFood(dietId, food.ndbno);
  }

  componentDidMount() {
    const { dietId } = this.props.match.params;
    const { dietsList } = this.props;
    const foodIdArray = _.keys(dietsList[dietId].items)
    this.props.updateFoodNutrients(foodIdArray);
  }

  setStateCallback(obj) {
    this.setState(obj)
  }

  render() {
    const { dietId } = this.props.match.params;
    const diet = this.props.dietsList[dietId] || {};
    const { savedFoods } = this.props;
    return (
      <div className='diet-container'>
        <Header
          hasSearchEngine={false}/>
        <div className='diet'>
          <div className='left'>
            <DietLister
              dietName ={diet.name}
              dietList={_.map(diet.items, item => {
                return {
                  ...item,
                  ...savedFoods[item.ndbno]
                }
              })}
              onChangeQuantity={this.handleChangeQuantity}
              onDeleteFood={this.handleDeleteFood}/>
          </div>
          <div className='right'>
            {<Total
              dietList={diet.items}
              foodNutrientsArray={_.map(diet.items, food => savedFoods[food.ndbno])}
             />}
          </div>
        </div>
      </div>
    )
  }
}

Diet.propTypes = {}

function mapStateToProps({ dietsList, savedFoods }){
  return { dietsList, savedFoods };
}

export default connect(mapStateToProps, { updateFoodQuantity, deleteFood, updateFoodNutrients })(Diet);
