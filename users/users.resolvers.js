import client from "../client";

export default {
  User: {
    totalFollowing: ({ index }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              index,
            },
          },
        },
      }),
    totalFollowers: ({ index }) =>
      client.user.count({
        where: {
          following: {
            some: {
              index,
            },
          },
        },
      }),
    isMe: ({ index }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return index === loggedInUser.index;
    },
    isFollowing: async ({ index }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const existingUserCount = await client.user.count({
        where: {
          nickname: loggedInUser.nickname,
          following: {
            some: {
              index,
            },
          },
        },
      });
      return Boolean(existingUserCount);
    },
  },
};
