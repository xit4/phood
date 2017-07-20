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
      headerClass: isOpen
        ? ''
        : 'header-closed'
    });
  }

  render() {
    const {foodName, headerClass} = this.state;
    const {className, hasSearchEngine} = this.props;
    return (
      <div className={`header ${headerClass} ${hasSearchEngine ? '' : 'header-closed'}`}>
        <img src={require('../../img/diet-icon-background.png')} className={`${className} diet-icon-background`} alt="diet-icon-background"/>
        <Link to={{
          pathname: '/',
          query: 'resetState'
        }} onClick={this.resetSearchEngine}>
          <img src={require('../../img/food-dome.png')} className="logo" alt="logo"/>
        </Link>
        {hasSearchEngine && <SearchEngine toggleHeader={this.toggleHeader} onChangeFoodName={this.handleChangeFoodName} foodName={foodName}/>}
        <Link to={{
          pathname: '/diet',
        }}>
          <img src={require('../../img/apple-icon.png')} className={`${className} diet-icon`} alt="diet-icon"/>
        </Link>
      </div>
    )
  }
}

Header.propTypes = {
  hasSearchEngine: PropTypes.bool,
  className: PropTypes.string,
}

Header.defaultProps = {
  hasSearchEngine: true,
  onSubmitFoodName: () => {},
}

export default Header;
