import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="login bg-navy p-3 border-bottom-neon rounded mt-3 text-white box-shadow">
      <h1 className="text-center font-weight-bold text-neon">Hey there!</h1>
      <p className="text-center">
        Welcome to Reel Natter, be sure to register or log in!
      </p>
      <form-group>
        <Link to="/register" className="btn btn-outline-neon form-control mb-3">
          REGISTER
        </Link>
        <Link to="/login" className="btn btn-outline-neon form-control">
          LOGIN
        </Link>
      </form-group>
    </div>
  );
};
