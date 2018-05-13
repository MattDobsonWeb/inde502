import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { editProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      location: "",
      website: "",
      birthday: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.birthday = !isEmpty(profile.birthday) ? profile.birthday : "";

      // Set component fields state
      this.setState({
        website: profile.website,
        location: profile.location,
        bio: profile.bio,
        birthday: profile.birthday
      });
    }
  }

  onSubmit(e) {
    const { auth } = this.props;
    e.preventDefault();

    const profileData = {
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      birthday: this.state.birthday
    };

    this.props.editProfile(profileData, this.props.history, auth.user.username);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="edit-profile">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Profile</h1>
            <form onSubmit={this.onSubmit}>
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />

              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="City, town or country"
              />

              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />

              <TextFieldGroup
                name="birthday"
                type="date"
                value={this.state.birthday}
                onChange={this.onChange}
                error={errors.birthday}
                info="Enter your birthday!"
              />

              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
