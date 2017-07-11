import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class DietGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDeleteDiet = this.handleDeleteDiet.bind(this);
  }

  handleDeleteDiet(event, diet){
    event.stopPropagation();
    const {onDeleteDiet} = this.props;
    onDeleteDiet(diet);
  }

  render() {
    const {dietsList, onSelectDiet} = this.props;
    return (
      <div className='diet-grid'>
        {dietsList.map(diet => <div className='diet-grid-item selectable' key={diet.id} onClick={() => {onSelectDiet(diet)}}>
          <span onClick={(event)=>{
            this.handleDeleteDiet(event, diet)}}>╳</span>
          <img src={require('../../img/apple-fruit.png')} className={`diet-icon selectable`} alt={`diet ${diet.name}`}/>
          {diet.name}
        </div>)}
      </div>
    )
  }
}

DietGrid.propTypes = {
  dietsList: PropTypes.array.isRequired,
  onSelectDiet: PropTypes.func.isRequired,
  onDeleteDiet: PropTypes.func.isRequired,
}

export default DietGrid;
