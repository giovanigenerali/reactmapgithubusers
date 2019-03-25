/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ModalActions } from '../../store/ducks/modal';
import { Creators as UsersActions } from '../../store/ducks/users';

import './styles.css';

Modal.setAppElement(document.getElementById('root'));

class AddUser extends Component {
  static propTypes = {
    modal: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    userInput: '',
  };

  handleInputChange = e => this.setState({ userInput: e.target.value });

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { loading } = this.props;

    if (loading) return;

    const { userInput } = this.state;

    if (!userInput) return;

    const {
      addUserRequest,
      modal: { cordinates },
    } = this.props;

    addUserRequest(userInput, cordinates);
    this.setState({ userInput: '' });
  };

  handleHideModal = () => {
    const { hideModal } = this.props;
    hideModal();
    this.setState({ userInput: '' });
  };

  render() {
    const { modal, loading } = this.props;
    const { userInput } = this.state;

    return (
      <Modal
        isOpen={modal.visible}
        onRequestClose={this.handleHideModal}
        contentLabel="Modal Add User"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <h2>Adicionar Novo Usuário</h2>
        <form onSubmit={this.handleFormSubmit} className="form">
          <input
            placeholder="Usuário do Github"
            value={userInput}
            onChange={this.handleInputChange}
          />
          <div className="buttons-container">
            <button type="button" onClick={this.handleHideModal}>
              Cancelar
            </button>
            <button type="submit">
              {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Salvar'}
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  loading: state.users.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...ModalActions, ...UsersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
