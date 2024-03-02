import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { index } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { index } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protectResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "로그인이 되지 않았습니다.",
      };
    }
    return ourResolver(root, args, context, info);
  };
}
