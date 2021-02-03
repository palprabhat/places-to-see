import { AuthenticationError } from "apollo-server-micro";
import { AuthChecker } from "type-graphql";
import { Context } from "./context";

export const authChecker: AuthChecker<Context> = ({ context }) => {
  const { uid } = context;
  if (!uid) {
    throw new AuthenticationError("You must be logged in");
  }
  return !!uid;
};
