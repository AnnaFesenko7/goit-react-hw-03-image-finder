import React, { Component } from 'react';
import s from './App';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  state = {
    showModal: false,
    activeImgURL: '',
    activeImgAlt: '',
    searchQuery: '',
    page: 1,
  };

  onSearchButton = searchQuery => {
    // console.log('Click on Search', searchQuery);
    this.setState({ searchQuery, page: 1 });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  onGalleryItemClick = (activeImgURL, activeImgAlt) => {
    this.setState({
      activeImgURL,
      activeImgAlt,
    });
    this.toggleModal();
  };
  onLoadMore = event => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { showModal, searchQuery, page } = this.state;
    return (
      <div className={s.App}>
        <Searchbar aria-label="Search" onSubmitClick={this.onSearchButton}>
          <SearchIcon width="20" height="20" />
        </Searchbar>

        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          onGalleryItemClick={this.onGalleryItemClick}
        >
          <Button onLoadMore={this.onLoadMore} />
        </ImageGallery>

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            activeImgURL={this.state.activeImgURL}
            activeImgAlt={this.state.activeImgAlt}
          ></Modal>
        )}
        <ToastContainer
          closeButton={false}
          position="bottom-right"
          autoClose={3000}
        />
      </div>
    );
  }
}
