import React from 'react';
import PropTypes from 'prop-types';
import DietGrid from '../DietGrid';
import './style.scss';

class DietPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewDiet: false,
      newDietName: ''
    };
    this.handleAddDiet = this.handleAddDiet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateNewDiet = this.handleCreateNewDiet.bind(this);
    this.handleCancelDietAddition = this.handleCancelDietAddition.bind(this);
  }

  handleAddDiet() {
    this.setState({addNewDiet: true});
  }

  handleCancelDietAddition() {
    this.setState({addNewDiet: false});
  }

  handleChange(event){
    event.preventDefault();
    this.setState({newDietName: event.target.value})
  }

  handleCreateNewDiet(event){
    event.preventDefault();
    const {onCreateDiet} = this.props;
    const {newDietName} = this.state;
    this.setState({addNewDiet: false, newDietName: ''});
    onCreateDiet(newDietName);
  }

  render() {
    const {dietsList, onCreateDiet, onSelectDiet, onDeleteDiet} = this.props;
    const {addNewDiet, newDietName} = this.state;
    return (
      <div className='diets'>
        <div className='left'>
          <span className='title'>Add food to an existing diet...</span>
          <DietGrid dietsList={dietsList} onSelectDiet={onSelectDiet} onDeleteDiet={onDeleteDiet}/>
        </div>
        <div className='center'>
          <hr size="100"></hr>
        </div>
        <div className='right'>
          <span className='title'>...or create a new one</span>
          {(!addNewDiet && <div className='add-diet' onClick={this.handleAddDiet}>{`New Diet`}</div>) || (
            <div className='diet-name-picker'>
              <form onSubmit={e => {this.handleCreateNewDiet(e)}}>
                <input
                  maxLength='20'
                  type='text'
                  placeholder='diet name'
                  value={newDietName}
                  onChange={(e) => {this.handleChange(e)}}/>
              </form>
              <div className='cancel-diet' onClick={this.handleCancelDietAddition}>{`Cancel`}</div>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}

DietPicker.propTypes = {
  dietsList: PropTypes.array.isRequired,
  onCreateDiet: PropTypes.func.isRequired,
  onSelectDiet: PropTypes.func.isRequired,
  onDeleteDiet: PropTypes.func.isRequired,
}

export default DietPicker;
