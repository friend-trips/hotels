import React from "react";
import styled from "styled-components";
// import imgSrc from "./../assets/images/hotel_3.jpeg";
import imgSrc from "../assets/images/hotel_4.jpeg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  width: 100%;
`;

const HotelImageWrapper = styled.div`
  flex: 1;
  width: 25%;
`;
const HotelImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-color: black;
  border-width: 1px;
  border-style: solid;
`;

const CenterSection = styled.div`
  background-color: #ffffff;
  border: 1px solid #fff;
  flex: 2;
  width: 50%;
  display:flex;
  flex-direction: column;
  padding: 2%;
`;
const HotelInfo = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;
const HotelName = styled.h4`
  margin: 0;
  font-weight: 300;
  `;
  const HotelAddress = styled.h5`
  margin: 0;
  font-size: 11px;
  font-weight: 200;
`;
const Amenities = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

`;
const AmenitySectionTitle = styled.p`
  font-size: 12px;
  font-weight: 200;
  padding: 0;
`
const AmenitiesInfo = styled.p`
font-size: 10px;
  font-weight: 200;
  padding:0;
  margin: 0;
`
const Amenity = styled.p`
  font-size: 12px;
  font-weight: 200;
  border: 1px solid black;
  margin: 2px;
  padding: 2px
`
const Rate = styled.div`
  width: 25%;
  border: 1px solid black;
`;

export default function HotelCard({ HotelData }) {
  console.log('HOTEL DATA', HotelData)
  let amenities = (HotelData.amenities) ? HotelData.amenities : [];
  amenities = amenities.map((perk) => {
    return perk.replace('_', ' ').toLowerCase();
  })
  return (
    <Container>
      <HotelImageWrapper>
        <HotelImage src={imgSrc} />
      </HotelImageWrapper>
      <CenterSection>
        <HotelInfo>
          <HotelName>{HotelData.name}</HotelName>
          <HotelAddress>{HotelData.address}</HotelAddress>
        </HotelInfo>
        {(HotelData.amenities) ?
        <>
          <AmenitySectionTitle>Amenities:</AmenitySectionTitle>
          <Amenities>
            {amenities.slice(0,4).map((perk) => {
            return (
              <Amenity>{perk}</Amenity>
            )
          })}</Amenities>
          {amenities.length > 5 ?
              <AmenitiesInfo>
                And {amenities.length - 5} more...
              </AmenitiesInfo> : null}
          </>:
          null
        }
      </CenterSection>
      <Rate>
        {HotelData["rating"]}
      </Rate>
    </Container>
  );
}

// Price: NaN
// address: "2 WHITEHALL COURT LONDON GB SW1A 2EJ"
// amenities: (59) ["AUDIO-VISUAL_EQUIPMENT", "BUSINESS_CENTER", "CONVENTION_CENTRE", "MEETING_ROOMS", "LOUNGE", "RESTAURANT", "DISABLED_FACILITIES", "ACCESSIBLE_BATHS", "WHEELCHAIR_ACCESSIBLE_WASHBASIN", "ACCESSIBLE_BATH_CONTROLS", "WHEELCHAIR_ACCESSIBLE_LIGHT_SWITCH", "WHEELCHAIR_ACCESSIBLE_ELEVATORS", "DISABLED_ACCESSIBLE_TOILETS", "DISABLED_TRAINED_STAFF", "EMERGENCY_PLAN_FOR_DISABLED", "HEARING_INDUCTION_LOOPS", "HANDRAILS_BATHROOM", "VIBRATING_PILLOWS_AVAILABLE", "ADAPT_ROOM_DOORS", "WHEELCHAIR_ACCESSIBLE_ROOM", "WHEELCHAIR_ACCESSIBLE_PUBLIC_AREA", "WIDE_ENTRANCE", "WIDE_CORRIDORS", "WIDE_RESTAURANT_ENTRANCE", "HANDRAILS_BATHROOM", "FIRST_AID_STAF", "INTERIOR_ROOM_ENTRY", "EMERGENCY_LIGHTING", "FIRE_DETECTORS", "EXTINGUISHERS", "FIRE_SAFETY", "RESTRICTED_PUBLIC_ACCESS", "SMOKE_DETECTOR", "VIDEO_SURVEILANCE", "BABY-SITTING", "CAR_RENTAL", "KIDS_WELCOME", "ELEVATOR", "EXCHANGE_FACILITIES", "INTERNET_HOTSPOTS", "FREE_INTERNET", "WIFI", "JACUZZI", "LAUNDRY_SERVICE", "VALET_PARKING", "LOUNGE", "ROOM_SERVICE", "BALLROOM", "AIR_CONDITIONING", "HAIR_DRYER", "MINIBAR", "MOVIE_CHANNELS", "NON_SMOKING_ROOMS", "PC_HOOKUP_IN_ROOM", "TELEVISION", "WI-FI_IN_ROOM", "TELECONFERENCE", "SIGHTSEEING", "FITNESS_CENTER"]
// hotelId: "TILONRHO"
// name: "THE ROYAL HORSEGUARDS"
// rating: "5"
// __proto__: Object
// 2:
// Price: NaN
// address: "THE STRAND LONDON GB WC2N 5HX"
// amenities: (42) ["AUDIO-VISUAL_EQUIPMENT", "BUSINESS_CENTER", "CONVENTION_CENTRE", "MEETING_ROOMS", "RESTAURANT", "DISABLED_FACILITIES", "WHEELCHAIR_ACCESSIBLE_ROOM", "TV_SUBTITLES/CAPTION", "WHEELCHAIR_ACCESSIBLE_PUBLIC_AREA", "FIRST_AID_STAF", "INTERIOR_ROOM_ENTRY", "EMERGENCY_LIGHTING", "FIRE_DETECTORS", "EXTINGUISHERS", "SMOKE_DETECTOR", "SPRINKLERS", "VIDEO_SURVEILANCE", "CAR_RENTAL", "KIDS_WELCOME", "ELEVATOR", "EXCHANGE_FACILITIES", "INTERNET_HOTSPOTS", "FREE_INTERNET", "WIFI", "LAUNDRY_SERVICE", "NO_PORN_FILMS", "LOUNGE", "LOUNGE", "ROOM_SERVICE", "SAFE_DEPOSIT_BOX", "BALLROOM", "AIR_CONDITIONING", "HAIR_DRYER", "MINIBAR", "MOVIE_CHANNELS", "NON_SMOKING_ROOMS", "DIRECT_DIAL_PHONE", "TELEVISION", "WI-FI_IN_ROOM", "TELECONFERENCE", "SIGHTSEEING", "FITNESS_CENTER"]
// hotelId: "TILONCHR"
// name: "AMBA HOTEL CHARING CROSS"
// rating: "5"
// __proto__: Object