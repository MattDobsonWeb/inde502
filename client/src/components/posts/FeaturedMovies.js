import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getFeaturedMovies } from "../../actions/movieActions";
import Slider from "react-slick";
import Moment from "react-moment";

class FeaturedMovies extends Component {
  componentDidMount() {
    this.props.getFeaturedMovies();
  }

  render() {
    const { featuredMovies, loading } = this.props.movie;

    let featuredContent;

    if (featuredMovies === null || loading) {
      featuredContent = <Spinner />;
    } else {
      featuredContent = featuredMovies.slice(0, 5).map(movie => (
        <div key="movie.id">
          <div
            style={{
              backgroundImage: `linear-gradient( rgba(13,42,53,.7), rgba(13,42,53,.7) ),
                url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%"
            }}
            className="border-bottom-neon"
          >
            <div className="container">
              <div className="col-lg-10 m-auto d-flex flex-sm-nowrap flex-wrap justify-content-center py-5 ">
                <div className="mr-sm-5 my-auto">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt=""
                    style={{ maxHeight: "300px", minWidth: "200px" }}
                    className="rounded img-fluid drop-shadow"
                  />
                </div>
                <div className="media-info my-auto pt-3 text-white">
                  <h1 className="font-weight-bold mb-4">IN CINEMAS NOW</h1>
                  <h1 className="font-weight-bold mb-0 lh-100 text-neon">
                    {movie.title}
                  </h1>
                  <h3 className="font-weight-bold mb-4">
                    Released{" "}
                    <Moment format="Do MMMM">{movie.release_date}</Moment>
                  </h3>
                  <Link
                    to={`/media/movie/${movie.id}`}
                    className="btn btn-outline-neon font-weight-bold"
                  >
                    MOVIE PAGE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      pauseOnFocus: true
    };

    return (
      <div className="mb-4">
        <Slider {...settings}>{featuredContent}</Slider>
      </div>
    );
  }
}

FeaturedMovies.propTypes = {
  getFeaturedMovies: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movie: state.movie
});

export default connect(mapStateToProps, { getFeaturedMovies })(FeaturedMovies);
