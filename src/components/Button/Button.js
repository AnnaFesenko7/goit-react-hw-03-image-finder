import s from './Button.module.css';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button className={s.Button} onClick={this.props.onLoadMore}>
        Load more
      </button>
    );
  }
}
