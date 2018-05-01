import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

class MovieHeader extends Component {
  render() {
    const { movieData } = this.props;

    let tvFirstDate;
    let tvLastDate;
    let movieDate;

    if (!isEmpty(movieData.first_air_date)) {
      tvFirstDate = movieData.first_air_date.split("-")[0];
    }

    if (!isEmpty(movieData.last_air_date)) {
      tvLastDate = movieData.last_air_date.split("-")[0];
    }

    if (!isEmpty(movieData.release_date)) {
      movieDate = movieData.release_date.split("-")[0];
    }

    const imageURI = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

    const backgroundImage = {
      backgroundImage: `linear-gradient( rgba(13,42,53,.7), rgba(13,42,53,.7) ),
       url(https://image.tmdb.org/t/p/w1280${movieData.backdrop_path})`,
      backgroundSize: "cover"
    };

    return (
      <div className="movieHeader">
        <div
          className="jumbotron jumbotron-fluid box-shadow mb-0 border-bottom-orange"
          style={backgroundImage}
        >
          <div className="container text-center">
            <div className="col-md-8 m-auto">
              <div className="media text-white">
                <img
                  src={imageURI}
                  alt=""
                  className="align-self-center mr-4 rounded poster box-shadow"
                />
                <div className="media-body text-left align-self-center">
                  <h1 className="mt-0 mb-0">
                    <strong>
                      {movieData.title ? movieData.title : movieData.name}
                    </strong>
                  </h1>
                  <h4>
                    <strong className="text-orange">
                      {movieData.first_air_date
                        ? `${tvFirstDate} - `
                        : movieDate}
                      {movieData.status === "Ended"
                        ? tvLastDate
                        : tvLastDate
                          ? "Now"
                          : null}
                    </strong>
                  </h4>
                  <div className="movie-info text-white">
                    <strong className="text-orange">Plot</strong>
                    <p>{movieData.overview}</p>
                    <strong className="text-orange">Director</strong>
                    <p>{movieData.Director}</p>
                    <strong className="text-orange">Cast</strong>
                    <p>{movieData.Actors}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ratings p-3 box-shadow text-white bg-navy border-bottom-orange">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-4 border-right">
                <strong>{movieData.imdbVotes}</strong>
                <p className="mb-0">IMDB Ratings</p>
              </div>
              <div className="col-md-4 border-right">
                <strong>{movieData.imdbRating} / 10</strong>
                <p className="mb-0">IMDB</p>
              </div>
              <div className="col-md-4">
                <strong className="m">80%</strong>
                <p className="mb-0 mt-0">Metacritic</p>
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
