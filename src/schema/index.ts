import { buildSchemaSync } from "type-graphql";
import { authChecker } from "./authChecker";
import { ImageResolver } from "./image";
import { PlaceResolver } from "./place";

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, PlaceResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
