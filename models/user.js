const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
    default: "SELLER",
    emun: ["ADMIN", "SELLER"],
  },
  state: {
    type: String,
    default: "PENDING",
    emun: ["PENDING", "AUTHORIZED", "NO_AUTHORIZED"],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
