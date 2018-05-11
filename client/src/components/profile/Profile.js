import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfileByUsername } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByUsername(this.props.match.params.username);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="container">
          <h1>{profile.user.username}</h1>
          <img src={profile.user.avatar} alt="" />
        </div>
      );
    }

    return (
      <div>
        <div>{profileContent}</div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByUsername })(Profile);
