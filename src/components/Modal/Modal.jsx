import { createPortal } from 'react-dom';
import { Component } from 'react';
import { Overlay, ModalWindow, Button, Img } from '../Modal/Modal.styled';
import { Loader } from '../Loader/Loader';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = {};
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
          {this.state.modalOpen && <Loader />}
          <Img src={this.props.modalImage} alt="" />
          <Button type="button" onClick={() => this.props.closeModal()}>
            X
          </Button>
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
