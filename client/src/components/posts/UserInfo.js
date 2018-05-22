import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserInfo extends Component {
  render() {
    const { currentProfile } = this.props;
    return (
      <span>
        <div className="text-center my-3 p-3 bg-navy text-white rounded box-shadow border-bottom-neon">
          <h3 className="mb-3 text-neon font-weight-bold">
            {currentProfile.user.username}
          </h3>

          <img
            src={currentProfile.user.avatar}
            alt=""
            style={{ width: "100px" }}
            className="rounded border-orange"
          />

          <div className="row mt-4">
            <div className="col-lg-6">
              <a href="#followingModal" data-toggle="modal">
                <p className="font-weight-bold mb-0 lh-100">FOLLOWING</p>
                <p className="lh-100">{currentProfile.following.length}</p>
              </a>
            </div>
            <div className="col-lg-6">
              <a href="#followersModal" data-toggle="modal">
                <p className="font-weight-bold mb-0 lh-100">FOLLOWERS</p>
                <p className="lh-100">{currentProfile.followers.length}</p>
              </a>
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
                {currentProfile.following.map(user => (
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

        {/* Followers Modal */}
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
                {currentProfile.followers.map(user => (
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

UserInfo.propTypes = {
  currentProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.movie
});

export default connect(mapStateToProps)(UserInfo);
