import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./Suggestions";

class Search extends Component {
  state = {
    query: "",
    results: [],
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
        `https://api.themoviedb.org/3/search/multi?api_key=9de0923a2225f7196ad07f894fe36ab8&query=${
          this.state.query
        }&page=1`
      )
      .then(({ data }) => {
        console.log(data.results);
        this.setState({
          results: data.results
        });
      });
  };

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}

export default Search;
