import { gql } from "@apollo/client";

export const GET_PLACE_BY_ID_QUERY = gql`
  query GetPlaceByIdQuery($id: String!) {
    place(id: $id) {
      id
      latitude
      longitude
      address
      image
      publicId
      placeName
      placeType
      description
      nearby {
        id
        latitude
        longitude
      }
    }
  }
`;

export const GET_PLACES_QUERY = gql`
  query GetPlacesQuery($bounds: BoundInput!) {
    places(bounds: $bounds) {
      id
      latitude
      longitude
      address
      image
      publicId
      placeName
      placeType
      description
    }
  }
`;

export const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlaceMutation($input: PlaceInput!) {
    createPlace(input: $input) {
      id
    }
  }
`;

export const UPDATE_PLACE_QUERY = gql`
  mutation UpdatePlaceMutation($id: String!, $input: PlaceInput!) {
    updatePlace(id: $id, input: $input) {
      id
      latitude
      longitude
      address
      image
      publicId
      placeName
      placeType
      description
    }
  }
`;

export const DELETE_PLACE_QUERY = gql`
  mutation DeletePlaceMutation($id: String!) {
    deletePlace(id: $id)
  }
`;
