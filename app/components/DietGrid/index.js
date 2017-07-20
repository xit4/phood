import React from 'react';
import PropTypes from 'prop-types';
import DietGridItem from '../DietGridItem';
import './style.scss';

class DietGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {dietsList, onSelectDiet, onDeleteDiet} = this.props;
    return (
      <div className='diet-grid'>
        {
          _.map(dietsList,
            (diet, index) => <DietGridItem key={index} dietItem={diet} onDeleteDiet={onDeleteDiet} onSelectDiet={onSelectDiet}/>)
        }
      </div>
    )
  }
}

DietGrid.propTypes = {
  dietsList: PropTypes.object.isRequired,
  onSelectDiet: PropTypes.func.isRequired,
  onDeleteDiet: PropTypes.func.isRequired,
}

export default DietGrid;
