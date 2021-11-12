const jwt = require("jsonwebtoken");

const { User } = require("../models");

const validateJWT = async (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({
      msg: "Se requiere token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "El usuario no se encuentra registrado",
      });
    }

    req.userAuth = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Token no válido o expirado",
      statusCode: 401,
    });
  }
};

module.exports = {
  validateJWT,
};
