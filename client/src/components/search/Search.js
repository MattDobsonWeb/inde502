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

  getInfo = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=9de0923a2225f7196ad07f894fe36ab8&language=en-US&query=${
          this.state.query
        }&page=1
          }`
      )
      .then(data => {
        this.setState({
          results: data.data.results
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
          <form>
            <div className="form-group mt-3">
              <input
                placeholder="Search for..."
                className="form-control search-form"
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
              <Suggestions
                results={this.state.results}
                users={this.state.userResults}
              />
            </div>
          </form>

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
