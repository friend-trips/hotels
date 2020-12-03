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

// var Amadeus = require("amadeus");
// var amadeus = new Amadeus({
//   clientId: "K6PZSGD27MzELXz7ZmiN1xpsRVgN4R4H",
//   clientSecret: "oW4tFxsTbGApvklU",
// });

// const roomNumChoices = [1, 2, 3, 4, 5, 6];
// const adultNumChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// // const hotelSearchStr =
// //   "https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=PAR&checkInDate=2021-01-11&checkOutDate=2021-01-19&roomQuantity=2&adults=2&radius=50&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=NONE";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cityCode: "",
//       checkInDate: "",
//       checkOutDate: "",
//       roomQuantity: 0,
//       adults: 0,
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     const stateName = event.target.name;
//     // console.log(stateName);
//     this.setState({ [stateName]: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     amadeus.shopping.hotelOffers
//       .get({
//         cityCode: "PAR",
//         checkInDate: "2021-01-21",
//         checkOutDate: "2021-01-23",
//         radius: "50",
//         includeClosed: "true",
//       })
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (response) {
//         console.log(response);
//         // reject(new Error(errorThrown));
//       });
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           <input
//             name="cityCode"
//             type="text"
//             value={this.state.cityCode}
//             onChange={this.handleChange}
//             placeholder={"Destination"}
//           />
//         </label>
//         <label>
//           <input
//             name="checkInDate"
//             type="text"
//             value={this.state.checkInDate}
//             onChange={this.handleChange}
//             placeholder={"CheckInDate"}
//           />
//         </label>
//         <label>
//           <input
//             name="checkOutDate"
//             type="text"
//             value={this.state.checkOutDate}
//             onChange={this.handleChange}
//             placeholder={"CheckOutDate"}
//           />
//         </label>
//         <label>
//           Rooms
//           <select
//             name="roomQuantity"
//             value={this.state.roomQuantity}
//             onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
//           >
//             <option>All</option>
//             {roomNumChoices.map((quantity) => (
//               <option key={quantity} value={quantity}>
//                 {quantity}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Adults
//           <select
//             name="adults"
//             value={this.state.adults}
//             onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
//           >
//             <option>All</option>
//             {adultNumChoices.map((quantity) => (
//               <option key={quantity} value={quantity}>
//                 {quantity}
//               </option>
//             ))}
//           </select>
//         </label>
//         <input type="submit" value="Search" />
//       </form>
//     );
//   }
// }

// export default App;
