import { gql } from "apollo-server";

export default gql`
  type User {
    index: Int!
    id: String!
    nickname: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    createdAt: String!
    updatedAt: String!
  }
`;
