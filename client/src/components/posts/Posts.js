import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import UserInfo from "./UserInfo";
import LoginSidebar from "./LoginSidebar";
import FeaturedMovies from "./FeaturedMovies";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import { getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class Posts extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;

    this.props.getPosts();

    if (isAuthenticated) {
      this.props.getCurrentProfile();
    }
  }

  render() {
    const { posts, loading } = this.props.post;
    const { isAuthenticated } = this.props.auth;
    const { currentProfile } = this.props.profile;

    let postContent, profileContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          {posts.length > 0 ? (
            <PostFeed posts={posts} />
          ) : (
            <div className="bg-navy border-bottom-neon text-center text-white rounded p-3 box-shadow mt-3">
              <h3 className="font-weight-bold mb-0">
                Currently No Posts To Show
              </h3>
            </div>
          )}
        </div>
      );
    }

    if (currentProfile === null || isEmpty(currentProfile)) {
      profileContent = <Spinner />;
    } else {
      profileContent = <UserInfo currentProfile={currentProfile} />;
    }

    return (
      <div>
        <FeaturedMovies />
        <div className="container feed">
          <div className="row">
            <div className="col-md-3 d-none d-md-block">
              {isAuthenticated ? profileContent : <LoginSidebar />}
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-salmon rounded box-shadow">
                <i className="fab fa-patreon fa-3x patreon mr-3" />
                <div className="lh-100">
                  <h6 className="mb-0 text-white lh 100">
                    Support Us On Patreon!
                  </h6>
                  <small>
                    ReelFans costs a lot of money to maintain in server costs
                    and it would be great if you could support us!
                  </small>
                </div>
              </div>
              {isAuthenticated ? <PostForm /> : null}
              {postContent}
            </div>

            <div className="col-md-3">
              <div className="text-center my-3 rounded box-shadow border-bottom-blue">
                <div className="text-white bg-navy p-3 rounded border-bottom-neon">
                  <p className="mb-0">Copyright @ReelNatter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
