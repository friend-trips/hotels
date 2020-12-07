import React, { Component } from "react";
import SearchBar from "./SearchBar.jsx";
import HotelPageContent from "./HotelPageContent.jsx";
import styled from "styled-components";
import "./App.css";

//entire screen
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };

    this.displaySearchFeed = this.displaySearchFeed.bind(this);
  }

  displaySearchFeed(data) {
    console.log("state set ", data);
    this.setState({
      searchResults: data,
    });
  }

  render() {
    return (
      <Wrapper>
        <SearchBar displaySearchFeed={this.displaySearchFeed} />
        <HotelPageContent searchResults={this.state.searchResults} />
      </Wrapper>
    );
  }
}
