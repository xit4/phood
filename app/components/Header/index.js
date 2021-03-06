import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import SearchEngine from '../SearchEngine';
import { resetFoodList } from '../../actions';
import { connect } from 'react-redux';
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
    this.props.resetFoodList();
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
  resetFoodList: PropTypes.func.isRequired
}

Header.defaultProps = {
  hasSearchEngine: true,
  onSubmitFoodName: () => {},
}

export default connect(null, { resetFoodList })(Header);
