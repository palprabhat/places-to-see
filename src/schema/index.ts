import { buildSchemaSync, Query, Resolver } from "type-graphql";
import { authChecker } from "./authChecker";
import { ImageResolver } from "./image";
import { PlaceResolver } from "./place";

@Resolver()
class DummyResolver {
  @Query((_returns) => String)
  hello() {
    return "Hello world";
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver, ImageResolver, PlaceResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
