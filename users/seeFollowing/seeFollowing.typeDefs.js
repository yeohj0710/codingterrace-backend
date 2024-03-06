import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(nickname: String!, lastId: Int): SeeFollowingResult!
  }
`;
