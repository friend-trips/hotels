import React, { Component } from "react";
import SearchBar from "./SearchBar.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
    this.displaySearchFeed = this.displaySearchFeed.bind(this);
  }
  displaySearchFeed(data) {
    this.setState({ searchResults: data });
  }

  render() {
    return <SearchBar displaySearchFeed={this.displaySearchFeed} />;
  }
}
