import {
  FETCH_FOOD_INFO_KO,
  FETCH_FOOD_LIST_KO,
  RESET_ERRORS,
  UPDATE_FOOD_NUTRIENTS_KO,
} from '../actions'

export default function (state = {}, action) {
  switch(action.type){
    case RESET_ERRORS:
      return {};
    case FETCH_FOOD_LIST_KO:
      return {
        ...state,
        foodListError: action.errorMessage
      };
    case FETCH_FOOD_INFO_KO:
      return {
        ...state,
        foodInfoError: action.errorMessage
      };
    default:
      return state;
  }
}
