import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";

class NotificationFeed extends Component {
  constructor() {
    super();

    this.state = {
      itemsToShow: 10,
      showButton: true
    };

    this.showMore = this.showMore.bind(this);
    this.checkShowButton = this.checkShowButton.bind(this);
  }

  checkShowButton() {
    const { posts } = this.props;
    if (this.state.itemsToShow < posts.length) {
      return true;
    }
  }

  showMore() {
    const { notifications } = this.props;
    if (this.state.itemsToShow + 10 < notifications.length) {
      this.setState({
        itemsToShow: this.state.itemsToShow + 10
      });
    } else if (
      this.state.itemsToShow + 10 <
      notifications.length <
      this.state.itemsToShow
    ) {
      this.setState({
        itemsToShow: this.state.itemsToShow + 10,
        showButton: false
      });
    }
  }

  render() {
    const { notifications } = this.props;
    const { showButton } = this.state;

    return (
      <div>
        {notifications
          .slice(0, this.state.itemsToShow)
          .map(notification => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        {showButton ? (
          <a style={{ cursor: "pointer" }} onClick={this.showMore}>
            <div className="bg-navy text-white p-2 mb-3 text-center rounded border-bottom-neon">
              <p className="mb-0">SHOW MORE</p>
            </div>
          </a>
        ) : null}
      </div>
    );
  }
}

NotificationFeed.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default NotificationFeed;
