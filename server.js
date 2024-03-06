require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import { graphqlUploadExpress } from "graphql-upload";

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
app.use(graphqlUploadExpress());

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

apollo.start().then(() => {
  apollo.applyMiddleware({ app });
});

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server is running on http://localhost:${PORT}${apollo.graphqlPath} ✅`
  );
});
