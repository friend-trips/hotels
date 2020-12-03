import React, { Component } from "react";

var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: "K6PZSGD27MzELXz7ZmiN1xpsRVgN4R4H",
  clientSecret: "oW4tFxsTbGApvklU",
});

const roomNumChoices = [1, 2, 3, 4, 5, 6];
const adultNumChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityCode: "",
      checkInDate: "",
      checkOutDate: "",
      roomQuantity: 0,
      adults: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  handleChange(event) {
    const stateName = event.target.name;
    // console.log(stateName);
    this.setState({ [stateName]: event.target.value });
  }

  // get only the data we want from the api result
  filterData(arr) {
    const newArr = arr.map((result) => {
      const filteredResult = {};
      // console.log(result["hotel"]);
      const address = result["hotel"]["address"]["lines"][0];
      // const address = result["hotel"["address"["lines"[0]]]];

      //   result[hotel[address[lines[0]]]] +
      //   result[postalCode] +
      //   result[cityName] +
      //   result[countryCode];
      filteredResult[address] = address;
      return filteredResult;
    });
    console.log("this is the new arr", newArr);
    return newArr;
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.props.displaySearchFeed(["a", "b"]));
    const displaySearchFeed = this.props.displaySearchFeed;
    const filterData = this.filterData;

    amadeus.shopping.hotelOffers
      .get({
        cityCode: "PAR",
        checkInDate: "2021-01-21",
        checkOutDate: "2021-01-23",
        radius: "50",
        includeClosed: "true",
      })
      .then(function (response) {
        console.log(response.data);
        displaySearchFeed(filterData(response.data));
      })
      .catch(function (response) {
        console.log(response);
        // reject(new Error(errorThrown));
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="cityCode"
            type="text"
            value={this.state.cityCode}
            onChange={this.handleChange}
            placeholder={"Destination"}
          />
        </label>
        <label>
          <input
            name="checkInDate"
            type="text"
            value={this.state.checkInDate}
            onChange={this.handleChange}
            placeholder={"CheckInDate"}
          />
        </label>
        <label>
          <input
            name="checkOutDate"
            type="text"
            value={this.state.checkOutDate}
            onChange={this.handleChange}
            placeholder={"CheckOutDate"}
          />
        </label>
        <label>
          Rooms
          <select
            name="roomQuantity"
            value={this.state.roomQuantity}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          >
            <option>All</option>
            {roomNumChoices.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </label>
        <label>
          Adults
          <select
            name="adults"
            value={this.state.adults}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          >
            <option>All</option>
            {adultNumChoices.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Search" />
      </form>
    );
  }
}
