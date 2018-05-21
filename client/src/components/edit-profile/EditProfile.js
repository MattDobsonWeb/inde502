import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { editProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

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

    if (nextProps.profile.currentProfile) {
      const profile = nextProps.profile.currentProfile;

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
    const { auth } = this.props;

    return (
      <div className="edit-profile">
        <div className="container">
          <div className="col-md-6 m-auto">
            <div className="login bg-navy p-3 border-bottom-neon rounded mt-5 text-white box-shadow">
              <h1 className="font-weight-bold text-neon text-center mb-3">
                EDIT PROFILE
              </h1>
              <div className="avatar-section text-center">
                <img
                  src={auth.user.avatar}
                  alt=""
                  className="rounded mb-2"
                  height="128px"
                />
                <p className="mb-3 text-center">
                  We use Gravatar for user avatars, to create or edit your
                  Gravatar go{" "}
                  <a
                    href="http://www.gravatar.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    here.
                  </a>
                </p>
              </div>

              <form onSubmit={this.onSubmit}>
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  customClass="navy-form"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  customClass="navy-form"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City, town or country"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  customClass="navy-form"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-outline-neon btn-block mt-4"
                />
              </form>
            </div>
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
