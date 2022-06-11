import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { fetchQuery } from '../../services/searchQueryAPI';
import ImageGalleryItem from 'components/ImageGalleryItem';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ThreeDots } from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    data: [],
    error: null,
    status: 'idle',
  };
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.props;
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = searchQuery;
    const prevPage = prevProps.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== page) {
      this.setState({ status: 'pending' });

      fetchQuery(nextSearchQuery, page)
        .then(searchedData => {
          const newData = searchedData.hits;
          this.changeState(newData);
        })
        .catch(error => this.setState({ error }));
    }
  }

  changeState(newData) {
    console.log(newData);

    this.setState(prevState => {
      const newArray = [...prevState.data, ...newData];
      console.log(
        '🚀 ~ file: ImageGallery.js ~ line 41 ~ ImageGallery ~ changeState ~ newArray',
        newArray
      );

      return {
        data: newArray,
        status: 'resolved',
      };
    });
  }

  render() {
    const { data, error, status } = this.state;

    if (status === 'pending') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThreeDots height="100" width="100" color="red" ariaLabel="loading" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {data.map(galleryItem => {
              return (
                <ImageGalleryItem
                  galleryItem={galleryItem}
                  onGalleryItemClick={this.props.onGalleryItemClick}
                  key={galleryItem.id}
                />
              );
            })}
          </ul>
          {this.props.children}
        </>
      );
    }
  }
}

export default ImageGallery;
