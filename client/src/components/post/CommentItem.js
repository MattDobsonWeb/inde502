import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      <div className="post my-3 p-3 rounded box-shadow bg-navy text-white border-bottom-neon">
        <div className="media">
          <img src={comment.avatar} alt="" className="avatar mr-3 rounded" />
          <div className="media-body d-block">
            <div className="post-header">
              <strong className="mb-0 mr3">{comment.username}</strong>
              <div className="dropdown show float-right">
                <a
                  className="dropdown-toggle"
                  href="https://example.com"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Moment fromNow>{comment.date}</Moment>
                </a>

                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link
                    className="dropdown-item"
                    to={`/profile/${comment.username}`}
                  >
                    View Profile
                  </Link>

                  {/* If it is current users post, allow to delete */}
                  {comment.user === auth.user.id || auth.user.admin ? (
                    <span>
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        onClick={this.onDeleteClick.bind(
                          this,
                          postId,
                          comment._id
                        )}
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
                <a className="orange-link" href="">
                  @{comment.username}
                </a>
              </span>
              {comment.text}
            </p>
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
