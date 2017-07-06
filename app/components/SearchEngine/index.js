import React from 'react';
import PropTypes from 'prop-types';
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

    input.addEventListener('focus', function(){
    	let header = document.querySelector('.header');
      header.classList.add('header-closed');
    })
    input.addEventListener('blur', function(e){
    	if(e.target.value === ''){
        let header = document.querySelector('.header');
        header.classList.remove('header-closed');
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmitFoodName(this.props.foodName)
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
}
SearchEngine.defaultProps = {
  onChangeFoodName: PropTypes.func.isRequired,
  foodName: '',
}

export default SearchEngine;
