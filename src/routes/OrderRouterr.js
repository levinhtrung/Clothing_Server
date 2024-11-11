const express = require("express");
const router = express.Router();
const OrderControllers = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create/:id", authUserMiddleware, OrderControllers.createOrder);
router.get(
  "/get-all-order-details/:id",
  authUserMiddleware,
  OrderControllers.getAllOrderDetails
);
router.get(
  "/get-details-order/:id/:orderId",
  authUserMiddleware,
  OrderControllers.getDetailsOrder
);
router.delete(
  "/cancel-order/:id",
  authUserMiddleware,
  OrderControllers.cancelOrderDetails
);

router.get("/get-all-order", authMiddleware, OrderControllers.getAllOrder);

module.exports = router;
