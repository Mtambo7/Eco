import { eq } from "drizzle-orm";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../db";
import { usersTable } from "../db/userSchema";


interface DecodedToken extends jwt.JwtPayload {
  userId: number;
}


const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.token || req.headers["Authorization"];
    if (!token) {
      return res

        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }

    const decodedToken = jwt.verify(token, secret) as DecodedToken;

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, decodedToken.userId));

  
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }
    req.user = user;
 
    next();
  } catch (error: any) {
    console.log(`Error in authMiddleware: ${error}`);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
