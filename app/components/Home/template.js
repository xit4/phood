import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import FoodLister from '../FoodLister';
import Modal from '../Modal';
import DietPicker from '../DietPicker';
import DietLinker from '../DietLinker';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      moreToShow: false,
      foodToAdd: {}
    };
    this.handleAddFood = this.handleAddFood.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOpenDiet = this.handleOpenDiet.bind(this);
    this.setStateCallback = this.setStateCallback.bind(this);
    // this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleCreateDiet = this.handleCreateDiet.bind(this);
    this.handleSelectDiet = this.handleSelectDiet.bind(this);
    this.handleDeleteDiet = this.handleDeleteDiet.bind(this);
  }

  handleAddFood(food) {
    this.setState({foodToAdd: food});
    this.toggleModal(true);
  }

  handleCreateDiet(newDietName) {
    const imagesArray = [
      'banana-icon',
      'apple-icon',
      'pear-icon',
      'strawberry-icon',
      'melon-icon'
    ]
    const { dietsList, createDiet } = this.props;
    createDiet({
      id: this.genId(),
      name: newDietName,
      items: {},
      icon: imagesArray[Math.floor(Math.random()*imagesArray.length)]
    });
  }

  genId() {
    return 'yxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  handleSelectDiet(diet) {
    const { foodToAdd } = this.state;
    let foodToAddComplete = {...foodToAdd}
    this.props.saveFood(foodToAdd)
    this.props.addFoodToDiet(diet.id, foodToAddComplete.ndbno);
    this.toggleModal(false);
  }

  handleDeleteDiet(dietToDelete) {
    this.props.deleteDiet(dietToDelete.id);
  }

  // handleLoadMore() {
  //   manager.retrieveMoreFoodAndUpdateState(this.setStateCallback, this.state);
  // }

  handleOpenDiet() {
    this.setState({headerClass: ''});
    this.toggleModal(true);
  }

  setStateCallback(obj) {
    this.setState(obj)
  }

  toggleModal(open) {
    this.setState({isModalOpen: open});
  }

  render() {
    const {
      isModalOpen,
      moreToShow,
      foodToAdd
    } = this.state;
    const { dietsList} = this.props;
    return (
      <div className='home'>
        <Header
          className={this.state.headerClass}
          onOpenDiet={this.handleOpenDiet}/>
        <FoodLister
          onAddFood={this.handleAddFood}
          moreToLoad ={moreToShow}
          onLoadMore={this.handleLoadMore}/>
        <Modal
          className='diet-modal'
          isOpen={isModalOpen}
          onClose={() => {
            this.setState({foodToAdd: {}});
            this.toggleModal(false);
          }}>
          {foodToAdd.ndbno &&
            <DietPicker
              dietsList={dietsList}
              onSelectDiet={this.handleSelectDiet}
              onCreateDiet={this.handleCreateDiet}
              onDeleteDiet={this.handleDeleteDiet}/>
          }
        </Modal>
      </div>
    )
  }
}

Home.propTypes = {
}
