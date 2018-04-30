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
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
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
        is watching <Link to={`/movie/${post.movieId}`}>{post.movieTitle}</Link>
      </span>
    );

    return (
      <div className="my-3 p-3 bg-white rounded box-shadow">
        <div className="media text-muted">
          <img src={post.avatar} alt="" className="avatar mr-3 rounded" />
          <div className="media-body d-block">
            <p className="pb-3 mb-0 lh-125 post-text">
              <span className="mb-0">
                <strong>{post.username}</strong>{" "}
                <span className="float-right">
                  <Moment fromNow ago>
                    {post.date}
                  </Moment>{" "}
                  ago
                </span>
              </span>
              <span className="d-block mb-3">
                <a href="">@{post.username}</a>{" "}
                {post.movieTitle ? watchingMovie : null}
              </span>
              {post.text}
            </p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-outline-primary mr-1"
                >
                  Comments ({post.comments.length})
                </Link>
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
            ) : null}
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
