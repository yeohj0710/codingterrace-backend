import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      id: String
      password: String
      nickname: String
      bio: String
      avatar: String
    ): EditProfileResult!
  }
`;
