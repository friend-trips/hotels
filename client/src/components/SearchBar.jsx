import React, { Component } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  background-color: red;
`;

var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: "K6PZSGD27MzELXz7ZmiN1xpsRVgN4R4H",
  clientSecret: "oW4tFxsTbGApvklU",
});

const roomNumChoices = [1, 2, 3, 4, 5, 6];
const adultNumChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
// nightly price
const ROOM_PRICES = Array.from({ length: 40 }, () =>
  getRandomIntInclusive(44, 135)
);

// calculate the number of nights from checkInDate and checkOutDate (month is 0-indexed)
function calculateNumberOfNights(checkInDate, checkOutDate) {
  checkOutDate = checkOutDate.split("-").map((num) => Number(num));
  checkInDate = checkInDate.split("-").map((num) => Number(num));
  // month is 0-indexed
  checkOutDate[1] -= 1;
  checkInDate[1] -= 1;

  const checkOutNum = new Date(
    checkOutDate[0],
    checkOutDate[1],
    checkOutDate[2]
  );
  const checkInNum = new Date(checkInDate[0], checkInDate[1], checkInDate[2]);
  const difference = checkOutNum.getTime() - checkInNum.getTime();
  return difference / (1000 * 60 * 60 * 24);
}

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
    this.setState({ [stateName]: event.target.value });
  }

  // get only the data we want from the api result
  filterData(arr) {
    const newArr = arr.map((result) => {
      const filteredResult = {};
      // store the hotelId
      filteredResult["hotelId"] = result["hotel"]["hotelId"];
      // store the name
      filteredResult["name"] = result["hotel"]["name"];
      // store the location
      const postalCode = result["hotel"]["address"]["postalCode"]
        ? " " + result["hotel"]["address"]["postalCode"]
        : "";
      const address =
        result["hotel"]["address"]["lines"][0] +
        " " +
        result["hotel"]["address"]["cityName"] +
        " " +
        result["hotel"]["address"]["countryCode"] +
        postalCode;
      filteredResult["address"] = address;
      filteredResult["rating"] = result["hotel"]["rating"];
      // store the hotel amenities
      filteredResult["amenities"] = result["hotel"]["amenities"];
      // store the hotel total cost (roomQuantity * nightly price * number of Nights )
      filteredResult["Price"] = Math.floor(
        Number(
          this.state.roomQuantity *
            ROOM_PRICES[Math.floor(Math.random() * ROOM_PRICES.length)] *
            calculateNumberOfNights(
              this.state.checkInDate,
              this.state.checkOutDate
            )
        )
      );
      return filteredResult;
    });

    console.log("this is the new arr", newArr);
    return newArr;
  }

  handleSubmit(event) {
    event.preventDefault();
    const displaySearchFeed = this.props.displaySearchFeed;
    const filterData = this.filterData;
    const state = this.state;

    // for the demo, we are not sending the roomQuantity or adult fields to the api since most hotels do not have offers during this time.
    // instead, we will calculate the price based on the searchBar inputs and calculate price manually
    amadeus.shopping.hotelOffers
      .get({
        cityCode: state.cityCode,
        checkInDate: state.checkInDate,
        checkOutDate: state.checkOutDate,
        radius: "50",
        includeClosed: "true",
      })
      .then(function (response) {
        console.log(response.data);
        displaySearchFeed(filterData(response.data));
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
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
      </StyledForm>
    );
  }
}
