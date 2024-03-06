import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";

const resolverFn = async (
  _,
  { id, password: newPassword, nickname, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar.file;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
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
      ...(avatarUrl && { avatar: avatarUrl }),
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
    editProfile: protectedResolver(resolverFn),
  },
};
