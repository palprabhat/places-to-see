import { gql } from "@apollo/client";

export const CREATE_IMAGE_SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;
