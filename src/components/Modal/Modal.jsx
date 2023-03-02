import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay, ModalWindow, Button } from '../Modal/Modal.styled';

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
    return createPortal(
      <Overlay
        onClick={e => {
          if (e.target === e.currentTarget) {
            this.props.closeModal();
          }
        }}
      >
        <ModalWindow>
          <img src={this.props.modalImage} alt="" />
          <Button type="button" onClick={() => this.props.closeModal()}>
            Закрыть
          </Button>
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
