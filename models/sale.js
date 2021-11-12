const { Schema, model } = require("mongoose");

const saleSchema = Schema({
  totalValue: {
    type: String,
    required: [true, "El valor de la venta es obligatorio"],
  },
  totalProducts: {
    type: String,
    required: [true, "El total de productos es obligatorio"],
  },
  products: {
    type: Array,
    required: [true, "La lista de productos es obligatoria"],
  },
  dateSale: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: String,
    default: "IN_PROGRESS",
    emun: ["IN_PROGRESS", "CANCELLED", "DELIVERED"],
  },
  customerIdNumber: {
    type: String,
    required: [true, "El documento de identidad del cliente es obligatorio"],
  },
  customerName: {
    type: String,
    required: [true, "El nombre del cliente es obligatorio"],
  },
  salesManager: {
    type: Schema.Types.String,
    ref: "User",
    required: [true, "El encargado de la venta es obligatorio"],
  },
});

saleSchema.methods.toJSON = function () {
  const { __v, _id, ...sale } = this.toObject();
  sale.uid = _id;
  return sale;
};

module.exports = model("Sale", saleSchema);
