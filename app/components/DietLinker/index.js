import { deleteDiet } from '../../actions';
import { connect } from 'react-redux';
import './style.scss';
import DietLinker from './template'

function mapStateToProps({ dietsList }){
  return { dietsList };
}

export default connect(mapStateToProps, { deleteDiet })(DietLinker);
