import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class NotificationItem extends Component {
  render() {
    const { notification, auth } = this.props;

    let textContent;

    if (notification.type === "comment") {
      textContent = "has commented on one of your posts.";
    } else if (notification.type === "like") {
      textContent = "has liked one of your posts.";
    } else if (notification.type === "commentReply") {
      textContent = "has commented on a post that you've commented on.";
    }

    return (
      <Link
        to={`/post/${notification.reference}`}
        style={{ textDecoration: "none" }}
      >
        <div className="post my-3 p-3 rounded box-shadow bg-navy text-white border-bottom-orange">
          <div className="media">
            <img
              src={notification.fromAvatar}
              alt=""
              className="avatar mr-3 rounded-circle border-orange"
            />
            <div className="media-body d-block">
              <p className=" mb-0 lh-125 border-gray">
                <span className="d-block mb-0">
                  <Link
                    className="orange-link"
                    to={`/profile/${notification.fromUsername}`}
                  >
                    {notification.fromUsername}
                  </Link>{" "}
                  {textContent}
                </span>
              </p>
              <p className="mt-0">
                <Moment fromNow>{notification.date}</Moment>
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NotificationItem);
