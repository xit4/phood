import React from 'react';
import PropTypes from 'prop-types';
import SearchEngine from '../SearchEngine';
import {Link} from 'react-router-dom';
import './style.scss';

class Header extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      foodName: '',
    };
    this.handleChangeFoodName = this.handleChangeFoodName.bind(this);
    this.resetSearchEngine = this.resetSearchEngine.bind(this);
  }

  handleChangeFoodName(newValue){
    if(newValue !== this.state.foodName){
      this.setState({
          foodName: newValue
        })
    }
  }

  resetSearchEngine(){
    let header = document.querySelector('.header');
    header.classList.remove('header-closed');
    this.setState(function (){
      return {
        foodName: ''
      }
    })
  }

  render() {
    const {foodName} = this.state;
    return (
      <div className='header'>
        <Link to={{pathname:'/', state:'resetState'}} onClick={this.resetSearchEngine}>
          <img src='https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-128.png' className="logo" alt="logo" />
        </Link>
        <SearchEngine
          onSubmitFoodName={this.props.onSubmitFoodName}
          onChangeFoodName={this.handleChangeFoodName}
          foodName={foodName}/>
        <Link to={{pathname:'/'}} onClick={this.props.onOpenDiet}>
          <img src='http://i.imgur.com/PZkiNPC.png' className="diet-icon" alt="diet-icon" />
        </Link>
      </div>
    )
  }
}

Header.propTypes = {
  onSubmitFoodName: PropTypes.func.isRequired,
  onOpenDiet: PropTypes.func.isRequired
}


export default Header;
