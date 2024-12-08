const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("../configs/db-config");

const app = express();

//ROUTES IMPORT
const categoryRoutes = require("./categories/categories.routes");
const subCategoryRoutes = require("./subcategories/subcategories.routes");
const productRoutes = require("./products/products.routes");
// const driverRoutes = require("./user/driver/driver.routes");
// const otpRoutes = require("./otp/otp.routes");
// const vehicleRoutes = require("./vehicle/vehicle.routes");
// const serviceRoutes = require("./services/services.routes");
// const bannerRoutes = require("./banners/banners.routes");
// const contactRoutes = require("./contact/contact.routes");
// const savedLocationRoutes = require("./saved-locations/saved-locations.routes");
// const walletRoutes = require("./wallet/wallet.routes");
// const paymentRoutes = require("./payments/payments.routes");

// APP SETUP
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v2/category", categoryRoutes);
app.use("/api/v2/subCategory", subCategoryRoutes);
app.use("/api/v2/products", productRoutes);

//Use All routes here
app.get("/api/v2", (req, res) => {
  res.send("Hello This is a store backend");
});

app.use((req, res) => {
  res.status(404).json({
    error: "404 - Not Found",
    message: "The route you are trying to access does not exist.",
  });
});

// Sequelize Connection with DB
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => console.log(`Server running on port ${port}`));
