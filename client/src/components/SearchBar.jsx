import React, { Component } from "react";

var Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: "K6PZSGD27MzELXz7ZmiN1xpsRVgN4R4H",
  clientSecret: "oW4tFxsTbGApvklU",
});

const roomNumChoices = [1, 2, 3, 4, 5, 6];
const adultNumChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// random room prices (by number of rooms)
Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
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

  const checkOutNum = new Date(checkOutDate);
  const checkInNum = new Date(checkInDate);
  const difference = checkOutNum.getTime() - checkInNum.getTime();
  return difference / (1000 * 60 * 60 * 24);
}

// const ROOM_2_PRICES = Array.from({ length: 40 }, () =>
//   getRandomIntInclusive(198, 615)
// );
// const ROOM_3_PRICES = Array.from({ length: 40 }, () =>
//   getRandomIntInclusive(298, 910)
// );
// const ROOM_4_PRICES = Array.from({ length: 40 }, () =>
//   getRandomIntInclusive(493, 1210)
// );
// const ROOM_5_PRICES = Array.from({ length: 40 }, () =>
//   getRandomIntInclusive(641, 1515)
// );
// const ROOM_6_PRICES = Array.from({ length: 40 }, () =>
//   getRandomIntInclusive(641, 1515)
// );
// const ROOM_PRICES = {
//   1: Math.ran,
// };

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
      // store the hotel total cost (roomQuantity * number of Nights * nightly price)
      // "Use Math.random() function to get the random number between(0-1, 1 exclusive).
      // Multiply it by the array length to get the numbers between(0-arrayLength).
      // Use Math.floor() to get the index ranging from(0 to arrayLength-1)."
      filteredResult["Price"] =
        this.state.roomQuantity *
        ROOM_PRICES[Math.floor(Math.random() * ROOM_PRICES.length)] *
        calculateNumberOfNights(
          this.state.checkInDate,
          this.state.checkOutDate
        );
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
