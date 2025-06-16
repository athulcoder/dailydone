import jwt from "jsonwebtoken";

export function signToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

export function verifyToken(token) {
  const user = jwt.verify(token, process.env.SECRET_KEY);
  return user;
}
