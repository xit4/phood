import React from 'react';
import PropTypes from 'prop-types';
import FoodItem from '../FoodItem';
import manager from '../../utils/manager';
import Modal from '../Modal';
import NutrientsLister from '../NutrientsLister';
import './style.scss';

class FoodLister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      foodDetail: null
    };
    this.handleClickFood = this.handleClickFood.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(open) {
    this.setState({isModalOpen: open});
  }

  handleClickFood(foodId) {
    this.toggleModal(true);
    manager.retrieveFoodInfo(foodId, (obj) => (this.setState(obj)));
  }

  render() {
    const {foodList, onAddFood, errorMessage} = this.props;
    const {foodDetail} = this.state;
    return (
      <div>
        <Modal
          className='nutrients-modal'
          isOpen={this.state.isModalOpen}
          onClose={()=>{this.toggleModal(false)}}>
          { foodDetail !== null &&
            <div>
              <span className='title'>{foodDetail.desc.name}</span>
              <hr></hr>
              <NutrientsLister
                nutrientsList={foodDetail.nutrients}/>
            </div>
          }
          { foodDetail === null &&//TODO spinner
            <div>
              Spinner
            </div>
          }
        </Modal>
        <div className='food-lister'>
          {foodList.length > 0 && !errorMessage &&
            foodList.map(food =>{
              return(
                <FoodItem
                  key={food.name}
                  food={food}
                  onClickFood={this.handleClickFood}
                  onAddFood={onAddFood}/>
              )
            })
          }
          { errorMessage &&
            <span>{errorMessage}</span>
          }
        </div>
      </div>
    )
  }
}

FoodLister.propTypes = {
  foodList: PropTypes.array.isRequired,
  onAddFood: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
}

FoodLister.defaultProps = {
  foodList: [],
  onAddFood: () => {},
  errorMessage: ''
}

export default FoodLister;
