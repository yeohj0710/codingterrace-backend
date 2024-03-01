import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      id: String!
      password: String!
      nickname: String!
    ): CreateAccountResult!
  }
`;
