const { request, response } = require("express");
const { Sale } = require("../models");

const getSales = async (req = request, res = response) => {
  const sales = await Sale.find();
  res.json({
    sales,
  });
};

const createSale = async (req = request, res = response) => {
  const { products, customerIdNumber, customerName, salesManager } = req.body;

  // Total value
  const totalValue = String(
    products.reduce((acc, product) => {
      return acc + product.value * product.amount;
    }, 0)
  );

  // Total products
  const totalProducts = String(
    products.reduce((acc, product) => {
      return acc + Number(product.amount);
    }, 0)
  );

  const sale = new Sale({
    totalValue,
    totalProducts,
    products,
    customerIdNumber,
    customerName,
    salesManager,
  });
  await sale.save();
  res.json({ sale });
};

const updateSaleById = async (req = request, res = response) => {
  const { uid, state } = req.body;

  const product = await Sale.findByIdAndUpdate(
    uid,
    { state },
    {
      new: true,
    }
  );

  res.status(204).json();
};

module.exports = {
  getSales,
  createSale,
  updateSaleById,
};
