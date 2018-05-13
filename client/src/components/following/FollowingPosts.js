import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "../../components/posts/PostForm";
import PostFeed from "../../components/posts/PostFeed";
import Spinner from "../common/Spinner";
import { getFollowingPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getFollowingPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    const { isAuthenticated } = this.props.auth;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="container feed">
        <div className="row">
          <div className="col-md-3">
            <div className="text-center my-3 rounded box-shadow">
              <h1>TODO: USERINFO</h1>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-salmon rounded box-shadow">
              <i className="fab fa-patreon fa-3x patreon mr-3" />
              <div className="lh-100">
                <h6 className="mb-0 text-white lh 100">
                  Support Us On Patreon!
                </h6>
                <small>
                  ReelFans costs a lot of money to maintain in server costs and
                  it would be great if you could support us!
                </small>
              </div>
            </div>
            {isAuthenticated ? <PostForm /> : null}
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getFollowingPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getFollowingPosts })(Posts);
