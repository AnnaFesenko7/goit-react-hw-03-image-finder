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
    searchSubject: '',
    page: 1,
  };

  onSearchButton = searchSubject => {
    console.log('Click on Search');
    this.setState({ searchSubject });
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
  onLoadMore = () => {
    console.log('onLoadMore');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { showModal, searchSubject, page } = this.state;
    return (
      <div className={s.App}>
        <Searchbar aria-label="Search" onSubmit={this.onSearchButton}>
          <SearchIcon width="20" height="20" />
        </Searchbar>

        <ImageGallery
          searchQuery={searchSubject}
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
