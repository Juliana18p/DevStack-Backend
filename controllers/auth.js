const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { User } = require("../models");
const generateJWT = require("../helpers/generateJWT");
const { ErrorHandler } = require("../helpers/error");
const { googleVerify } = require("../helpers/googleVerify");

const googleSingin = async (req = request, res = response, next) => {
  const { token } = req.body;
  try {
    const { email } = await googleVerify(token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        email,
      };
      user = new User(data);
      await user.save();
      res.status(201).json({
        message:
          "Usuario creado exitosamente y pendiente de autorización. Contactar con el admistrador.",
        statusCode: 201,
      });
    }

    if (user.state === "PENDING") {
      throw new ErrorHandler(
        401,
        "Usuario pendiente de autorización. Contactar con el admistrador"
      );
    }

    if (user.state === "NO_AUTHORIZED") {
      throw new ErrorHandler(403, "Usuario no autorizado");
    }

    const tokenUser = await generateJWT(user.id);

    res.json({
      message: "El usuario es correcto",
      token: tokenUser,
      userInfo: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  googleSingin,
};
