import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { showNotification as showNotificationAction } from "react-admin";
import { push as pushAction } from "react-router-redux";

class ImportAction extends Component {
  componentDidMount = () => {
    const { resource, basePath, selectedIds, onExit, pushAction } = this.props;
    this.importEnterprises(selectedIds);
    onExit();
  };

  importEnterprises(ids) {
    const token = localStorage.getItem('token');
    let axiosConfig = {
      headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
    };
    axios
      .post("/api/admin/enterprises", { ids }, axiosConfig)
      .then(res => {
        this.props.showNotificationAction("Applications imported");
      })
      .catch(err => {
        console.log(err)
        this.props.showNotificationAction(
          "An error ocurred while importing applications",
          "warning"
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
