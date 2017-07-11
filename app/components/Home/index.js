import React from 'react';
import PropTypes from 'prop-types';
import storage from '../../utils/storage';
import manager from '../../utils/manager';
import Header from '../Header';
import FoodLister from '../FoodLister';
import Modal from '../Modal';
import DietPicker from '../DietPicker';
import DietLinker from '../DietLinker';
import './style.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      foodList: [],
      dietsList: [],
      errorMessage: '',
      moreToShow: false,
      foodToAdd: {}
    };
    this.handleSubmitFoodName = this.handleSubmitFoodName.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleAddFood = this.handleAddFood.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOpenDiet = this.handleOpenDiet.bind(this);
    this.setStateCallback = this.setStateCallback.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleCreateDiet = this.handleCreateDiet.bind(this);
    this.handleSelectDiet = this.handleSelectDiet.bind(this);
    this.handleDeleteDiet = this.handleDeleteDiet.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query === 'resetState') {
      this.resetState();
    }
  }

  componentDidMount() {
    const initialDietsList = storage.getStoredObject('dietsList', []);
    this.setState({dietsList: initialDietsList});
  }

  handleSubmitFoodName(foodName) {
    manager.retrieveFoodListAndUpdateState(foodName, this.setStateCallback, this.state);
  }

  handleAddFood(food) {
    this.setState({foodToAdd: food});
    this.toggleModal(true);
  }

  handleCreateDiet(newDietName) {
    const {dietsList} = this.state;
    let newDietsList = [
      ...dietsList, {
        id: dietsList.length,
        name: newDietName,
        items: {}
      }
    ];
    this.setState({dietsList: newDietsList});
    storage.storeObject('dietsList', newDietsList);
  }

  handleSelectDiet(diet) {
    const {dietsList, foodToAdd} = this.state;
    let foodToAddComplete = {...foodToAdd, quantity: 0}
    let newDietsList = [...dietsList];
    newDietsList[diet.id] = {
      ...diet,
      items: {
        ...diet.items,
        [foodToAddComplete.ndbno]: foodToAddComplete
      }
    }
    this.setState({dietsList: newDietsList, foodToAdd: {}});
    storage.storeObject('dietsList', newDietsList);
    this.toggleModal(false);
  }

  handleDeleteDiet(dietToDelete){
    const {dietsList} = this.state;
    const newDietsList = [...dietsList].filter(diet => diet.id !== dietToDelete.id);
    storage.storeObject('dietsList', newDietsList, this.setStateCallback);
  }

  handleLoadMore() {
    manager.retrieveMoreFoodAndUpdateState(this.setStateCallback, this.state);
  }

  handleOpenDiet() {
    this.setState({headerClass: ''});
    this.toggleModal(true);
  }

  resetState() {
    this.setState({foodList: [], errorMessage: '', moreToShow: false});
  }

  setStateCallback(obj) {
    this.setState(obj)
  }

  toggleModal(open) {
    this.setState({isModalOpen: open});
  }

  render() {
    const {
      dietsList,
      isModalOpen,
      foodList,
      errorMessage,
      moreToShow,
      foodToAdd
    } = this.state;
    return (
      <div className='home'>
        <Header className={this.state.headerClass} onSubmitFoodName={this.handleSubmitFoodName} onOpenDiet={this.handleOpenDiet}/>
        <FoodLister foodList={foodList} onAddFood={this.handleAddFood} moreToLoad ={moreToShow} onLoadMore={this.handleLoadMore} errorMessage={errorMessage}/>
        <Modal className='diet-modal' isOpen={isModalOpen} onClose={() => {
          this.setState({foodToAdd: {}});
          this.toggleModal(false);
        }}>
          {(foodToAdd.ndbno && <DietPicker dietsList={dietsList} onSelectDiet={this.handleSelectDiet} onCreateDiet={this.handleCreateDiet} onDeleteDiet={this.handleDeleteDiet}/>) || <DietLinker dietsList={dietsList} onDeleteDiet={this.handleDeleteDiet} onSelectDiet={diet => {
            this.props.history.push(`/diet/${diet.id}`)
          }}/>}
        </Modal>
      </div>
    )
  }
}

Home.propTypes = {}

export default Home;
