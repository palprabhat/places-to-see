/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlaceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePlaceMutation
// ====================================================

export interface UpdatePlaceMutation_updatePlace {
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

export interface UpdatePlaceMutation {
  updatePlace: UpdatePlaceMutation_updatePlace | null;
}

export interface UpdatePlaceMutationVariables {
  id: string;
  input: PlaceInput;
}
