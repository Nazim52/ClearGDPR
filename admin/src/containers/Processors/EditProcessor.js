import React from 'react';
import PropTypes from 'prop-types';

import config from '../../config';
import internalFetch from '../../helpers/internal-fetch';
import { PanelConsumer } from '../MainLayout/PanelContext';

import EditProcessorForm from '../../components/Users/EditProcessorForm';

export class EditProcessorContainer extends React.Component {
  static propTypes = {
    processor: PropTypes.object.isRequired,
    closePanel: PropTypes.func
  };

  state = {
    isLoading: false,
    errors: {}
  };

  async saveProcessor(processor, password) {
    await internalFetch(`${config.API_URL}/api/management/processors/update`, {
      method: 'POST',
      body: JSON.stringify(processor)
    }).catch(err => {
      this.setState({
        errors: {
          '': err.message
        }
      });
      return Promise.reject(err);
    });
  }

  startLoading() {
    this.setState({
      isLoading: true
    });
  }

  stopLoading() {
    this.setState({
      isLoading: false
    });
  }

  onSubmit() {
    this.startLoading();

    return this.updateProcessor(this.props.processor)
      .then(this.stopLoading.bind(this))
      .then(() => this.props.closePanel && this.props.closePanel())
      .catch(this.stopLoading.bind(this));
  }

  render() {
    return (
      <EditProcessorForm
        errors={this.state.errors}
        onSubmit={this.onSubmit.bind(this)}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default props => (
  <PanelConsumer>
    {({ closePanel }) => <EditProcessorContainer {...props} closePanel={closePanel} />}
  </PanelConsumer>
);