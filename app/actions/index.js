import api from '../utils/api';

export const FETCH_FOOD_LIST_KO= 'FETCH_FOOD_LIST_KO';
export const FETCH_FOOD_LIST_OK = 'FETCH_FOOD_LIST_OK';
export const FETCH_FOOD_INFO_OK= 'FETCH_FOOD_INFO_OK';
export const FETCH_FOOD_INFO_KO = 'FETCH_FOOD_INFO_KO';
export const RESET_ERRORS = 'RESET_ERRORS';
export const ADD_FOOD_DIET = 'ADD_FOOD_DIET';
export const SAVE_FOOD = 'SAVE_FOOD';
export const CREATE_DIET = 'CREATE_DIET';
export const DELETE_DIET = 'DELETE_DIET';
export const UPDATE_FOOD_QUANTITY = 'UPDATE_FOOD_QUANTITY';
export const DELETE_FOOD = 'DELETE_FOOD';
export const UPDATE_FOOD_NUTRIENTS = 'UPDATE_FOOD_NUTRIENTS';
export const UPDATE_FOOD_NUTRIENTS_OK = 'UPDATE_FOOD_NUTRIENTS_OK';
export const UPDATE_FOOD_NUTRIENTS_KO = 'UPDATE_FOOD_NUTRIENTS_KO';
export const RESET_FOOD_LIST = 'RESET_FOOD_LIST';

function fetchFoodListOk(foodList){
  return {
    type: FETCH_FOOD_LIST_OK,
    foodList
  }
}

function fetchFoodListKo(errorMessage){
  return {
    type: FETCH_FOOD_LIST_KO,
    errorMessage
  }
}

function fetchFoodInfoOk(foodInfo){
  return {
    type: FETCH_FOOD_INFO_OK,
    foodInfo
  }
}

function resetErrors(){
  return {
    type: RESET_ERRORS
  }
}

function fetchFoodInfoKo(errorMessage){
  return {
    type: FETCH_FOOD_INFO_KO,
    errorMessage
  }
}

export function addFoodToDiet(dietId, foodId){
  return {
    type: ADD_FOOD_DIET,
    dietId,
    foodId
  }
}

export function saveFood(food){
  return {
    type: SAVE_FOOD,
    food
  }
}

export function createDiet(diet){
  return {
    type: CREATE_DIET,
    diet
  }
}

export function deleteDiet(diet){
  return dispatch => {
    _.each(diet.items, food => {
      dispatch(deleteFood(diet.id, food.ndbno))
    });
    dispatch({
      type: DELETE_DIET,
      dietId: diet.id
    });
  }
}

export function updateFoodQuantity(dietId, foodId, quantity){
  return {
    type: UPDATE_FOOD_QUANTITY,
    dietId,
    foodId,
    quantity
  }
}

export function deleteFood(dietId, foodId){
  return {
    type: DELETE_FOOD,
    dietId,
    foodId
  }
}

export function updateFoodNutrientsOk(nutrientsData){
  return {
    type: UPDATE_FOOD_NUTRIENTS_OK,
    nutrientsData
  }
}

export function updateFoodNutrientsKo(errorMessage){
  return {
    type: UPDATE_FOOD_NUTRIENTS_KO,
    errorMessage
  }
}

export function resetFoodList(){
  return {
    type: RESET_FOOD_LIST,
  }
}

export function updateFoodNutrients(foodIdArray){
  return dispatch => {
    return api.fetchFoodsInfo(foodIdArray).then((data) => {
      if (data.errorMessage) {
        return dispatch(updateFoodNutrientsKo(data.errorMessage));
      }
      dispatch(resetErrors());
      return dispatch(updateFoodNutrientsOk(data));
    })
  }
}

export function fetchFoodList(foodName) {
  return dispatch => {
    return api.fetchFoodsFromName(foodName).then(data => {
      if (data.errorMessage) {
        return dispatch(fetchFoodListKo(data.errorMessage));
      }
      dispatch(resetErrors());
      let newFoodList = data.item;
      const toBeShownFoodList = newFoodList.slice(0, 25);
      return dispatch(fetchFoodListOk(newFoodList));
    })
  }
}

export function fetchFoodInfo(foodId){
  return dispatch => {
    return api.fetchFoodsInfo([foodId]).then(data => {
      if (data.errorMessage) {
        return dispatch(fetchFoodInfoKo(data.errorMessage));
      }
      dispatch(resetErrors());
      let newFoodInfo = data[0].food;
      return dispatch(fetchFoodInfoOk(newFoodInfo));
    })
  }
}
