import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import Moment from "react-moment";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="post my-3 p-3 rounded box-shadow bg-navy text-white border-bottom-orange">
        <div className="media">
          <img
            src={comment.avatar}
            alt=""
            className="avatar mr-3 rounded-circle border-orange"
          />
          <div className="media-body d-block">
            <p className="pb-3 mb-0 lh-125 border-gray">
              <strong className="mb-0 mr-3">{comment.username}</strong>
              <span className="float-right">
                <Moment fromNow>{comment.date}</Moment>
              </span>

              <span className="d-block mb-3">
                <a className="orange-link" href="">
                  @{comment.username}
                </a>
              </span>
              {comment.text}
            </p>
            <span>
              {comment.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                  type="button"
                  className="btn btn-outline-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
