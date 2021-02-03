/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlaceInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePlaceMutation
// ====================================================

export interface CreatePlaceMutation_createPlace {
  __typename: "Place";
  id: string;
}

export interface CreatePlaceMutation {
  createPlace: CreatePlaceMutation_createPlace | null;
}

export interface CreatePlaceMutationVariables {
  input: PlaceInput;
}
