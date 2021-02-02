import { buildSchemaSync, Resolver, Query } from "type-graphql";
import { authChecker } from "./authChecker";

@Resolver()
class DummyResolver {
  @Query((_returns) => String)
  hello() {
    return "Hello world";
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
