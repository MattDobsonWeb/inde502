import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import MovieHeader from "./MovieHeader";
import PostFeed from "../posts/PostFeed";
import PostForm from "../posts/PostForm";
import { getMovieData } from "../../actions/movieActions";
import { getMoviePosts } from "../../actions/postActions";

class Movie extends Component {
  componentDidMount() {
    this.props.getMovieData(
      this.props.match.params.media,
      this.props.match.params.movie_id
    );
    this.props.getMoviePosts(this.props.match.params.movie_id);
  }
  render() {
    const { movieData, loading } = this.props.movie;
    const { posts } = this.props.post;

    let movieContent;

    if (movieData === null || loading) {
      movieContent = <Spinner />;
    } else {
      movieContent = (
        <div>
          <MovieHeader movieData={movieData} />
          <div className="container">
            <div className="col-md-8 m-auto">
              <PostFeed posts={posts} />
            </div>
          </div>
        </div>
      );
    }

    return <div>{movieContent}</div>;
  }
}

Movie.propTypes = {
  getMovieData: PropTypes.func.isRequired,
  getMoviePosts: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie,
  post: state.post
});

export default connect(mapStateToProps, {
  getMovieData,
  getMoviePosts
})(Movie);
