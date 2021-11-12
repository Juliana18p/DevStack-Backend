const { request, response } = require("express");

const { User } = require("../models");

const getUsers = async (req = request, res = response) => {
  const users = await User.find({});
  res.json({
    users,
  });
};

const getUserById = async (req = request, res = response) => {
  const { uid } = req.body;
  let user = await User.findOne({ _id: uid });
  res.json(user);
};

const updateUserById = async (req = request, res = response) => {
  const { uid, role, state } = req.body;
  if (!(role || state)) {
    res.status(200).json({
      statusCode: 200,
      message: "Usuario no modificado",
    });
  }

  const userUpdated = {};
  if (role) userUpdated["role"] = role;
  if (state) userUpdated["state"] = state;

  const user = await User.findByIdAndUpdate(uid, userUpdated, { new: true });
  res.json(user);
};

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
};
