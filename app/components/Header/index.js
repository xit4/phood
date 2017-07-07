import React from 'react';
import PropTypes from 'prop-types';
import SearchEngine from '../SearchEngine';
import {Link} from 'react-router-dom';
import './style.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: '',
      headerClass: ''
    };
    this.handleChangeFoodName = this.handleChangeFoodName.bind(this);
    this.resetSearchEngine = this.resetSearchEngine.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  handleChangeFoodName(newValue) {
    this.setState({foodName: newValue})
  }

  resetSearchEngine() {
    this.setState({foodName: '', headerClass: ''})
  }

  toggleHeader(isOpen) {
    this.setState({
      headerClass: isOpen  ? ''  : 'header-closed'
    });
  }

  render() {
    const {foodName, headerClass} = this.state;
    const {className} = this.props;
    return (
      <div className={`header ${headerClass}`}>
        <img src='./app/img/diet-icon-background.png' className={`${className} diet-icon-background`} alt="diet-icon-background"/>
        <Link to={{
          pathname: '/',
          state: 'resetState'
        }} onClick={this.resetSearchEngine}>
          <img src='./app/img/food-dome.png' className="logo" alt="logo"/>
        </Link>
        <SearchEngine toggleHeader={this.toggleHeader} onSubmitFoodName={this.props.onSubmitFoodName} onChangeFoodName={this.handleChangeFoodName} foodName={foodName}/>
        <Link to={{
          pathname: '/'
        }} onClick={this.props.onOpenDiet}>
          <img src='./app/img/apple-fruit.png' className={`${className} diet-icon`} alt="diet-icon"/>
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
