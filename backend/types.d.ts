// types.d.ts
import { Request } from "express";
import { User } from "./db/userSchema"; // Import the User type if defined

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Adjust the type according to your user model
  }
}
