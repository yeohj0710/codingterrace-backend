import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { id, password, nickname }) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              id,
            },
            {
              nickname,
            },
          ],
        },
      });
      if (existingUser) {
        return {
          ok: false,
          error: "사용 중인 아이디 또는 닉네임입니다.",
        };
      }
      const uglyPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          id,
          nickname,
          password: uglyPassword,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
