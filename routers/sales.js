const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validateInputs, validateJWT, allowTo } = require("../middlewares");
const { existSaleById, isValidSaleState } = require("../helpers/dbValidators");
const {
  getSales,
  createSale,
  updateSaleById,
} = require("../controllers/sales");

router.get("/", [validateJWT, allowTo("ADMIN", "SELLER")], getSales);

router.post(
  "/create",
  [
    validateJWT,
    allowTo("ADMIN", "SELLER"),

    check("products", "El/los producto/s son obligatorio").isArray().notEmpty(),
    check("customerIdNumber", "La identidad del cliente es obligatorio")
      .isString()
      .notEmpty(),
    check("customerName", "El nombre del cliente es obligatorio")
      .isString()
      .notEmpty(),
    check("salesManager", "El encargado de la venta es obligatorio")
      .isEmail()
      .notEmpty(),

    validateInputs,
  ],
  createSale
);

router.put(
  "/",
  [
    validateJWT,
    allowTo("ADMIN", "SELLER"),

    check("uid", "No es un ID de producto válido").isMongoId(),
    check("uid", "El ID del producto es obligatorio").notEmpty(),
    check("uid").custom(existSaleById),

    check("state").isString().custom(isValidSaleState),

    validateInputs,
  ],
  updateSaleById
);

module.exports = router;
