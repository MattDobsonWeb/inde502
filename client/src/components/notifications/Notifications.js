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
  }

  render() {
    const { notifications, loading } = this.props.notification;

    let notificationContent;

    if (notifications === null && loading) {
      notificationContent = <Spinner />;
    } else if (notifications === null) {
      notificationContent = (
        <div className="bg-navy border-bottom-neon text-center text-white rounded p-3 box-shadow mt-3">
          <h3 className="font-weight-bold mb-0">No Notifications To Show</h3>
        </div>
      );
    } else {
      notificationContent = <NotificationFeed notifications={notifications} />;
    }

    return (
      <div className="container">
        <div className="col-md-8 m-auto">
          <Link to="/" className="btn btn-outline-neon mt-3">
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
