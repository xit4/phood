import React from 'react';
import PropTypes from 'prop-types';
import manager from '../../utils/manager';
import {Link} from 'react-router-dom';
import './style.scss';

class Total extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalNutrients: {},
      nutrientsInfo: []
    };
    this.computeTotals = this.computeTotals.bind(this);
  }

  computeTotals(dietList = this.props.dietList) {
    let newTotalNutrients = {}
    const {nutrientsInfo} = this.state;
    dietList.map(food => {
      const foodNutrientsArray = nutrientsInfo.filter(el => el.food.desc.ndbno === food.ndbno);

      if(foodNutrientsArray.length === 0){
        return;
      }
      let foodNutrients = foodNutrientsArray[0].food.nutrients;

      foodNutrients.forEach(nutrient => {
        let prevNutrientValue = newTotalNutrients[nutrient.name]
          ? newTotalNutrients[nutrient.name].value
          : 0;
        newTotalNutrients[nutrient.name] = {
          name: nutrient.name,
          value: prevNutrientValue + parseFloat(nutrient.value) * food.quantity / 100,
          unit: nutrient.unit
        }
      })
    })
    this.setState({totalNutrients: newTotalNutrients});
  }

  componentDidMount() {
    const {dietList} = this.props;
    if (dietList.length > 0) {
      this.getNutrientsForDiet(dietList);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {dietList} = this.props;
    if (nextProps.dietList.length > dietList.length) {
      this.getNutrientsForDiet(nextProps.dietList);
    } else {
      this.computeTotals(nextProps.dietList);
    }
  }

  getNutrientsForDiet(dietList) {
    manager.retrieveFoodsInfo(dietList.map(food => food.ndbno), (obj) => {
      this.setState(obj)
    }).then(() => {
      this.computeTotals();
    })
  }

  render() {
    const {dietList} = this.props;
    const {totalNutrients} = this.state;
    return (
      <div className='total'>
        {dietList.length > 0 && <div>
          <span className='title'>Total</span>
          <hr style={{
            border: 'solid white'
          }}></hr>
        </div>
        }
        {Object.keys(totalNutrients).map((nutrientName) => {
          let nutrient = totalNutrients[nutrientName];
          return (
            <div className='nutrient' key={nutrient.name}>
              <span>{nutrient.name}:</span>
              <span>{nutrient.value.toFixed(2)} {nutrient.unit}</span>
              {
                nutrient.name==='Energy' && nutrient.value.toFixed(0) == 27000 &&
                <div>
                  <br></br>
                  <b>Il primo indizio sei TU</b>
                  <br></br>
                  <Link to={'../minesweeper'}>Prossima sfida</Link>
                </div>
              }
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
