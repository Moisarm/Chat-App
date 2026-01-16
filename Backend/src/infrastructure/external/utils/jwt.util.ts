import jwt from "jsonwebtoken";
import { SECRET } from "../../config/server/env";

interface payload {
  user_id: string;
  username: string;
  email: string;
}

export const Token = (payload: payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verify_token = (token: string) => {
  return jwt.verify(token, SECRET);
};
