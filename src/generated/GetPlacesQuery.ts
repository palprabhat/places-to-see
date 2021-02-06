/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BoundInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPlacesQuery
// ====================================================

export interface GetPlacesQuery_places {
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
}

export interface GetPlacesQuery {
  places: GetPlacesQuery_places[] | null;
}

export interface GetPlacesQueryVariables {
  bounds: BoundInput;
}
