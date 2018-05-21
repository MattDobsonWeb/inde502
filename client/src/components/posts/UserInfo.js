import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UserInfo extends Component {
  render() {
    const { currentProfile } = this.props;
    return (
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
            <p className="font-weight-bold mb-0 lh-100">FOLLOWING</p>
            <p className="lh-100">{currentProfile.following.length}</p>
          </div>
          <div className="col-lg-6">
            <p className="font-weight-bold mb-0 lh-100">FOLLOWERS</p>
            <p className="lh-100">{currentProfile.followers.length}</p>
          </div>
        </div>
      </div>
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
