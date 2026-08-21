const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || (err.name === "ValidationError" ? 422 : err.code === 11000 ? 409 : 500);

  res.status(statusCode).json({
    success: false,
    message: err.code === 11000 ? "A record with that value already exists" : err.message || "Internal server error",
  });
};

export default errorHandler;
