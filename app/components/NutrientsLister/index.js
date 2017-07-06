import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class NutrientsLister extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
  }

  render() {
    const {nutrientsList} = this.props;
    return (
      <div className='nutrients-list'>
        {
          nutrientsList.map(nutrient =>{
            return (
                <div
                  key={nutrient.name}
                  className='nutrient'>
                    <div
                      className='nutrient-name'>
                        {nutrient.name}:
                    </div>
                    <div
                      className='nutrient-value'>
                        {`${nutrient.value}\t${nutrient.unit}`}
                    </div>
                </div>
              )
          })
        }
      </div>
    )
  }
}

NutrientsLister.propTypes = {
  nutrientsList: PropTypes.array.isRequired
}

NutrientsLister.defaultProps = {
  nutrientsList: []
}

export default NutrientsLister;
