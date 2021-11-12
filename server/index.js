const express = require("express");
const cors = require("cors");

const {
  authRoute,
  productsRoute,
  userRoute,
  salesRoute,
} = require("../routers");
const { handleErrorMiddleware } = require("../middlewares");
const { ErrorHandler } = require("../helpers/error");
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.paths = {
      authPath: "/api/auth",
      usersPath: "/api/users",
      productsPath: "/api/products",
      salesPath: "/api/sales",
    };

    // Config Database
    this.connectDB();

    // Config Middlewares
    this.middlewares();

    // Config Routes
    this.routes();

    // Config Middleware handleError
    this.app.use(handleErrorMiddleware);
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Read and parse to body
    this.app.use(express.json());

    // Public directory
    // this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.authPath, authRoute);
    this.app.use(this.paths.usersPath, userRoute);
    this.app.use(this.paths.productsPath, productsRoute);
    this.app.use(this.paths.salesPath, salesRoute);

    this.app.use(() => {
      throw new ErrorHandler(404, "La ruta no existe");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
