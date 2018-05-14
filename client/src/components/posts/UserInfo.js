import React, { Component } from "react";

class UserInfo extends Component {
  render() {
    const { currentProfile } = this.props;
    return (
      <div className="text-center my-3 p-3 bg-navy text-white rounded box-shadow border-bottom-orange">
        <img
          src={currentProfile.user.avatar}
          alt=""
          style={{ width: "100px" }}
          className="rounded border-orange"
        />
        <h5 className="mb-3 mt-1 text-orange">
          <strong>{currentProfile.user.username}</strong>
        </h5>
        <div className="row">
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

export default UserInfo;
