const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create/:id", authUserMiddleware, CartController.createCart);
router.put("/update/:id", authMiddleware, CartController.updateCart);
router.get("/get-all-cart/:id", authUserMiddleware, CartController.getAllCart);
router.delete(
  "/delete-cart-details/:id/:cartId",
  authUserMiddleware,
  CartController.deleteCartDetails
);

router.post(
  "/delete-many-cart/:id",
  authUserMiddleware,
  CartController.deleteManyCart
);

router.post(
  "/delete-update-cart",
  authMiddleware,
  CartController.deleteUpdateCart
);

module.exports = router;
