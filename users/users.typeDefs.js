import { gql } from "apollo-server";

export default gql`
  type User {
    index: Int!
    id: String!
    nickname: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
`;
