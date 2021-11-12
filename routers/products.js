const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validateInputs, validateJWT, allowTo } = require("../middlewares");
const { existProduct, existProductById } = require("../helpers/dbValidators");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
} = require("../controllers/products");

router.get("/", [validateJWT, allowTo("ADMIN", "SELLER")], getProducts);

router.post(
  "/create",
  [
    validateJWT,
    allowTo("ADMIN"),

    check("name", "El nombre del producto es obligatorio")
      .isString()
      .notEmpty(),
    check("name").custom(existProduct),

    check("value", "El valor del producto es obligatorio")
      .isNumeric()
      .notEmpty(),

    check("state", "El estado del producto es obligatorio")
      .isBoolean()
      .notEmpty(),

    validateInputs,
  ],
  createProduct
);

router.post(
  "/",
  [
    validateJWT,
    allowTo("ADMIN"),

    check("uid", "No es un ID de usuario válido").isMongoId(),
    check("uid", "El ID del usuario es obligatorio").notEmpty(),
    check("uid").custom(existProductById),

    validateInputs,
  ],
  getProductById
);

router.put(
  "/",
  [
    validateJWT,
    allowTo("ADMIN"),

    check("uid", "No es un ID de producto válido").isMongoId(),
    check("uid", "El ID del producto es obligatorio").notEmpty(),
    check("uid").custom(existProductById),

    check("name").optional().isString(),

    check("value").optional().isNumeric(),

    check("state").optional().isBoolean(),

    validateInputs,
  ],
  updateProductById
);

module.exports = router;
