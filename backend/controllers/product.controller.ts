import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
    console.log("getProducts")
    res.status(200).json({ message: "getProducts" })

}


export const getProductById = async (req: Request, res: Response) => {
    console.log("getProductById")
    res.status(200).json({ message: "getProductById" })

}


export const createProduct = async (req: Request, res: Response) => {
    console.log("createProduct")
    res.status(200).json({ message: "createProduct" })

}