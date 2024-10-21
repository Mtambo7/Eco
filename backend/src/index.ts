import express from "express";

import authRoute from "./routes/auth.route";
import productsRoute from "./routes/product.route";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
