import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { Context } from "src/schema/context";
import { NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import { prisma } from "src/prisma";
import { schema } from "src/schema";

const server = new ApolloServer({
  schema,
  context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {
    const uid = await loadIdToken(req);

    return {
      uid,
      prisma,
    };
  },
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
