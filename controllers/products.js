const { request, response } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
  const products = await Product.find();
  res.json({
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const { uid } = req.body;
  const product = await Product.findOne({ _id: uid });
  res.json({
    product,
  });
};

const createProduct = async (req = request, res = response) => {
  const { name, value, state } = req.body;
  const product = new Product({
    name: name.toUpperCase(),
    value,
    state,
  });
  await product.save();
  res.json({ product });
};

const updateProductById = async (req = request, res = response) => {
  const { uid, name, value, state } = req.body;
  if (!(name || value || state !== undefined)) {
    res.status(200).json({
      statusCode: 200,
      message: "Usuario no modificado",
    });
  }

  const productUpdated = {};
  if (name) productUpdated["name"] = name;
  if (value) productUpdated["value"] = value;
  if (state !== undefined) productUpdated["state"] = state;

  const product = await Product.findByIdAndUpdate(uid, productUpdated, {
    new: true,
  });

  res.json(product);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
};
