import React from 'react';
import PropTypes from 'prop-types';

class DietGridItem extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
    this.handleDeleteDiet = this.handleDeleteDiet.bind(this);
  }

  handleDeleteDiet(event, diet){
    event.stopPropagation();
    const {onDeleteDiet} = this.props;
    onDeleteDiet(diet);
  }

  render() {
    const {dietItem: diet, onSelectDiet} = this.props;
    return (
      <div className='diet-grid-item selectable' key={diet.id} onClick={() => {onSelectDiet(diet)}}>
        <span onClick={(event)=>{
          this.handleDeleteDiet(event, diet)}}>╳</span>
        <img src={require('../../img/' + (diet.icon || 'apple-icon') + '.png')} className={`diet-icon selectable`} alt={`diet ${diet.name}`}/>
        {diet.name}
      </div>
    )
  }
}

DietGridItem.propTypes = {
  dietItem: PropTypes.object.isRequired,
  onSelectDiet: PropTypes.func.isRequired,
  onDeleteDiet: PropTypes.func.isRequired,
}


export default DietGridItem;
