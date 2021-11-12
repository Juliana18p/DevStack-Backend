const { User, Product, Sale } = require("../models");

const isValidRole = async (role = "") => {
  if (!(role === "ADMIN" || role === "VENDOR")) {
    throw new Error(`El rol ${role ? role : "VACIO"} no es permitido`);
  }
};

const isValidState = async (state = "") => {
  if (
    !(
      state === "PENDING" ||
      state === "AUTHORIZED" ||
      state === "NO_AUTHORIZED"
    )
  ) {
    throw new Error(`El estado ${state ? state : "VACIO"} no es permitido`);
  }
};

const isValidSaleState = async (state = "") => {
  if (
    !(state === "IN_PROGRESS" || state === "CANCELLED" || state === "DELIVERED")
  ) {
    throw new Error(`El estado ${state ? state : "VACIO"} no es permitido`);
  }
};

const existEmail = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El correo ${email} ya esta registrado`);
  }
};

const existProduct = async (name) => {
  const existProduct = await Product.findOne({ name: name.toUpperCase() });
  if (existProduct) {
    throw new Error(`El producto con nombre ${name.toUpperCase()} ya existe`);
  }
};

const existUserById = async (uid) => {
  const existUser = await User.findById(uid);
  if (!existUser) {
    throw new Error(`El usuario con uid ${uid} no existe`);
  }
};

const existProductById = async (id) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`El producto con id ${id} no existe`);
  }
};

const existSaleById = async (id) => {
  const existProduct = await Sale.findById(id);
  if (!existProduct) {
    throw new Error(`La venta con id ${id} no existe`);
  }
};

module.exports = {
  isValidRole,
  isValidState,
  isValidSaleState,
  existEmail,
  existProduct,
  existUserById,
  existProductById,
  existSaleById,
};
