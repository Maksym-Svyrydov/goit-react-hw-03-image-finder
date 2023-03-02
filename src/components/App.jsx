import { fetchGallery } from '../API/AxiosAPI';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from '../components/Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
// import { ImageItem } from '../components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../components/Modal/Modal';
import { Conatiner } from './App.styled';
// import Image from './ImageGalleryItem';
export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    page: 1,
    images: [],
    largeImageURL: '',
    modalImage: '',
    showModal: false,
  };
  componentDidUpdate = (_, prevState) => {
    if (this.state.query !== prevState.query) {
      fetchGallery(this.state.query, this.state.page)
        .then(data => {
          this.setState(prevState => ({
            images:
              this.state.page === 1
                ? [...data.hits]
                : [...prevState.images, ...data.hits],
            totalHits:
              this.state.page === 1
                ? data.totalHits - data.hits.length
                : data.totalHits - [...prevState.images, ...data.hits].length,
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };
  handleFormSubmit = query => {
    this.setState({ query });
  };
  toggleModal = modalImage => {
    if (!modalImage) {
      this.setState({ largeImageURL: '', showModal: false });
      return;
    }
    this.setState({ modalImage, showModal: true });
  };
  render() {
    return (
      <Conatiner>
        <ToastContainer autoClose={2500} />
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} openModal={this.toggleModal} />
        {this.state.showModal && (
          <Modal
            closeModal={this.toggleModal}
            modalImage={this.state.modalImage}
          />
        )}
      </Conatiner>
    );
  }
}
