import express from "express";

import authRoute from "../routes/auth.route";
import productRoute from "../routes/product.route";

const PORT= process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);


app.get("/", (req, res) => {
    res.send("Hello World!");
    
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});