import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white box-shadow border-bottom border-dark-gray">
        <div className="container">
          <a className="navbar-brand text-muted" href="">
            reel.fans
          </a>
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
                <Link className="nav-link" to="/feed">
                  Post Feed
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto self">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
            <Link className="nav-link" to="/login">
              <form className="form-inline my-2 my-lg-0">
                <button className="btn btn-outline-primary">Login</button>
              </form>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
