import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { nickname }, { loggedInUser }) => {
        const existingUser = await client.user.findUnique({
          where: { nickname },
        });
        if (!existingUser) {
          return {
            ok: false,
            error: "계정이 존재하지 않습니다.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                nickname,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
