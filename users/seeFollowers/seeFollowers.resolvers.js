import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { nickname, page }) => {
      // small optimization for checking existingUser
      const existingUser = await client.user.findUnique({
        where: { nickname },
        select: { index: true },
      });
      if (!existingUser) {
        return {
          ok: false,
          error: "계정이 존재하지 않습니다.",
        };
      }
      // offset pagination
      const followers = await client.user
        .findUnique({ where: { nickname } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalFollowers = await client.user.count({
        where: { following: { some: { nickname } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
