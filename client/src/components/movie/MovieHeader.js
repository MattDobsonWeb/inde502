import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import currencyFormatter from "currency-formatter";

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
          className="jumbotron jumbotron-fluid border-bottom-neon box-shadow text-light mb-0"
          style={backgroundImage}
        >
          <div className="container">
            <div className="col-lg-10 m-auto d-flex flex-sm-nowrap flex-wrap justify-content-center">
              <div className="mr-sm-5 my-auto">
                <img
                  src={imageURI}
                  alt=""
                  style={{ maxHeight: "400px", minWidth: "200px" }}
                  className="rounded img-fluid drop-shadow"
                />
              </div>
              <div className="media-info my-auto pt-3">
                <h1 className="font-weight-bold mb-0 lh-100 text-neon">
                  {movieData.title ? movieData.title : movieData.name}
                </h1>
                <h3 className="font-weight-bold mb-3">
                  {" "}
                  {movieData.first_air_date ? `${tvFirstDate} - ` : movieDate}
                  {movieData.status === "Ended"
                    ? tvLastDate
                    : tvLastDate
                      ? "Now"
                      : null}
                </h3>

                <h5 className="font-weight-bold text-neon">Overview</h5>
                <p>{movieData.overview}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ratings p-3 box-shadow text-white bg-navy border-bottom-neon d-none d-md-block">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-4 border-right">
                {movieData.number_of_seasons ? (
                  <span>
                    <p className="font-weight-bold m-0">
                      {movieData.number_of_seasons}{" "}
                    </p>
                    <p className="mb-0">Seasons</p>
                  </span>
                ) : movieData.budget ? (
                  <span>
                    <p className="font-weight-bold m-0">
                      {currencyFormatter.format(`${movieData.budget}`, {
                        code: "USD",
                        precision: 0
                      })}{" "}
                    </p>
                    <p className="mb-0">Budget</p>
                  </span>
                ) : (
                  <span>
                    <p className="font-weight-bold m-0">Unknown</p>
                    <p className="mb-0">Budget</p>
                  </span>
                )}
              </div>
              <div className="col-md-4 border-right">
                {movieData.number_of_episodes ? (
                  <span>
                    <p className="font-weight-bold m-0">
                      {movieData.number_of_episodes}{" "}
                    </p>
                    <p className="mb-0">Episodes</p>
                  </span>
                ) : movieData.revenue ? (
                  <span>
                    <p className="font-weight-bold m-0">
                      {currencyFormatter.format(`${movieData.revenue}`, {
                        code: "USD",
                        precision: 0
                      })}{" "}
                    </p>
                    <p className="mb-0">Revenue</p>
                  </span>
                ) : (
                  <span>
                    <p className="font-weight-bold m-0">Unknown</p>
                    <p className="mb-0">Revenue</p>
                  </span>
                )}
              </div>
              <div className="col-md-4">
                {movieData.episode_run_time ? (
                  <span>
                    <p className="font-weight-bold m-0">
                      {movieData.episode_run_time} mins
                    </p>
                    <p className="mb-0">Episode Run Time</p>
                  </span>
                ) : movieData.runtime ? (
                  <span>
                    <p className="font-weight-bold m-0">
                      {movieData.runtime} mins
                    </p>
                    <p className="mb-0">Run Time</p>
                  </span>
                ) : (
                  <span>
                    <p className="font-weight-bold m-0">Unknown</p>
                    <p className="mb-0">Run Time</p>
                  </span>
                )}
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
