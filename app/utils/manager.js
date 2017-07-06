import storage from './storage';
import api from './api';

export default {
  retrieveFoodListAndUpdateState : function(foodName, setState, state) {
    const searchedFood = storage.getStoredString('lastSearchedFood', '');
    if (searchedFood === foodName) {
      const storedFoodList = storage.getStoredObject('foodList', []);
      setState({foodList: storedFoodList, errorMessage: ''});
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
      storage.storeObject('foodList', newFoodList, setState);
      storage.storeString('lastSearchedFood', foodName);
    })
  }
};
