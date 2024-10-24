import express from "express";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import productsRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.router.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", orderRoute);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
