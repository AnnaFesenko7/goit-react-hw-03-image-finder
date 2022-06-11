import s from './ImageGalleryItem.module.css';
import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, tags, largeImageURL } = this.props.galleryItem;
    return (
      <li key={id} className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => {
            this.props.onGalleryItemClick(largeImageURL, tags);
          }}
        />
      </li>
    );
  }
}
