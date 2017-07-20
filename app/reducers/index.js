import { combineReducers } from 'redux';
import _ from 'lodash';
import foodListReducer from './reducer_foodlist';
import dietListReducer from './reducer_dietlist';
import savedFoodsReducer from './reducer_savedfoods';
import errorReducer from './reducer_error';

const rootReducer = combineReducers({
    foodList: foodListReducer,
    savedFoods: savedFoodsReducer,
    dietsList: dietListReducer,
    errors: errorReducer
  });


export default rootReducer;
