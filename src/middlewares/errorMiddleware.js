const errorMiddleware = (err, req, res, _next) => {
  res.status(err.status || err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

export default errorMiddleware;
