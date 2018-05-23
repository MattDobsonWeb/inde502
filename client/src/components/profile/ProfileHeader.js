import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    const { posts } = this.props;

    return (
      <span>
        <div className="movieHeader">
          <div className="jumbotron jumbotron-fluid bg-navy text-white box-shadow mb-0 border-bottom-neon">
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

                {user.username !== profile.user.username && isAuthenticated ? (
                  this.findUserFollowing(profile.followers) ? (
                    <div
                      className="btn btn-outline-neon mt-3"
                      onClick={this.onClick}
                    >
                      UNFOLLOW
                    </div>
                  ) : (
                    <div
                      className="btn btn-outline-neon mt-3"
                      onClick={this.onClick}
                    >
                      FOLLOW
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>

          <div className="ratings p-3 box-shadow text-white bg-navy border-bottom-neon">
            <div className="container text-center">
              <div className="row">
                <div className="col-md-4 border-right">
                  <strong>{posts ? posts.length : null}</strong>
                  <p className="mb-0">Posts</p>
                </div>
                <div className="col-md-4 border-right">
                  <a
                    href="#followingModal"
                    data-toggle="modal"
                    className="text-white"
                  >
                    <strong>{profile.following.length}</strong>
                    <p className="mb-0">Following</p>
                  </a>
                </div>
                <div className="col-md-4">
                  <a
                    href="#followersModal"
                    data-toggle="modal"
                    className="text-white"
                  >
                    <strong className="m">{profile.followers.length}</strong>
                    <p className="mb-0 mt-0">Followers</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Following Modal */}
        <div
          className="modal fade bg-navy-50"
          id="followingModal"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-navy text-white border-bottom-neon">
              <div className="modal-header border-bottom-neon">
                <h5
                  className="modal-title font-weight-bold text-neon"
                  id="exampleModalLongTitle"
                >
                  Following
                </h5>
                <button
                  type="button"
                  className="close text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
              <div className="modal-body py-0">
                {profile.following.map(user => (
                  <div key={user._id}>
                    <div className="followerItem d-flex py-3">
                      <img
                        src={user.userAvatar}
                        alt=""
                        width="64px"
                        height="64px"
                        className="rounded"
                      />
                      <p className="ml-3 p-0 my-auto lh-100">{user.username}</p>

                      <div className="ml-auto my-auto">
                        <Link
                          to={`/profile/${user.username}`}
                          className="btn btn-outline-neon"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Follower Modal */}
        <div
          className="modal fade bg-navy-50"
          id="followersModal"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-navy text-white border-bottom-neon">
              <div className="modal-header border-bottom-neon">
                <h5
                  className="modal-title font-weight-bold text-neon"
                  id="exampleModalLongTitle"
                >
                  Followers
                </h5>
                <button
                  type="button"
                  className="close text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
              <div className="modal-body py-0">
                {profile.followers.map(user => (
                  <div key={user._id}>
                    <div className="followerItem d-flex py-3">
                      <img
                        src={user.userAvatar}
                        alt=""
                        width="64px"
                        height="64px"
                        className="rounded"
                      />
                      <p className="ml-3 p-0 my-auto lh-100">{user.username}</p>

                      <div className="ml-auto my-auto">
                        <Link
                          to={`/profile/${user.username}`}
                          className="btn btn-outline-neon"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

ProfileHeader.propTypes = {
  followUser: PropTypes.func.isRequired,
  getProfileByUsername: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
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
