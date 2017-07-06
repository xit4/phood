import React from 'react';
import PropTypes from 'prop-types';
import DietItem from '../DietItem';

class DietLister extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
  }

  render() {
    const {dietList, onChangeQuantity, onDeleteFood} = this.props;
    return (
      <div className='diet-lister'>
        <span className='title'>Diet</span>
        <hr style={{border:'solid white'}}></hr>
        { dietList.length > 0 &&
          dietList.map((food)=>{
            return (
              <DietItem
                onChangeQuantity={onChangeQuantity}
                onDeleteFood={onDeleteFood}
                key={food.name}
                food={food}/>
              )
          })
        }
        { dietList.length === 0 &&
          <div>
            No items have been added to the diet.
          </div>
        }
      </div>
    )
  }
}

DietLister.propTypes = {
  dietList: PropTypes.array.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  onDeleteFood: PropTypes.func.isRequired,
}

DietLister.defaultProps = {
  dietList: []
}

export default DietLister;
