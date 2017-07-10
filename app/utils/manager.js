import storage from './storage';
import api from './api';

export default {
  retrieveFoodListAndUpdateState : function(foodName, setState, state) {
    const searchedFood = storage.getStoredString('lastSearchedFood', '');
    let storedFoodList = [];
    if (searchedFood === foodName) {
      storedFoodList = storage.getStoredObject('foodList', []);
      const toBeShownFoodList = storedFoodList.slice(0, 25);
      setState({foodList: toBeShownFoodList, errorMessage: '', moreToShow: true});
      return;
    }

    api.fetchFoodsFromName(foodName).then(data => {
      if (data.errorMessage) {
        setState({errorMessage: data.errorMessage});
        return;
      }
      let newFoodList = data.item;
      if (state) {
        const {dietList} = state;
        newFoodList = data.item.filter(el => dietList.every(food => food.ndbno !== el.ndbno))
      }
      storage.storeObject('foodList', newFoodList);
      const toBeShownFoodList = newFoodList.slice(0, 25);
      setState({foodList: toBeShownFoodList, errorMessage: '', moreToShow: true});
      storage.storeString('lastSearchedFood', foodName);
    })
  },
  retrieveMoreFoodAndUpdateState : function(setState, state) {
    const storedFoodList = storage.getStoredObject('foodList', []);
    const {foodList} = state;
    let toBeShownFoodList = [];
    let moreToShow = false;
    if(storedFoodList.length - foodList.length > 0){
      toBeShownFoodList = storedFoodList.slice(0, foodList.length+25);
      moreToShow = true;
    }
    setState({foodList: toBeShownFoodList, errorMessage: '', moreToShow: moreToShow});
  },
  retrieveFoodInfo : function(foodId, setState) {
    api.fetchFoodsInfo([foodId]).then((data) => {
      if (data.errorMessage) {
        setState({errorMessage: data.errorMessage})
        return;
      }
      setState({foodDetail: data[0].food});
    })
  },
  retrieveFoodsInfo : function(foodIdArray, setState) {
    return api.fetchFoodsInfo(foodIdArray).then((data) => {
      if (data.errorMessage) {
        setState({errorMessage: data.errorMessage})
        return;
      }
      setState({nutrientsInfo: data});
      return data;
    })
  }
};
