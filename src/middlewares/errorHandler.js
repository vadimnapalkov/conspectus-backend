export default function errorHandler(err, req, res, next) {
  console.error(err);
  if (!err) return next();
  if (req.is('application/json')) {
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }

  return res.status(500).send('Something went wrong. Please try again later.');
}
