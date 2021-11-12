const { handleError } = require("../helpers/error");

const handleErrorMiddleware = (err, req, res, next) => {
  handleError(err, res);
};

module.exports = {
  handleErrorMiddleware,
};
