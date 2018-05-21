import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfileByUsername } from "../../actions/profileActions";
import { getProfilePosts } from "../../actions/postActions";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";
import ProfileHeader from "./ProfileHeader";
import PostFeed from "../posts/PostFeed";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByUsername(this.props.match.params.username);
    }
    this.props.getProfilePosts(this.props.match.params.username);
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
    const { posts } = this.props.post;

    let profileHeader;
    let postContent;

    if (profile === null || loading) {
      profileHeader = <Spinner />;
    } else {
      profileHeader = <ProfileHeader profile={profile} posts={posts} />;
    }

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div>
        {profileHeader}

        <div className="container">
          <div className="col-lg-8 m-auto">{postContent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  getProfilePosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, {
  getProfileByUsername,
  getProfilePosts
})(Profile);
