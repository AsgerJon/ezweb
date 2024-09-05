/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
}

module.exports = errorHandler;
