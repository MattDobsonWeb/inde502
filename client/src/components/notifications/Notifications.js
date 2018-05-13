import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import NotificationFeed from "./NotificationFeed";
import {
  getNotifications,
  markNotificationsRead,
  getUnreadNotifications
} from "../../actions/notificationActions";

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifications();
    this.props.markNotificationsRead();
    this.props.getUnreadNotifications();
  }

  render() {
    const { notifications, loading } = this.props.notification;

    let notificationContent;

    if (notifications === null) {
      notificationContent = <Spinner />;
    } else {
      notificationContent = <NotificationFeed notifications={notifications} />;
    }

    return (
      <div className="container">
        <div className="col-md-8 m-auto">
          <Link to="/" className="btn btn-outline-orange mt-3">
            Back To Feed
          </Link>
          {notificationContent}
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
  getUnreadNotifications: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notification: state.notification,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getNotifications,
  markNotificationsRead,
  getUnreadNotifications
})(Notifications);
