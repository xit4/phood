import { updateFoodQuantity, deleteFood, updateFoodNutrients } from '../../actions';
import { connect } from 'react-redux';
import './style.scss';
import Diet from './template';

function mapStateToProps({ dietsList, savedFoods }){
  return { dietsList, savedFoods };
}

export default connect(mapStateToProps, { updateFoodQuantity, deleteFood, updateFoodNutrients })(Diet);
