import jwt from "jsonwebtoken";
import { Response } from "express";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}
export const generateTokenAndCookie = (userId: number, res: Response) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
