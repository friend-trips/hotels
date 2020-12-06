import React, { Component } from "react";
import SearchBar from "./SearchBar.jsx";
import HotelPageContent from "./HotelPageContent.jsx";
import styled from "styled-components";
import "./App.css";

//entire screen
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const Content = styled.div`
  border: solid 3px;
  display: flex;
  height: 89%;
  justify-content: space-between;
`;
//^^ height will control size of the bottom section
// form height and content should add up to equal 1--%

const PreSearchResults = styled.div`
  border: solid 1px;
  height: 100%;
  width: 66%;
  float: left;
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
    console.log("state set");
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
