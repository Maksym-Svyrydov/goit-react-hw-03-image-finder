import { fetchGallery } from '../API/AxiosAPI';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from '../components/Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
// import { ImageItem } from '../components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../components/Modal/Modal';
import { Conatiner } from './App.styled';
import { Loader } from '../components/Loader/Loader';
import { LoadMore } from '../components/ButtonLoadMore/Button';
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
    totalHits: 0,
  };
  componentDidUpdate = (_, prevState) => {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
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
    this.setState({ query, page: 1 });
  };
  toggleModal = modalImage => {
    if (!modalImage) {
      this.setState({ largeImageURL: '', showModal: false });
      return;
    }
    this.setState({ modalImage, showModal: true });
  };
  handleLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
    console.log(this.state.page);
  };

  render() {
    return (
      <Conatiner>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery images={this.state.images} openModal={this.toggleModal} />
        {!!this.state.totalHits && (
          <LoadMore onLoadMore={this.handleLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            closeModal={this.toggleModal}
            modalImage={this.state.modalImage}
          />
        )}

        <ToastContainer autoClose={2500} />
      </Conatiner>
    );
  }
}
