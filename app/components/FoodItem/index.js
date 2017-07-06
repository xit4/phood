import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class FoodItem extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
  }

  render() {
    const {food, onClickFood, onAddFood} = this.props;
    return (
      <div className='food-item'>
        <div
          className='food'
          onClick={() => {onClickFood(food.ndbno)}}>
            {food.name}
        </div>
        <div
          className='add'
          onClick={() => {onAddFood(food)}}>
            +
        </div>
      </div>
    )
  }
}

FoodItem.propTypes = {
  food: PropTypes.object.isRequired,
  onClickFood: PropTypes.func.isRequired,
  onAddFood: PropTypes.func.isRequired
}

FoodItem.defaultProps = {
  food: {}
}


export default FoodItem;
