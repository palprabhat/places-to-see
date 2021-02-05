/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaceByIdQuery
// ====================================================

export interface GetPlaceByIdQuery_place_nearby {
  __typename: "Place";
  id: string;
  latitude: number;
  longitude: number;
}

export interface GetPlaceByIdQuery_place {
  __typename: "Place";
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  image: string;
  publicId: string;
  placeName: string;
  placeType: string;
  description: string;
  nearby: GetPlaceByIdQuery_place_nearby[];
}

export interface GetPlaceByIdQuery {
  place: GetPlaceByIdQuery_place | null;
}

export interface GetPlaceByIdQueryVariables {
  id: string;
}
