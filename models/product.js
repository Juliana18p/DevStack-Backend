const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  value: {
    type: Number,
    required: [true, "El valor es obligatorio"],
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, "El estado es obligatorio"],
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

module.exports = model("Product", ProductSchema);
