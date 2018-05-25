import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./Suggestions";

class Search extends Component {
  state = {
    query: "",
    results: [],
    userResults: [],
    id: ""
  };

  // Query on input change
  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        }
      }
    );
  };

  // Get Info
  getInfo = () => {
    axios.get(`/api/search/media/${this.state.query}`).then(data => {
      this.setState({
        results: data.data
      });
    });

    axios.get(`/api/search/user/${this.state.query}`).then(users => {
      this.setState({
        userResults: users.data
      });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="col-md-8 m-auto">
          <div className="form-group mt-3">
            <input
              placeholder="Search for..."
              className="form-control navy-form"
              ref={input => (this.search = input)}
              onChange={this.handleInputChange}
            />
            <Suggestions
              results={this.state.results}
              users={this.state.userResults}
            />
          </div>

          {this.state.query.length < 2 ? (
            <h1 className="text-orange font-weight-bold text-center">
              Search for users or movies and TV shows...
            </h1>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Search;
