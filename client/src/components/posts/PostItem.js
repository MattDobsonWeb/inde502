import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import Moment from "react-moment";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    const { post } = this.props;

    if (!this.findUserLike(post.likes)) {
      this.props.addLike(id);
    } else {
      this.props.removeLike(id);
    }
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    const watchingMovie = (
      <span>
        is watching{" "}
        <Link
          className="orange-link"
          to={`/media/${post.movieMedia}/${post.movieId}`}
        >
          {post.movieTitle}
        </Link>
      </span>
    );

    return (
      <div className="my-3 p-3 bg-navy rounded border-bottom-neon box-shadow text-white">
        <div className="media">
          <img
            src={post.avatar}
            alt=""
            className="avatar mr-3 rounded border-orange"
          />
          <div className="media-body d-block">
            <div className="post-header">
              <strong className="mb-0 mr3">{post.username}</strong>
              <div className="dropdown show float-right">
                <a
                  className="dropdown-toggle"
                  href="https://example.com"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Moment fromNow>{post.date}</Moment>
                </a>

                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link className="dropdown-item" to={`/post/${post._id}`}>
                    View Post
                  </Link>

                  {/* If it is current users post, allow to delete */}
                  {post.user === auth.user.id || auth.user.admin ? (
                    <span>
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        onClick={this.onDeleteClick.bind(this, post._id)}
                        style={{ cursor: "pointer" }}
                      >
                        Delete Post
                      </a>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <p className="pb-3 mb-0 lh-125 border-gray">
              <span className="d-block mb-3">
                <Link className="orange-link" to={`/profile/${post.username}`}>
                  @{post.username}
                </Link>{" "}
                {post.movieTitle ? watchingMovie : null}
              </span>
              {post.text}
            </p>

            <span>
              {showActions ? (
                this.findUserLike(post.likes) ? (
                  <span>
                    <div className="btn-group">
                      <button
                        onClick={this.onLikeClick.bind(this, post._id)}
                        type="button"
                        className="btn btn-outline-neon my-2"
                      >
                        <i
                          className={classnames("fas fa-thumbs-up", {
                            "text-neon": this.findUserLike(post.likes)
                          })}
                        />
                        <span className="badge">{post.likes.length}</span>
                      </button>
                      <Link
                        to={`/post/${post._id}`}
                        className="btn btn-outline-neon my-2"
                      >
                        Comments ({post.comments.length})
                      </Link>
                    </div>
                  </span>
                ) : (
                  <span>
                    <div className="btn-group">
                      <button
                        onClick={this.onLikeClick.bind(this, post._id)}
                        type="button"
                        className="btn btn-outline-neon my-2"
                      >
                        <i
                          className={classnames("fas fa-thumbs-up text-white")}
                        />
                        <span className="badge text-white">
                          {post.likes.length}
                        </span>
                      </button>
                      <Link
                        to={`/post/${post._id}`}
                        className="btn btn-outline-neon my-2"
                      >
                        Comments ({post.comments.length})
                      </Link>
                    </div>
                  </span>
                )
              ) : null}
            </span>

            {/* Post Comments */}
            {/* <div className="mt-3">
              {!isEmpty(post.comments)
                ? post.comments.map(comment => (
                    <p>
                      <img
                        className="avatar rounded-circle border-orange"
                        src={comment.avatar}
                      />{" "}
                      {comment.text}
                    </p>
                  ))
                : null}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
