import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // Auth Links for logged in users!
    const authLinks = (
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
            />dobbo
          </a>
          <div
            className="dropdown-menu dropdown-menu-right text-right bg-navy text-white"
            aria-labelledby="dropdown07"
          >
            <a
              className="dropdown-item"
              onClick={this.onLogoutClick.bind(this)}
              href=""
            >
              Logout
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="">
              Profile Settings
            </a>
          </div>
        </li>
      </ul>
    );

    // Links for guests to the website!
    const guestLinks = (
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

          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Post Feed
                </Link>
              </li>
            </ul>

            {/* If Logged in show auth links, if not guest links */}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
