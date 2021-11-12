const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { googleSingin, getInfoUser } = require("../controllers/auth");
const { validateInputs, validateJWT } = require("../middlewares");

router.post(
  "/google",
  [check("token", "El token es necesario").notEmpty(), validateInputs],
  googleSingin
);

module.exports = router;
