import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../common/placeholder.jpg";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

const Suggestions = props => {
  const optionsUsers = props.users.slice(0, 3).map(user => (
    <div key={user._id}>
      <Link style={{ textDecoration: "none" }} to={`/profile/${user.username}`}>
        <div className="post my-3 p-3 rounded box-shadow bg-navy text-white border-bottom-orange">
          <div className="media">
            <img
              src={user.avatar}
              alt=""
              className="avatar mr-3 rounded border-orange"
            />

            <div className="media-body align-self-center text-white">
              <h2 className="mb-0">
                <strong>{user.username}</strong>
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));

  const optionsMedia = props.results.slice(0, 5).map(r => (
    <div key={r.id}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/media/${r.media_type}/${r.id}`}
      >
        <div className="post my-3 p-3 rounded box-shadow bg-navy text-white border-bottom-neon">
          <div className="media">
            {r.poster_path ? (
              <img
                style={{ width: "60px" }}
                src={`https://image.tmdb.org/t/p/w92/${r.poster_path}`}
                alt=""
                className="mr-3 rounded border-orange"
              />
            ) : (
              <img
                style={{ width: "60px" }}
                src={placeholder}
                alt=""
                className="mr-3 rounded border-orange"
              />
            )}

            <div className="media-body align-self-center text-white">
              <h2 className="mb-0">
                <strong>{r.title ? r.title : r.name}</strong>
              </h2>

              <h5 className="text-orange mb-0">
                {/* Release Date */}
                {r.release_date ? (
                  <Moment format="YYYY">{r.release_date}</Moment>
                ) : null}
                {r.first_air_date ? (
                  <Moment format="YYYY">{r.first_air_date}</Moment>
                ) : null}
              </h5>

              <h5 className="text-white mb-0">
                {r.media_type === "movie" ? "Movie" : "TV"}
              </h5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));

  return (
    <div>
      {!isEmpty(props.users) ? (
        <h1 className="mt-3 text-orange">
          <strong>Users</strong>
        </h1>
      ) : null}
      {optionsUsers}

      {!isEmpty(props.results) ? (
        <h1 className="mt-3 text-orange">
          <strong>TV and Movies</strong>
        </h1>
      ) : null}
      {optionsMedia}
    </div>
  );
};

export default Suggestions;
