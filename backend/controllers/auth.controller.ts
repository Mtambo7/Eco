import { Request, Response } from "express";
export const signup = async (req:Request, res:Response) => {
    console.log("signup")
    res.status(200).json({ message: "Signup" });
}


export const login = async (req:Request, res:Response) => {
    console.log("login")
    res.status(200).json({ message: "login" });
}

export const logout = async (req:Request, res:Response) => {
    console.log("logout")
    res.status(200).json({ message: "logout" });
}