import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfileByUsername } from "../../actions/profileActions";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";
import ProfileHeader from "./ProfileHeader";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByUsername(this.props.match.params.username);
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params.username;
    const nextId = nextProps.match.params.username;

    if (currentId !== nextId) {
      this.props.getProfileByUsername(nextId);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileHeader;

    if (profile === null || loading) {
      profileHeader = <Spinner />;
    } else {
      profileHeader = <ProfileHeader profile={profile} />;
    }

    return <div>{profileHeader}</div>;
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
