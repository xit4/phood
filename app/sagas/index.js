import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import api from '../utils/api';
import {
  updateFoodNutrientsOk,
  updateFoodNutrientsKo,
  fetchFoodListKo,
  fetchFoodListOk,
  fetchFoodInfoKo,
  fetchFoodInfoOk,
  deleteFood,
  deleteDietOk,
  resetErrors
} from '../actions';
import { UPDATE_FOOD_NUTRIENTS, FETCH_FOOD_LIST, FETCH_FOOD_INFO, DELETE_DIET} from '../actions/ActionTypes';
import 'babel-polyfill';
import _ from 'lodash';

export function* rootSaga() {
  yield [
    takeLatest(UPDATE_FOOD_NUTRIENTS, updateFoodNutrients),
    takeLatest(FETCH_FOOD_LIST, fetchFoodList),
    takeLatest(FETCH_FOOD_INFO, fetchFoodInfo),
    takeLatest(DELETE_DIET, deleteDiet),
  ]
}

function* updateFoodNutrients({ foodIdArray }){
  const data = yield call(api.fetchFoodsInfo, foodIdArray);
  if (data.errorMessage) {
    yield put(updateFoodNutrientsKo(data.errorMessage));
  }
  yield put(resetErrors());
  yield put(updateFoodNutrientsOk(data));
}

function* fetchFoodList({ foodName }) {
  const data = yield call(api.fetchFoodsFromName, foodName);
  if (data.errorMessage) {
    yield put(fetchFoodListKo(data.errorMessage));
  }
  let newFoodList = data.item;
  const toBeShownFoodList = newFoodList.slice(0, 25);
  yield put(fetchFoodListOk(newFoodList));
  yield put(resetErrors());
}

function* fetchFoodInfo({ foodId }){
  const data = yield call(api.fetchFoodsInfo, [foodId])
  if (data.errorMessage) {
    yield put(fetchFoodInfoKo(data.errorMessage));
  }
  let newFoodInfo = data[0].food;
  yield put(fetchFoodInfoOk(newFoodInfo));
  yield put(resetErrors());
}

function* deleteDiet({ diet }){
  const foodIds = _.keys(diet.items);
  for(let i = 0; i < foodIds.length; i++){
    yield put(deleteFood(diet.id, diet.items[foodIds[i]].ndbno));
  }
  yield put(deleteDietOk(diet.id));
}
