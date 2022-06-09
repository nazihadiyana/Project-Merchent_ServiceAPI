const express = require("express");
const router = express.Router();
const loginRoute = require("../controllers/login.controller");
const productRoute = require("../controllers/product.controller");
const merchantRoute = require("../controllers/merchant.controller");
const authorize = require("../middlewares/authorize");
const registerRoute = require("../controllers/register.controller");

router.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// register merchant(user)
router.post("/register", registerRoute.registerSchema, registerRoute.register);

// Product
router.post("/product", authorize.isAuthenticate, productRoute.insertProduct);
router.get("/product", authorize.isAuthenticate, productRoute.listProduct);

router.put(
  "/product/:id",
  authorize.isAuthenticate,
  productRoute.updateProduct
);

router.delete(
  "/product/:id",
  authorize.isAuthenticate,
  productRoute.deleteProduct
);

// routes user
router.post("/login", loginRoute.login);

router.post(
  "/merchant",
  authorize.isAuthenticate,
  merchantRoute.insertMerchant
);

router.get("/merchant", authorize.isAuthenticate, merchantRoute.listMerchant);

router.put(
  "/merchant/:id",
  authorize.isAuthenticate,
  merchantRoute.updateMerchant
);
router.delete(
  "/merchant/:id",
  authorize.isAuthenticate,
  merchantRoute.deleteMerchant
);

module.exports = router;
