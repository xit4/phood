import {
  UPDATE_FOOD_NUTRIENTS_OK,
  SAVE_FOOD,
  DELETE_FOOD
} from '../actions/ActionTypes'
import _ from 'lodash';

export default function (state = {}, action) {
  switch(action.type){
    case SAVE_FOOD:
      return {
        ...state,
        [action.food.ndbno]: action.food
      }
    case UPDATE_FOOD_NUTRIENTS_OK:
    {
      const { nutrientsData } = action;
      let newSavedFoods = {...state};
      nutrientsData.forEach(foodObj => {
        newSavedFoods[foodObj.food.desc.ndbno] = {
          ...state[foodObj.food.desc.ndbno],
          nutrients: foodObj.food.nutrients
        }
      })
      return newSavedFoods;
    }
    case DELETE_FOOD:
      return _.omit(state, action.foodId);
    default:
      return state;
  }
}
