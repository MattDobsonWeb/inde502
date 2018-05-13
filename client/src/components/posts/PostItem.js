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
      <div className="post my-3 p-3 rounded box-shadow bg-navy text-white border-bottom-orange">
        <div className="media">
          <img
            src={post.avatar}
            alt=""
            className="avatar mr-3 rounded-circle border-orange"
          />
          <div className="media-body d-block">
            <p className="pb-3 mb-0 lh-125 border-gray">
              <strong className="mb-0 mr-3">{post.username}</strong>
              <span className="float-right">
                <Moment fromNow>{post.date}</Moment>
              </span>

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
                    <button
                      onClick={this.onLikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-outline-orange mr-1"
                    >
                      <i
                        className={classnames("fas fa-thumbs-up", {
                          "text-info": this.findUserLike(post.likes)
                        })}
                      />
                      <span className="badge">{post.likes.length}</span>
                    </button>
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-outline-orange mr-1"
                    >
                      Comments ({post.comments.length})
                    </Link>
                  </span>
                ) : (
                  <span>
                    <button
                      onClick={this.onLikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-outline-orange mr-1"
                    >
                      <i className={classnames("fas fa-thumbs-up")} />
                      <span className="badge">{post.likes.length}</span>
                    </button>
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-outline-orange mr-1"
                    >
                      Comments ({post.comments.length})
                    </Link>
                  </span>
                )
              ) : null}
              {post.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-outline-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
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