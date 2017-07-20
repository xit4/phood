import { fetchFoodList } from '../../actions';
import { connect } from 'react-redux';
import './style.scss';
import SearchEngine from './template'

export default connect(null, { fetchFoodList })(SearchEngine);
