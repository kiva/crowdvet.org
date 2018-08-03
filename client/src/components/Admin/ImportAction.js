import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { showNotification as showNotificationAction } from 'react-admin';
import { push as pushAction } from 'react-router-redux';

class ImportAction extends Component {
  componentDidMount = () => {
    const { resource, basePath, selectedIds, onExit, pushAction } = this.props;
    this.importEnterprises(selectedIds);
    onExit();
  };

  importEnterprises(ids) {
    axios
      .post('/api/admin/enterprises', { ids })
      .then(res => {
        this.props.showNotificationAction('Applications imported');
      })
      .catch(err => {
        this.props.showNotificationAction(
          'An error ocurred while importing applicattions',
          'warning'
        );
      });
  }

  render() {
    return null;
  }
}

export default connect(undefined, { showNotificationAction, pushAction })(
  ImportAction
);
