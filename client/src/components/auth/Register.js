import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="col-md-6 m-auto">
          <div className="login bg-navy p-3 border-bottom-neon rounded mt-3 text-white box-shadow">
            <h1 className="font-weight-bold text-center text-neon">REGISTER</h1>
            <p className="lead text-center">Create your Reel Natter account</p>
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Username"
                name="username"
                customClass="post-form"
                value={this.state.username}
                onChange={this.onChange}
                error={errors.username}
              />
              <TextFieldGroup
                placeholder="Email"
                name="email"
                type="email"
                customClass="post-form"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
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
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                customClass="post-form"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />
              <button
                type="submit"
                className="btn btn-outline-neon btn-lg btn-block mt-4"
              >
                REGISTER
              </button>
            </form>
          </div>
          <p className="mt-3 mb-3 text-muted text-center">&copy; Reel Natter</p>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
