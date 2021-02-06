/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface BoundInput {
  ne: Coordinates;
  sw: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PlaceInput {
  address: string;
  coordinates: Coordinates;
  description: string;
  image: string;
  placeName: string;
  placeType: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
