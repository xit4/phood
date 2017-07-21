import {
  ADD_FOOD_DIET,
  CREATE_DIET,
  DELETE_DIET,
  DELETE_DIET_OK,
  UPDATE_FOOD_QUANTITY,
  DELETE_FOOD,
} from '../actions/ActionTypes'
import _ from 'lodash';

export default function (state = {}, action) {
  switch(action.type){
    case ADD_FOOD_DIET:
      return {
        ...state,
        [action.dietId]: {
          ...state[action.dietId],
          items: {
            ...state[action.dietId].items,
            [action.foodId]: {
              ndbno: action.foodId,
              quantity: 0
            }
          }
        }
      };
    case CREATE_DIET:
      return {
        ...state,
        [action.diet.id]: action.diet
      };
    case DELETE_DIET_OK:
      return _.omit(state, action.dietId);
    case DELETE_FOOD:
    {
      const { dietId, foodId } = action;
      return {
        ...state,
        [dietId]:{
          ...state[dietId],
          items: _.omit(state[dietId].items, foodId)
         }
      }
    }
    case UPDATE_FOOD_QUANTITY:
    {
      const { dietId, foodId, quantity } = action;
      return {
        ...state,
        [dietId]:{
          ...state[dietId],
          items: {
            ...state[dietId].items,
            [foodId]: {
              ...state[dietId].items[foodId],
              quantity
            }
          }
        }
      };
    }
    default:
      return state;
  }
}
