import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getUnreadNotifications } from "../../actions/notificationActions";

class Navbar extends Component {
  componentDidMount() {
    this.props.getUnreadNotifications();
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { unreadNotifications } = this.props.notification;

    // Auth Links for logged in users!
    const authLinks = (
      <div className="collapse navbar-collapse" id="navbarsExample07">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Post Feed
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/following-feed">
              Following Feed
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/notifications">
              Notifications ({unreadNotifications.amount})
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="http://example.com"
              id="dropdown07"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="rounded-circle avatar-nav mr-2"
                src={user.avatar}
                alt=""
                title="You must have a Gravatar connected to your email to display an image"
              />
              {user.username}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right text-right bg-navy text-white"
              aria-labelledby="dropdown07"
            >
              <Link className="dropdown-item" to={`/profile/${user.username}`}>
                <i className="fas fa-user-circle mr-1" /> Your Profile
              </Link>
              <a
                className="dropdown-item"
                onClick={this.onLogoutClick.bind(this)}
                href=""
              >
                <i className="fas fa-sign-out-alt mr-1" /> Logout
              </a>
              <div className="dropdown-divider" />
              <Link className="dropdown-item" to="/edit-profile">
                <i className="fas fa-cog mr-1" /> Edit Profile
              </Link>
            </div>
          </li>
        </ul>
      </div>
    );

    // Links for guests to the website!
    const guestLinks = (
      <div className="collapse navbar-collapse" id="navbarsExample07">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Post Feed
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto self">
          <li className="nav-item align-self-center">
            <Link className="nav-link text-white" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item align-self-center">
            <Link className="nav-link text-orange" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-lg bg-navy box-shadow border-bottom-orange">
        <div className="container">
          <Link className="navbar-brand lh-100" to="/">
            REEL<br />NATTER.
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample07"
            aria-controls="navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* If Logged in show auth links, if not guest links */}
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getUnreadNotifications: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});

export default connect(mapStateToProps, { logoutUser, getUnreadNotifications })(
  Navbar
);
