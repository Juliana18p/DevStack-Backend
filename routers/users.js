const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validateInputs, validateJWT, allowTo } = require("../middlewares");
const {
  isValidRole,
  existEmail,
  isValidState,
  existUserById,
} = require("../helpers/dbValidators");
const {
  getUsers,
  getUserById,
  updateUserById,
} = require("../controllers/users");

router.get("/", [validateJWT, allowTo("ADMIN")], getUsers);

router.post(
  "/",
  [
    validateJWT,
    allowTo("ADMIN"),
    check("uid", "No es un ID de usuario válido").isMongoId(),
    check("uid", "El ID del usuario es obligatorio").notEmpty(),
    check("uid").custom(existUserById),
    validateInputs,
  ],
  getUserById
);

router.put(
  "/",
  [
    validateJWT,
    allowTo("ADMIN"),

    check("uid", "No es un ID de usuario válido").isMongoId(),
    check("uid", "El ID del usuario es obligatorio").notEmpty(),
    check("uid").custom(existUserById),

    check("role").optional().custom(isValidRole),

    check("state").optional().custom(isValidState),

    validateInputs,
  ],
  updateUserById
);

module.exports = router;
