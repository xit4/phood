import React from 'react';
import PropTypes from 'prop-types';
import storage from '../../utils/storage';
import manager from '../../utils/manager';
import Header from '../Header';
import FoodLister from '../FoodLister';
import Modal from '../Modal';
import Diet from '../Diet';
import './style.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      foodList: [],
      dietList: [],
      errorMessage: ''
    };
    this.handleSubmitFoodName = this.handleSubmitFoodName.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleAddFood = this.handleAddFood.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOpenDiet = this.handleOpenDiet.bind(this);
    this.handleDeleteFood = this.handleDeleteFood.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.setStateCallback = this.setStateCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state === 'resetState') {
      this.resetState();
    }
  }

  componentDidMount() {
    const initialDietList = storage.getStoredObject('dietList', []);
    this.setState({dietList: initialDietList});
  }

  handleSubmitFoodName(foodName) {
    manager.retrieveFoodListAndUpdateState(foodName, this.setStateCallback, this.state);
  }

  handleAddFood(food) {
    const {dietList, foodList} = this.state;
    const newDiet = dietList.filter(el => el.ndbno !== food.ndbno);
    const newFoodList = foodList.filter(el => el.ndbno !== food.ndbno);
    const newFood = {
      ...food,
      quantity: 0
    }
    this.setState({headerClass: 'new-diet'});
    const newNewDiet = [
      ...newDiet,
      newFood
    ];
    storage.storeObject('dietList', newNewDiet, this.setStateCallback);
    storage.storeObject('foodList', newFoodList, this.setStateCallback);
  }

  handleChangeQuantity(food, quantity) {
    const {dietList} = this.state;
    const newDietList = dietList.map(el => {
      if (el.ndbno === food.ndbno) {
        el.quantity = quantity;
      }
      return el;
    })
    storage.storeObject('dietList', newDietList, this.setStateCallback);
  }

  handleDeleteFood(food) {
    const {dietList, foodList} = this.state;
    const newDietList = dietList.filter(dietItem => dietItem.ndbno !== food.ndbno)

    storage.storeObject('dietList', newDietList, this.setStateCallback);

    if (foodList.length > 0) {
      const newFoodList = [
        food, ...foodList
      ]
      storage.storeObject('foodList', newFoodList, this.setStateCallback);
    }
  }

  handleOpenDiet() {
    this.setState({headerClass: ''});
    this.toggleModal(true);
  }

  resetState() {
    this.setState({foodList: []});
  }

  setStateCallback(obj) {
    this.setState(obj)
  }

  toggleModal(open) {
    this.setState({isModalOpen: open});
  }

  render() {
    const {dietList, isModalOpen, foodList, errorMessage} = this.state;
    return (
      <div className='home'>
        <Header className={this.state.headerClass} onSubmitFoodName={this.handleSubmitFoodName} onOpenDiet={this.handleOpenDiet}/>
        <FoodLister foodList={foodList} onAddFood={this.handleAddFood} errorMessage={errorMessage}/>
        <Modal className='diet-modal' isOpen={isModalOpen} onClose={() => {
          this.toggleModal(false)
        }}>
          <Diet dietList={dietList} onChangeQuantity={this.handleChangeQuantity} onDeleteFood={this.handleDeleteFood}/>
        </Modal>
      </div>
    )
  }
}

Home.propTypes = {}

export default Home;
