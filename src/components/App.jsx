import React, { Component } from 'react';
import s from './App';
import Modal from 'components/Modal';

export default class App extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    const prevTodos = localStorage.getItem('todos');
    const parsTodos = JSON.parse(prevTodos);
    if (parsTodos) {
      this.setState({ todos: parsTodos });
    }
  }
  componentDidUpdate(prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    return (
      <div className={s.App}>
        <button onClick={this.toggleModal} type="button">
          Открыть
        </button>
        {showModal && <Modal onClose={this.toggleModal}></Modal>}
      </div>
    );
  }
}
