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


export const updateProduct = async (req: Request, res: Response) => {
    console.log("updateProduct")
    res.status(200).json({ message: "updateProduct" })

}


export const deleteProduct = async (req: Request, res: Response) => {
    console.log("deleteProduct")
    res.status(200).json({ message: "deleteProduct" })

}