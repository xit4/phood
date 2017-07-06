import React from 'react';
import PropTypes from 'prop-types';
import DietLister from '../DietLister';
import Total from '../Total';
import './style.scss';

class Diet extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
  }

  render() {
    const {dietList, onChangeQuantity, onDeleteFood} = this.props;
    return (
      <div className='diet'>
        <div className='left'>
          <DietLister
            dietList={dietList}
            onChangeQuantity={onChangeQuantity}
            onDeleteFood={onDeleteFood}/>
        </div>
        <div className='center'>
          { dietList.length > 0 && <hr size="400"></hr> }
        </div>
        <div className='right'>
          <Total dietList={dietList} />
        </div>
      </div>
    )
  }
}

Diet.propTypes = {
  dietList: PropTypes.array.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  onDeleteFood: PropTypes.func.isRequired,
}

Diet.defaultProps = {
  dietList: []
}


export default Diet;
