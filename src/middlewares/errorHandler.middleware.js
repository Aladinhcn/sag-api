
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || 'No additional details available.';
  res.status(status).json({ message, details });
};
export default errorHandler;
