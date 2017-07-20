import React from 'react';
import PropTypes from 'prop-types';
import DietGrid from '../DietGrid';
import Header from '../Header';

export default class DietLinker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDeleteDiet = this.handleDeleteDiet.bind(this);
  }

  handleDeleteDiet(dietToDelete) {
    this.props.deleteDiet(dietToDelete)
  }

  render() {
    const {dietsList} = this.props;

    return (
      <div className='diet-linker'>
        <Header hasSearchEngine={false}/>
        <div className='diet-linker-body'>
          <span className='title'>Your diets</span>
          <hr></hr>
          {(!_.isEmpty(dietsList) && <DietGrid dietsList={dietsList} onSelectDiet={diet => {
            this.props.history.push(`/diet/${diet.id}`)
          }} onDeleteDiet={this.handleDeleteDiet}/>) || <span className='message'>You have no diets</span>}
        </div>
      </div>
    )
  }
}

DietLinker.propTypes = {}
