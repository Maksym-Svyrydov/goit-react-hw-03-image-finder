import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay, ModalWindow, Button, Img } from '../Modal/Modal.styled';
// import { Loader } from '../Loader/Loader';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  closeEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount = () => {
    window.addEventListener('keydown', this.closeEsc);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.closeEsc);
  };
  render() {
    const { closeModal, modalImage } = this.props;
    return createPortal(
      <Overlay
        onClick={e => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <ModalWindow>
          <Button type="button" onClick={() => closeModal()}>
            X
          </Button>
          <Img src={modalImage} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
};
