const validateInputs = require("./validate-inputs");
const validateJWT = require("./validateJWT");
const validateRoles = require("./validateRoles");
const handleErrorMiddleware = require("./errorsHandler");

module.exports = {
  ...validateInputs,
  ...validateJWT,
  ...validateRoles,
  ...handleErrorMiddleware,
};
