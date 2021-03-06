import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  constructor() {
    super();

    this.state = {
      itemsToShow: 10,
      showButton: false
    };

    this.showMore = this.showMore.bind(this);
    this.checkShowButton = this.checkShowButton.bind(this);
  }

  checkShowButton() {
    const { posts } = this.props;
    if (this.state.itemsToShow < posts.length) {
      return true;
    }
  }

  showMore() {
    const { posts } = this.props;
    if (this.state.itemsToShow + 10 < posts.length) {
      this.setState({ itemsToShow: this.state.itemsToShow + 10 });
    } else if (
      this.state.itemsToShow + 10 <
      posts.length <
      this.state.itemsToShow
    ) {
      this.setState({
        itemsToShow: this.state.itemsToShow + 10,
        showButton: false
      });
    }
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        {posts
          .slice(0, this.state.itemsToShow)
          .map(post => <PostItem key={post._id} post={post} />)}
        {this.checkShowButton() ? (
          <a style={{ cursor: "pointer" }} onClick={this.showMore}>
            <div className="bg-navy text-white p-2 mb-3 text-center rounded border-bottom-neon">
              <p className="mb-0">SHOW MORE</p>
            </div>
          </a>
        ) : null}
      </div>
    );
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
