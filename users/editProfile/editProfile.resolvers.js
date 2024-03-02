import bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.utils";

const resolverFn = async (
  _,
  { id, password: newPassword, nickname, bio, avatar },
  { loggedInUser }
) => {
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      index: loggedInUser.index,
    },
    data: {
      id,
      ...(uglyPassword && { password: uglyPassword }),
      nickname,
      bio,
    },
  });
  if (!updatedUser.index) {
    return {
      ok: false,
      error: "존재하지 않는 계정입니다.",
    };
  }
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};
