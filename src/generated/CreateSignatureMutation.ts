/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthenticationError } from "apollo-server-micro";

// ====================================================
// GraphQL mutation operation: CreateSignatureMutation
// ====================================================

export interface CreateSignatureMutation_createImageSignature {
  __typename: "ImageSignature";
  signature: string;
  timestamp: number;
}

export interface CreateSignatureMutation {
  createImageSignature: CreateSignatureMutation_createImageSignature;
}
