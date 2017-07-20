import React from 'react';
import PropTypes from 'prop-types';
import FoodItem from '../FoodItem';
import Modal from '../Modal';
import NutrientsLister from '../NutrientsLister';

export default class FoodLister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedFood: null
    };
    this.handleClickFood = this.handleClickFood.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(open) {
    this.setState({isModalOpen: open});
  }

  handleClickFood(foodId) {
    this.toggleModal(true);
    this.props.fetchFoodInfo(foodId);
    this.setState({selectedFood: foodId})
  }

  render() {
    const {
      foodList,
      onAddFood,
      errors,
      onLoadMore,
      moreToLoad
    } = this.props;
    const { selectedFood } = this.state;
    const foodDetail = foodList[selectedFood];
    return (
      <div>
        <Modal
          className='nutrients-modal'
          isOpen={this.state.isModalOpen}
          onClose={()=>{this.toggleModal(false)}}>
          { foodDetail !== undefined &&
            <div>
              <span className='title'>{foodDetail.name}</span>
              <hr></hr>
              <NutrientsLister
                nutrientsList={foodDetail.nutrients}/>
            </div>
          }
          { foodDetail === undefined &&//TODO spinner
            <div>
              Spinner
            </div>
          }
        </Modal>
        <div className='food-lister'>
          {!_.isEmpty(foodList) && !errors.foodListError &&
            _.map(foodList,food =>{
              return(
                <FoodItem
                  key={food.name}
                  food={food}
                  onClickFood={this.handleClickFood}
                  onAddFood={onAddFood}/>
              )
            })
          }
          { errors.foodListError &&
            <span>{errors.foodListError}</span>
          }
        </div>
        <div className='load-more' onClick={onLoadMore}>
          { moreToLoad &&
            <div>Load More</div>}
        </div>
      </div>
    )
  }
}

FoodLister.propTypes = {
  foodList: PropTypes.object.isRequired,
  onAddFood: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  moreToLoad: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
}

FoodLister.defaultProps = {
  foodList: {},
  onAddFood: () => {},
  onLoadMore: () => {},
  errors: '',
  moreToLoad: ''
}
