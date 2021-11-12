class ErrorHandler extends Error {
  constructor(statusCode, error) {
    super();
    this.statusCode = statusCode;
    this.error = error;
  }
}

const handleError = (err, res) => {
  const { statusCode, error } = err;
  res.status(statusCode).json({
    statusCode,
    error,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
