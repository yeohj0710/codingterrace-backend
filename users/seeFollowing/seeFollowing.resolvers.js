import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { nickname, lastId }) => {
      const existingUser = await client.user.findUnique({
        where: { nickname },
        select: { id: true },
      });
      if (!existingUser) {
        return {
          ok: error,
          error: "존재하지 않는 계정입니다.",
        };
      }
      const following = await client.user
        .findUnique({ where: { nickname } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
