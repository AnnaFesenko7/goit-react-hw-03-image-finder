import s from './Searchbar.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    searchSubject: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node,
    'aria-label': PropTypes.string.isRequired,
  };
  handleSubjectChange = event => {
    this.setState({
      searchSubject: event.currentTarget.value.toLowerCase(),
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchSubject.trim() === '') {
      // alert('Enter what you want to find ');
      toast.error('Enter what you want to find ', {
        position: 'top-right',
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
    this.props.onSubmit(this.state.searchSubject);
    this.setState({ searchSubject: '' });
  };
  render() {
    const { children, onSubmit, ...allyProps } = this.props;
    return (
      <div className={s.Searchbar}>
        <form className={s.form__thumb} onSubmit={this.handleSubmit}>
          <input
            className={s.form__input}
            type="text"
            name="searchSubject"
            value={this.state.searchSubject}
            onChange={this.handleSubjectChange}
            // id="name"
            placeholder="Search images and photos"
          />
          <button className={s.icon__button} type="submit" {...allyProps}>
            {children}
          </button>
        </form>
      </div>
    );
  }
}
