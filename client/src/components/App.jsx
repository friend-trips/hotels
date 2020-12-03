import React, { Component } from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={"Destination"}
          />
        </label>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={"CheckInDate"}
          />
        </label>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={"CheckOutDate"}
          />
        </label>
        <label>
          Rooms
          <select value={2}>
            <option>All</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </label>
        <label>
          Adults
          <select value={2}>
            <option>All</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </label>
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default App;
