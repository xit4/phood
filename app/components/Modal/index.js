import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Modal extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      firstTime: true
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event){
    event.preventDefault();
    if(this.props.onClose){
      this.props.onClose();
    }
  }

  componentDidUpdate(){
      const {isOpen} = this.props;
      const {firstTime} = this.state;
      if(isOpen && firstTime){
        this.setState({firstTime: false});
      }
  }
  render() {
    const {firstTime} = this.state;
    const {className, isOpen, children} = this.props;
    if(firstTime && !isOpen){
      return null;
    }
    let body = document.querySelector('body');
      if(!isOpen){
          body.classList.remove('modal-active');
      }else{
          body.classList.add('modal-active');
      }
      return (
        <div className={`modal ${className}${isOpen ? '' : ' out'}`}>
          <div
            className='backdrop'
            onClick={e =>{this.handleClose(e)}}>
          </div>
          <div className='popup'>
            {children}
          </div>
        </div>
      )
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}

Modal.defaultProps ={
  isOpen: false,
  onClose: ()=>{},
  className: ''
}


export default Modal;
