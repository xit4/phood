import {
  FETCH_FOOD_LIST_OK,
  FETCH_FOOD_INFO_OK
} from '../actions'

import _ from 'lodash';

export default function (state = {}, action) {
  switch(action.type){
    case FETCH_FOOD_LIST_OK:
      return _.mapKeys(action.foodList, 'ndbno');
    case FETCH_FOOD_INFO_OK:
      return {
        ...state,
        [action.foodInfo.desc.ndbno]: {
          ...state[action.foodInfo.desc.ndbno],
          nutrients: action.foodInfo.nutrients
        }
      }
    default:
      return state;
  }
}
