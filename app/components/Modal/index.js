import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Modal extends React.Component {
  constructor (props){
    super(props);
    this.state = {
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event){
    event.preventDefault();
    if(this.props.onClose){
      this.props.onClose();
    }
  }
  render() {
    const {className, isOpen, children} = this.props;
    var modal = document.querySelector(`.${className}`);
    var body = document.querySelector('body');
      if(!isOpen){
        if(modal) {
          modal.classList.add('out');
          body.classList.remove('modal-active');
        }
        else {
          return null;
        }
      }else{
        if(modal){
          modal.classList.remove('out');
          body.classList.add('modal-active');
        }
      }
      return (
        <div className={`modal ${className}`}>
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
  isOpen: true,
  onClose: ()=>{},
  className: ''
}


export default Modal;
