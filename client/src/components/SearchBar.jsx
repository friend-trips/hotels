import React, { Component, useState } from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import styled from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  margin-top: 2%;
  margin-bottom: 3%;
  /* border-color: black; */
  /* border-style: solid; */
  /* border-width: 4px; */
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.4%;
`;

const StyledLabelClass = styled.label`
  border-radius: 13px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 13px;
  background-color: #fff9c5;
  color: #c8170a;
  text-align-last: center;
  width: 100px;
  display: inline-block;
  border: 3px solid #fdce54;
  background-color: #ffc8c4;
  border-color: #fc5c65;
  margin-right: 3px;
`;

const StyledRoomSelect = styled.select`
  border-radius: 13px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  background-color: #ffc8c4;
  color: #c8170a;
  text-align-last: center;
  margin-right: 3px;
  border: 0;
`;

const StyledAdultsLabel = styled.label`
  border-radius: 13px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 13px;
  background-color: #fff9c5;
  color: #d6c313;
  text-align-last: center;
  width: 100px;
  display: inline-block;
  border: 3px solid #fdce54;
  margin-right: 3px;
`;

const StyledAdultsSelect = styled.select`
  border-radius: 13px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  background-color: #fff9c5;
  color: #d6c313;
  text-align-last: center;
  margin-right: 3px;
  border: 0;
`;

const BottomRow = styled.div`
  display: flex;
`;

const StyledForm = styled.form``;

const StyledInput = styled.input`
  height: 44px;
  font-family: Montserrat, sans-serif;
  border-radius: 5px;
  font-weight: 500;
  border-color: #bababa;
  border-width: 1px;
  margin-right: 4px;
`;

const StyledSubmit = styled.input`
  border-width: 0px;
  border: none;
  background-color: #f7498e;
  color: #fff;
  height: 44px;
  width: 75px;
  border-radius: 5px;
  font-family: "cerapro-bold", sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  margin-left: 1em;
  margin-top: 0.05em;
`;

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
  }

  handleChange(event) {
    const stateName = event.target.name;
    this.setState({ [stateName]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const state = this.state;
    console.log("handleSubmit: ", state);
    this.props.searchForHotels(state);
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <TopRow>
            <StyledLabelClass>
              Rooms
              <StyledRoomSelect
                name="roomQuantity"
                value={this.state.roomQuantity}
                onChange={(e) =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              >
                <option>All</option>
                {roomNumChoices.map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </StyledRoomSelect>
            </StyledLabelClass>
            <StyledAdultsLabel>
              Adults
              <StyledAdultsSelect
                name="adults"
                value={this.state.adults}
                onChange={(e) =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              >
                <option>All</option>
                {adultNumChoices.map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </StyledAdultsSelect>
            </StyledAdultsLabel>
          </TopRow>
          <BottomRow>
            <StyledForm onSubmit={this.handleSubmit}>
              <label>
                <StyledInput
                  name="cityCode"
                  type="text"
                  value={this.state.cityCode}
                  onChange={this.handleChange}
                  placeholder={"Destination"}
                />
              </label>

              <label>
                <StyledInput
                  name="checkInDate"
                  type="text"
                  value={this.state.checkInDate}
                  onChange={this.handleChange}
                  placeholder={"CheckInDate"}
                />
              </label>
              <label>
                <StyledInput
                  name="checkOutDate"
                  type="text"
                  value={this.state.checkOutDate}
                  onChange={this.handleChange}
                  placeholder={"CheckOutDate"}
                />
              </label>

              <StyledSubmit type="submit" value="Search" />
            </StyledForm>
          </BottomRow>
        </Container>
      </Wrapper>
    );
  }
}
