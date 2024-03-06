import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { nickname }, { loggedInUser }) => {
      const existingUser = await client.user.findUnique({
        where: { nickname },
      });
      if (!existingUser) {
        return {
          ok: false,
          error: "팔로우하려는 계정이 존재하지 않습니다.",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              nickname,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
