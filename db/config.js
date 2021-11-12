const mongoose = require("mongoose");
const { ErrorHandler } = require("../helpers/error");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    console.log("Error en la conexión de la base de datos", error);
  }
};

module.exports = {
  dbConnection,
};
