import api from '../utils/api';
import * as ActionTypes from './ActionTypes';

export function fetchFoodList(foodName){
  return {
    type: ActionTypes.FETCH_FOOD_LIST,
    foodName
  }
}

export function fetchFoodListOk(foodList){
  return {
    type: ActionTypes.FETCH_FOOD_LIST_OK,
    foodList
  }
}

export function fetchFoodListKo(errorMessage){
  return {
    type: ActionTypes.FETCH_FOOD_LIST_KO,
    errorMessage
  }
}

export function fetchFoodInfo(foodId){
  return {
    type: ActionTypes.FETCH_FOOD_INFO,
    foodId
  }
}

export function fetchFoodInfoOk(foodInfo){
  return {
    type: ActionTypes.FETCH_FOOD_INFO_OK,
    foodInfo
  }
}

export function resetErrors(){
  return {
    type: ActionTypes.RESET_ERRORS
  }
}

export function fetchFoodInfoKo(errorMessage){
  return {
    type: ActionTypes.FETCH_FOOD_INFO_KO,
    errorMessage
  }
}

export function addFoodToDiet(dietId, foodId){
  return {
    type: ActionTypes.ADD_FOOD_DIET,
    dietId,
    foodId
  }
}

export function saveFood(food){
  return {
    type: ActionTypes.SAVE_FOOD,
    food
  }
}

export function createDiet(diet){
  return {
    type: ActionTypes.CREATE_DIET,
    diet
  }
}

export function deleteDiet(diet){
  return {
    type: ActionTypes.DELETE_DIET,
    diet
  }
}

export function updateFoodQuantity(dietId, foodId, quantity){
  return {
    type: ActionTypes.UPDATE_FOOD_QUANTITY,
    dietId,
    foodId,
    quantity
  }
}

export function deleteDietOk(dietId){
  return {
    type: ActionTypes.DELETE_DIET_OK,
    dietId
  }
}

export function deleteFood(dietId, foodId){
  return {
    type: ActionTypes.DELETE_FOOD,
    dietId,
    foodId
  }
}

export function updateFoodNutrients(foodIdArray){
  return {
    type: ActionTypes.UPDATE_FOOD_NUTRIENTS,
    foodIdArray
  }
}

export function updateFoodNutrientsOk(nutrientsData){
  return {
    type: ActionTypes.UPDATE_FOOD_NUTRIENTS_OK,
    nutrientsData
  }
}

export function updateFoodNutrientsKo(errorMessage){
  return {
    type: ActionTypes.UPDATE_FOOD_NUTRIENTS_KO,
    errorMessage
  }
}

export function resetFoodList(){
  return {
    type: ActionTypes.RESET_FOOD_LIST,
  }
}
