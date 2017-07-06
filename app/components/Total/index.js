import React from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import './style.scss';

class Total extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      totalNutrients:{},
      nutrientsInfo:[]
    };
    this.computeTotals = this.computeTotals.bind(this);
  }

  computeTotals(dietList = this.props.dietList){
    var newTotalNutrients = {}
    const {nutrientsInfo} = this.state;
    dietList.map(food =>{
      let foodNutrients = nutrientsInfo.filter(el => {
        return el.food.desc.ndbno === food.ndbno
      })[0].food.nutrients;

      foodNutrients.map(nutrient => {
        let prevNutrientValue = newTotalNutrients[nutrient.name] ? newTotalNutrients[nutrient.name].value : 0;
        newTotalNutrients[nutrient.name] = {
          name: nutrient.name,
          value: prevNutrientValue + parseFloat(nutrient.value) * food.quantity/100,
          unit: nutrient.unit
        }
      })
    })
    this.setState({totalNutrients: newTotalNutrients});
  }

  componentDidMount(){
    const {dietList} = this.props;
    if(dietList.length > 0){
        this.getNutrientsForDiet(dietList);
    }
  }

  componentWillReceiveProps(nextProps){
    const {dietList} = this.props;
    if (nextProps.dietList.length > dietList.length) {
      this.getNutrientsForDiet(nextProps.dietList);
    }
    else{
      this.computeTotals(nextProps.dietList);
    }
  }

  getNutrientsForDiet(dietList){
    api.fetchFoodsInfo(dietList.map((food) => {
      return food.ndbno;
    }))
      .then((data) => {
      if(data.errorMessage){
        //TODO handle error
        return;
      }
      this.setState({nutrientsInfo: data});
      this.computeTotals();
    })
  }

  render() {
    const {dietList} = this.props;
    const {totalNutrients} = this.state;
    return (
      <div className='total'>
        {dietList.length > 0 &&
          <div>
            <span className='title'>Total</span>
            <hr style={{border:'solid white'}}></hr>
          </div>
        }
        {
          Object.keys(totalNutrients).map((nutrientName) => {
            let nutrient = totalNutrients[nutrientName];
            return(
              <div
                className='nutrient'
                key={nutrient.name}>
                  <span>{nutrient.name}:</span>
                  <span>{nutrient.value.toFixed(2)} {nutrient.unit}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
}

Total.propTypes = {
  dietList: PropTypes.array.isRequired
}

Total.defaultProps = {
  dietList: []
}

export default Total;
