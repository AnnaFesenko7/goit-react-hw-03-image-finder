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
    //

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending', data: [] });
      this.getNewData(nextSearchQuery, page);
    }
    if (prevPage !== page) {
      this.setState({ status: 'pending' });
      this.getNewData(nextSearchQuery, page);
    }
  }

  getNewData(nextSearchQuery, page) {
    fetchQuery(nextSearchQuery, page)
      .then(searchedData => {
        const newData = searchedData.hits;
        if (newData.length === 0) {
          this.setState({ status: 'rejected' });
          return Promise.reject(
            new Error(`Nothing found on the topic ${nextSearchQuery}`)
          );
        }
        this.changeState(newData);
      })
      .catch(error => this.setState({ error }));
  }

  changeState(newData) {
    this.setState(prevState => ({
      data: [...prevState.data, ...newData],
      status: 'resolved',
    }));
  }

  render() {
    const { data, error, status } = this.state;

    return (
      <>
        {status === 'pending' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ThreeDots
              height="100"
              width="100"
              color="red"
              ariaLabel="loading"
            />
          </div>
        )}
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
        {status === 'resolved' && (
          <div className={s.ButtonContainer}>{this.props.children}</div>
        )}

        {status === 'rejected' && <h1>{error.message}</h1>}
      </>
    );
  }
}

export default ImageGallery;
