import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { id, password }) => {
      const user = await client.user.findFirst({ where: { id } });
      if (!user) {
        return {
          ok: false,
          error: "존재하지 않는 아이디입니다.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 올바르지 않습니다.",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
