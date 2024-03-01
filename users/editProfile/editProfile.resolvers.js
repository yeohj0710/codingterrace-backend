import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (_, { id, password: newPassword, nickname }) => {
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id,
        },
        data: {
          id,
          ...(uglyPassword && { password: uglyPassword }),
          nickname,
        },
      });
      if (!updatedUser.id) {
        return {
          ok: false,
          error: "존재하지 않는 아이디입니다.",
        };
      }
      return {
        ok: true,
      };
    },
  },
};
