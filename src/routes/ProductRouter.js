const express = require("express");
const router = express.Router();
const ProductControllers = require("../controllers/ProductControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, ProductControllers.createProduct);
router.put("/update/:id", authMiddleware, ProductControllers.updateProduct);
router.get("/get-details/:id", ProductControllers.getdetailsProduct);
router.delete("/delete/:id", authMiddleware, ProductControllers.deleteProduct);
router.get("/get-all-search", ProductControllers.getAllProductSearch);
router.get("/get-all-type-product", ProductControllers.getAllProductType);
router.get("/get-all-propose", ProductControllers.getAllProductPropose);
router.get("/get-all", ProductControllers.getAllProduct);
router.post(
  "/delete-many",
  authMiddleware,
  ProductControllers.deleteManyProduct
);
router.get("/get-all-type", ProductControllers.getAllType);
router.get("/get-best-product", ProductControllers.getBestProduct);

module.exports = router;
