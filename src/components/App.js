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
    isLastPage: false,
    query: '',
    page: 1,
  }
  setQueryToState = (query) => this.setState(prevState => ({ ...prevState, query, page: 1 }));
  findImageByQuery = () => {
    const { query, page } = this.state;

    this.toggleLoadingStatus();
      pixabayAPI.getImage(query, page).then(({ hits }) => {
        hits.length
          ? this.setState({ images: this.normalizeData(hits) })
          : toast.error(`There are no images by ${query} query`)
      })
      .catch(console.log)
      .finally(this.toggleLoadingStatus);
  }
  nextPage = () => {
    const { query, page } = this.state;

    this.toggleLoadMoreStatus();
    pixabayAPI.getImage(query, page)
      .then(({ hits }) => this.setState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...this.normalizeData(hits)],
      })))
      .catch(console.log)
      .finally(this.toggleLoadMoreStatus)
  }
  toggleLoadingStatus = () => this.setState(prevState => ({ isLoading: !prevState.isLoading }));
  toggleLoadMoreStatus = () => this.setState(prevState => ({ isLoadMore: !prevState.isLoadMore }));
  loadMore = async () => {
    this.setState(prevState => {
      const { page } = prevState;
      const isLastPage = prevState.page >= pixabayAPI.totalPages;

      return {
        ...prevState,
        page: isLastPage ? page : page + 1,
        isLastPage,
      }
    });
  };
  normalizeData = (hits) => hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL}));
  openModal = (imageURL) => this.setState({ imageModal: imageURL });
  closeModal = (e) => {
    const isEscapePressed = e.code === 'Escape';
    const isOverlayClicked = e.target === e.currentTarget;

    if (isEscapePressed || isOverlayClicked) {
      this.setState({ imageModal: '' })
    }
  };
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    
    if(query === '') {
      return toast.warn('Please, type something to start search');
    }

    if(prevState.query !== query) {
      this.findImageByQuery();
    }

    if(prevState.page !== page && page !== 1) {
      this.nextPage();
    }
  }
  render () {
    const { images, imageModal, isLoading, isLoadMore, isLastPage } = this.state;
    const shouldRenderGallery = !isLoading && images.length;

    return (
      <ThemeProvider theme={theme}>
          <Searchbar
            onSubmit={this.setQueryToState}
          />
          <main>
            {
              isLoading && <Loader type='dual-rings'/>
            }
            {
              shouldRenderGallery && <>
                                        <ImageGallery
                                          openModal={this.openModal}
                                          imageList={images}
                                        />
                                        <Button
                                            onClick={this.loadMore}
                                            showLoader={isLoadMore}
                                            disabled={isLastPage}
                                        >
                                            Load more
                                        </Button>
                                      </>
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
