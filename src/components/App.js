import { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { theme } from 'theme';

import Searchbar from './Searchbar';
import Modal from './common/Modal';
import ImageGallery from './ImageGallery';
import Button from './common/Button';
import Loader from './common/Loader';

import { pixabayAPI } from '../services';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    imageModal: '',
    isLoading: false,
    isLoadMore: false,
  }
  findImageByQuery = (query) => {
    if (query === '') {
      return toast.warn('Please, type something to start search')
    }

    const sanitizedQuery = query.trim().toLowerCase();

    this.toggleLoadingStatus();
    pixabayAPI.getImage(sanitizedQuery)
      .then(({ hits }) => hits.length ? this.setState({ images: hits }) : toast.error(`There are no images by ${query} query`))
      .catch(console.log)
      .finally(this.toggleLoadingStatus);
  ;
  }
  toggleLoadingStatus = () => this.setState(prevState => ({ isLoading: !prevState.isLoading }));
  toggleLoadMoreStatus = () => this.setState(prevState => ({ isLoadMore: !prevState.isLoadMore }));
  loadMore = async () => {
    this.toggleLoadMoreStatus();
    pixabayAPI.nextPage()
      .then(({ hits }) => this.setState(prevState => ({
          ...prevState,
          images: [...prevState.images, ...hits]})))
      .catch(console.log)
      .finally(this.toggleLoadMoreStatus);
  };
  openModal = (imageURL) => this.setState({ imageModal: imageURL });
  closeModal = (e) => {
    const isEscapePressed = e.code === 'Escape';
    const isOverlayClicked = e.target === e.currentTarget;

    if (isEscapePressed || isOverlayClicked) {
      this.setState({ imageModal: '' })
    }
  };
  render () {
    const { images, imageModal, isLoading, isLoadMore } = this.state;

    return (
      <ThemeProvider theme={theme}>
          <Searchbar
            findImageByQuery={this.findImageByQuery}
          />
          <main>
            {
              isLoading
                ? <Loader type='dual-rings'/>
                : <ImageGallery
                    openModal={this.openModal}
                    imageList={images}
                  />
            }
            {
              images.length && !isLoading
                                      ? <Button
                                          onClick={this.loadMore}
                                          showLoader={isLoadMore}
                                        >
                                          Load more
                                        </Button>
                                      : null
            }
          </main>
          {
            imageModal
              ? <Modal
                  imageURL={imageModal}
                  closeModal={this.closeModal}
                />
              : null
          }
          <ToastContainer/>
      </ThemeProvider>
    );
  }
};
