import React, { Component } from "react";
import {
  followUser,
  unfollowUser,
  getProfileByUsername
} from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ProfileHeader extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.findUserFollowing = this.findUserFollowing.bind(this);
  }

  onClick(e) {
    const { profile } = this.props.profile;

    e.preventDefault();

    if (!this.findUserFollowing(profile.followers)) {
      this.props.followUser(profile.user.username);
    } else {
      this.props.unfollowUser(profile.user.username);
    }
  }

  findUserFollowing(followers) {
    const { user } = this.props.auth;

    if (
      followers.filter(following => following.username === user.username)
        .length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { profile } = this.props.profile;
    const { user, isAuthenticated } = this.props.auth;

    let followButton;

    if (user.username === profile.user.username || !isAuthenticated) {
      followButton = null;
    } else {
    }

    return (
      <div className="movieHeader">
        <div className="jumbotron jumbotron-fluid bg-navy text-white box-shadow mb-0 border-bottom-orange">
          <div className="container text-center">
            <div className="col-md-8 m-auto">
              <img
                src={profile.user.avatar}
                alt=""
                className="rounded border-orange box-shadow"
              />
              <div className="profile-info">
                <h1 className="text-orange">
                  <strong>{profile.username}</strong>
                </h1>
                {profile.bio ? <p>{profile.bio}</p> : null}
                {profile.location ? (
                  <p className="mb-0">
                    <strong className="text-orange">Location</strong>{" "}
                    {profile.location}
                  </p>
                ) : null}
              </div>

              {user.username !== profile.user.username || !isAuthenticated ? (
                this.findUserFollowing(profile.followers) ? (
                  <div
                    className="btn btn-outline-orange mt-3"
                    onClick={this.onClick}
                  >
                    UNFOLLOW
                  </div>
                ) : (
                  <div
                    className="btn btn-outline-orange mt-3"
                    onClick={this.onClick}
                  >
                    FOLLOW
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>

        <div className="ratings p-3 box-shadow text-white bg-navy border-bottom-orange">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-4 border-right">
                <strong />
                <p className="mb-0">Posts</p>
              </div>
              <div className="col-md-4 border-right">
                <strong>{profile.following.length}</strong>
                <p className="mb-0">Following</p>
              </div>
              <div className="col-md-4">
                <strong className="m">{profile.followers.length}</strong>
                <p className="mb-0 mt-0">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  followUser: PropTypes.func.isRequired,
  getProfileByUsername: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
  getProfileByUsername
})(ProfileHeader);
