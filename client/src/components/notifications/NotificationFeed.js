import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";

class NotificationFeed extends Component {
  render() {
    const { notifications } = this.props;

    return notifications.map(notification => (
      <NotificationItem key={notification._id} notification={notification} />
    ));
  }
}

NotificationFeed.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default NotificationFeed;
