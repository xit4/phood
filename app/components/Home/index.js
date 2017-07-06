import React from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Header from '../Header';
import FoodLister from '../FoodLister';
import Modal from '../Modal';
import Diet from '../Diet';
import './style.scss';

class Home extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      isModalOpen: false,
      foodList: [],
      dietList: JSON.parse(localStorage.getItem('dietList')) || [],
      errorMessage: ''
    };
    this.handleSubmitFoodName = this.handleSubmitFoodName.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleAddFood = this.handleAddFood.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOpenDiet = this.handleOpenDiet.bind(this);
    this.handleDeleteFood = this.handleDeleteFood.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location.state === 'resetState') {
      this.resetState();
    }
  }

  handleSubmitFoodName(foodName){
    if(localStorage.getItem('lastSearchedFood') === foodName){
      this.setState({foodList: JSON.parse(localStorage.getItem('foodList'))});
      return;
    }
    api.fetchFoodsFromName(foodName)
      .then( data => {
        if(data.errorMessage){
          this.setState({errorMessage: data.errorMessage});
          return;
        }
        localStorage.setItem('lastSearchedFood', foodName);
        localStorage.setItem('foodList', JSON.stringify(data.item));
        this.setState({foodList: data.item, errorMessage: ''});
      })
  }

  handleAddFood(food){
    const {dietList, foodList} = this.state;
    var newDiet = [...dietList].filter((el) => {return el.ndbno !== food.ndbno});
    var newFoodList = [...foodList].filter((el) => {return el.ndbno !== food.ndbno});
    let dietIcon = document.querySelector('.diet-icon');
    dietIcon.classList.add('new-diet');
    food.quantity = 0;
    newDiet.push(food);
    localStorage.setItem('dietList', JSON.stringify(newDiet));
    this.setState({dietList: newDiet, foodList:newFoodList});
  }

  handleChangeQuantity(food, quantity){
    var newDietList =  [...this.state.dietList];
    newDietList.forEach((el)=>{
      if(el.ndbno === food.ndbno){
        el.quantity = quantity;
      }
    })
    localStorage.setItem('dietList', JSON.stringify(newDietList));
    this.setState({dietList: newDietList});
  }

  handleOpenDiet(){
    let dietIcon = document.querySelector('.diet-icon');
    dietIcon.classList.remove('new-diet');
    this.toggleModal(true);
  }

  resetState(){
    this.setState({foodList:[]});
  }

  toggleModal(open){
    this.setState({isModalOpen: open});
  }

  handleDeleteFood(food){
    const {dietList} = this.state;

    var newDietList = [...dietList].filter((dietItem) =>{
      return dietItem.ndbno !== food.ndbno;
    })

    localStorage.setItem('dietList', JSON.stringify(newDietList));
    this.setState({dietList: newDietList});
  }

  render() {
    const {dietList, isModalOpen, foodList, errorMessage} = this.state;
    return (
      <div className='home'>
        <Header
          onSubmitFoodName={this.handleSubmitFoodName}
          onOpenDiet={this.handleOpenDiet}/>
        <FoodLister
          foodList={foodList}
          onAddFood={this.handleAddFood}
          errorMessage={errorMessage}/>
        <Modal
          className='diet-modal'
          isOpen={isModalOpen}
          onClose={()=>{this.toggleModal(false)}}>
            <Diet
              dietList={dietList}
              onChangeQuantity={this.handleChangeQuantity}
              onDeleteFood={this.handleDeleteFood}/>
        </Modal>
      </div>
    )
  }
}

Home.propTypes = {

}


export default Home;
