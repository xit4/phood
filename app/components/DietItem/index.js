import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class DietItem extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
  }

  render() {
    const {food, onChangeQuantity, onDeleteFood} = this.props;
    return (
      food &&
        <div className='diet-item'>
          <div className='item-container'>
            <img
              className='delete-item'
              src='./app/img/delete-icon.png'
              onClick={()=>{onDeleteFood(food)}}/>
            <span>-{food.name}</span>
          </div>
          <input
            type='text'
            maxLength='4'
            placeholder= 'g'
            value={food.quantity}
            onChange={e => {
                onChangeQuantity(food, parseInt(e.target.value ? e.target.value: '0'))
              }
            }/>
        </div>
    )
  }
}

DietItem.propTypes = {
  food: PropTypes.object.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  onDeleteFood: PropTypes.func.isRequired,
}

DietItem.defaultProps = {
  food: null
}

export default DietItem;
