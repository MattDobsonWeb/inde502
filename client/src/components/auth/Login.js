import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="col-md-6 m-auto">
          <div className="login bg-navy p-3 border-bottom-neon rounded mt-3 text-white box-shadow">
            <h1 className="text-center font-weight-bold text-neon">LOG IN</h1>
            <p className="lead text-center">
              Sign in to your Reel Natter account.
            </p>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Username"
                name="username"
                type="text"
                customClass="post-form"
                value={this.state.username}
                onChange={this.onChange}
                error={errors.username}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                customClass="post-form"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <button
                type="submit"
                className="btn btn-outline-neon btn-lg btn-block mt-4"
              >
                LOG IN
              </button>
            </form>
            <p className="text-center p-0 m-0 mt-3">
              Not got an account? <Link to="/register">Register Here</Link>
            </p>
          </div>
          <p className="mt-3 mb-3 text-muted text-center">&copy; Reel Natter</p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
