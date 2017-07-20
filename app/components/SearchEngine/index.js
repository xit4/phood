import React from 'react';
import PropTypes from 'prop-types';
import { fetchFoodList } from '../../actions';
import { connect } from 'react-redux';
import './style.scss';

class SearchEngine extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    var input = document.querySelector('.search-engine input');

    input.addEventListener('focus',() => {
    	this.props.toggleHeader(false);
    })
    input.addEventListener('blur', e => {
    	if(e.target.value === ''){
        this.props.toggleHeader(true);
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.fetchFoodList(this.props.foodName)
  }

  handleChange(event){
    event.preventDefault();
    this.props.onChangeFoodName(event.target.value)
  }


  render() {
    const {foodName} = this.props;
    return (
      <div className='search-engine'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Phood'
            value={foodName}
            onChange={(e) => {this.handleChange(e)}}/>
        </form>
      </div>
    )
  }
}

SearchEngine.propTypes = {
  onChangeFoodName: PropTypes.func.isRequired,
  foodName: PropTypes.string.isRequired,
  toggleHeader: PropTypes.func.isRequired
}
SearchEngine.defaultProps = {
  onChangeFoodName: PropTypes.func.isRequired,
  foodName: '',
  toggleHeader: () => {}
}

export default connect(null, { fetchFoodList })(SearchEngine);
