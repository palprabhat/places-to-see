import { gql } from "@apollo/client";

export const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlaceMutation($input: PlaceInput!) {
    createPlace(input: $input) {
      id
    }
  }
`;
