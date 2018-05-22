import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import store from "./store";

import { getUnreadNotifications } from "./actions/notificationActions";

class AppContainer extends Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      store.dispatch(getUnreadNotifications());
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(mapStateToProps, { getUnreadNotifications })(AppContainer)
);
