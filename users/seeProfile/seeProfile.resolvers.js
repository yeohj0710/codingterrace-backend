import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { nickname }) =>
      client.user.findUnique({
        where: {
          nickname,
        },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};
