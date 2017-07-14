import React from 'react';
import Field from './Field';
import Settings from './Settings';

class Game extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Field rows={10} columns={10} bombs={17}/>
        <Settings />
      </div>
    )
  }
}


export default Game;
