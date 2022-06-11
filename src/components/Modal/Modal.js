import s from './Modal.module.css';

import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log(e.code);

      this.props.onClose();
    }
  };
  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { activeImgURL, activeImgAlt } = this.props;
    return (
      <div className={s.Overlay} onClick={this.onOverlayClick}>
        <div className={s.Modal}>
          <img src={activeImgURL} alt={activeImgAlt} />
        </div>
      </div>
    );
  }
}
