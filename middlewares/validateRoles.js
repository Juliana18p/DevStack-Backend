const { ErrorHandler } = require("../helpers/error");

const allowTo =
  (...roles) =>
  (req, res, next) => {
    try {
      if (!req.userAuth) {
        throw new ErrorHandler(
          500,
          "Se quiere verificar el rol, sin válidar el token primero"
        );
      }

      const { role, email } = req.userAuth;
      if (!roles.includes(role)) {
        throw new ErrorHandler(
          401,
          `${email} no tiene permisos para modificar este recurso. Debe ser ${roles} para acceder.`
        );
      }

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

module.exports = {
  allowTo,
};
