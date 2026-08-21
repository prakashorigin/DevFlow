const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err);

  const databaseUnavailable = err.name === "MongooseError" || err.name === "MongoServerSelectionError" || /buffering timed out|database is disconnected/i.test(err.message || "");
  const statusCode = err.statusCode || (databaseUnavailable ? 503 : err.name === "ValidationError" ? 422 : err.name === "CastError" ? 404 : err.code === 11000 ? 409 : 500);

  res.status(statusCode).json({
    success: false,
    message: databaseUnavailable ? "Database is unavailable. Configure a valid MONGODB_URI and start MongoDB, then try again." : err.code === 11000 ? "A record with that value already exists" : err.message || "Internal server error",
  });
};

export default errorHandler;
