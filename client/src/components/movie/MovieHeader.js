import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class MovieHeader extends Component {
  render() {
    const { movieData } = this.props;

    return (
      <div className="jumbotron jumbotron-fluid box-shadow p-5 bg-salmon mb-0 border-bottom">
        <div className="container text-center">
          <div className="col-md-8 m-auto">
            <div className="media text-white">
              <img
                src={movieData.Poster}
                alt=""
                className="align-self-center mr-4 rounded poster box-shadow"
              />
              <div className="media-body text-left align-self-center">
                <h1 className="mt-0 mb-0">
                  <strong>{movieData.Title}</strong>
                </h1>
                <h4>
                  <strong>{movieData.Year}</strong>
                </h4>
                <div className="movie-info text-white">
                  <p>
                    <strong>Plot</strong> {movieData.Plot}
                  </p>

                  <p>
                    <strong>Director</strong> {movieData.Director}
                  </p>

                  <p>
                    <strong>Cast</strong> {movieData.Actors}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieHeader.propTypes = {
  movieData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(mapStateToProps)(MovieHeader);
