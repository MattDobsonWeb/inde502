import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAdminPosts, getAdminUserPosts } from "../../actions/adminActions";
import PostFeed from "../posts/PostFeed";
import TextFieldGroup from "../common/TextFieldGroup";
import isEmpty from "../../validation/is-empty";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: "",
      username: "",
      toneResults: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUserPostsSubmit = this.onUserPostsSubmit.bind(this);
    this.onUserPostsReset = this.onUserPostsReset.bind(this);
    this.onRecentPostsReset = this.onRecentPostsReset.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.getAdminPosts(this.state.hours);
  }

  onUserPostsSubmit(e) {
    e.preventDefault();

    this.props.getAdminUserPosts(this.state.username);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUserPostsReset(e) {
    e.preventDefault();

    this.setState({ username: "" });
    this.props.getAdminUserPosts(" ");
  }

  onRecentPostsReset(e) {
    e.preventDefault();

    this.setState({ hours: "" });
    this.props.getAdminPosts(" ");
  }

  render() {
    const { posts, loading, userPosts } = this.props.admin;

    let postContent, userPostsContent;

    if (isEmpty(posts) || loading) {
      postContent = null;
    } else {
      postContent = (
        <span>
          <h3 className="mt-3">
            <span className="text-neon">{posts.posts.length}</span> posts in the
            past <span className="text-neon">{posts.timeframe}</span> hours.
          </h3>
          <PostFeed posts={posts.posts} />
        </span>
      );
    }

    if (isEmpty(userPosts) || loading) {
      userPostsContent = null;
    } else {
      userPostsContent = (
        <span>
          <h3 className="mt-3">
            <span className="text-neon">{userPosts.length}</span> posts made by{" "}
            <span className="text-neon">{userPosts[0].username}</span>
          </h3>
          <PostFeed posts={userPosts} />
        </span>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="header text-center">
            <h1 className="my-3 text-navy font-weight-bold">
              ADMIN PANEL <span className="badge badge-warning">BETA</span>
            </h1>
          </div>

          <div className="row">
            <div id="posts-hour" className="col-md-6">
              {/* GET RECENT POSTS */}
              <div className="bg-navy p-3 text-white text-center border-bottom-neon box-shadow rounded">
                <h1 className="font-weight-bold text-neon">RECENT POSTS</h1>
                <p className="lead">
                  Search for recent posts in the past hours. Admins can delete
                  posts by clicking date dropdown.
                </p>
                <form onSubmit={this.onSubmit} className="text-left">
                  <TextFieldGroup
                    placeholder="In the past ? hours"
                    name="hours"
                    value={this.state.hours}
                    onChange={this.onChange}
                    customClass="navy-form"
                    info="Input Past Hours"
                  />

                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-outline-neon btn-block mt-2"
                  >
                    SEARCH
                  </button>
                  <button
                    onClick={this.onRecentPostsReset}
                    className="btn btn-outline-danger btn-block mt-2"
                  >
                    RESET
                  </button>
                </form>
              </div>
              {postContent}
            </div>

            <div id="users-hour" className="col-md-6">
              {/* GET USER POSTS */}
              <div className="bg-navy p-3 text-white text-center border-bottom-neon box-shadow rounded">
                <h1 className="font-weight-bold text-neon">USER POSTS</h1>
                <p className="lead">
                  Search for posts from a user. Admins can delete posts by
                  clicking date dropdown.
                </p>
                <form onSubmit={this.onUserPostsSubmit} className="text-left">
                  <TextFieldGroup
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    customClass="navy-form"
                    info="Input Username"
                  />

                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-outline-neon btn-block mt-2"
                  >
                    SEARCH
                  </button>

                  <button
                    onClick={this.onUserPostsReset}
                    value="userPosts"
                    className="btn btn-outline-danger btn-block mt-2"
                  >
                    RESET
                  </button>
                </form>
              </div>
              {userPostsContent}
            </div>
          </div>
          <div className="row" />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  getAdminPosts: PropTypes.func.isRequired,
  getAdminUserPosts: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, {
  getAdminPosts,
  getAdminUserPosts
})(Admin);
