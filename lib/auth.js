// lib/token.js
import { SignJWT } from "jose";
import { jwtVerify } from "jose";
export async function signToken(payload) {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // expires in 1 day
    .sign(secret);
}

export async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const { payload } = await jwtVerify(token, secret);

  return payload;
}
