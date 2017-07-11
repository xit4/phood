import React from 'react';
import PropTypes from 'prop-types';
import DietGrid from '../DietGrid';
import './style.scss';

class DietLinker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {dietsList, onSelectDiet} = this.props;
    return (
      <div className='diet-linker'>
        <span className='title'>Your diets</span>
        <hr></hr>
        {(dietsList.length > 0 && <DietGrid dietsList={dietsList} onSelectDiet={onSelectDiet}/>) || <span className='message'>You have no diets</span>}
      </div>
    )
  }
}

DietLinker.propTypes = {
  dietsList: PropTypes.array.isRequired,
  onSelectDiet: PropTypes.func.isRequired
}

export default DietLinker;
