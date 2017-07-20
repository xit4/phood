import { fetchFoodInfo } from '../../actions';
import { connect } from 'react-redux';
import './style.scss';
import FoodLister from './template';

function mapStateToProps({ foodList, errors }){
  return { foodList , errors };
}

export default connect(mapStateToProps, { fetchFoodInfo })(FoodLister);
