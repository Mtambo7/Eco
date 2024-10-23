import { Request, Response } from "express";
import { createUserSchema, loginSchema } from "../validation/user.validation";
import bcrypt from "bcryptjs";
import { usersTable } from "../db/userSchema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { generateTokenAndCookie } from "../utils/generateTokenAndCookie";
export const signup = async (req: Request, res: Response): Promise<any> => {
  const { body } = req;
  try {
    const { value, error } = createUserSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, value.email));
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const [createdUser] = await db
      .insert(usersTable)
      .values({ ...value, password: hashedPassword })
      .returning();

    const { password, ...userWithoutPassword } = createdUser;

    res.status(201).json({
      user: userWithoutPassword,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(`Error in signup controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { body } = req;
  try {
    const { value, error } = loginSchema.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, value.email));
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(value.password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenAndCookie(user.id, res);

    const { password, ...userWithoutPassword } = user;

    res
      .status(200)
      .json({ user: userWithoutPassword, message: "login successully" });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
      res.clearCookie("token").status(200).json({ message: "Logout successfully" });      
  } catch (error) {
    console.log(`Error in logout controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req: Request, res: Response):Promise<any> => {
  
  try {
    const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.user.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    

    const { password, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.log(`Error in getMe controller: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
