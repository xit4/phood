import { addFoodToDiet, createDiet, deleteDiet, saveFood } from '../../actions';
import { connect } from 'react-redux';
import './style.scss';
import Home from './template';


function mapStateToProps({ dietsList }){
  return { dietsList };
}

export default connect(mapStateToProps, { createDiet, addFoodToDiet, saveFood, deleteDiet })(Home);
