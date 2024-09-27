/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

// FUCK JAVASCRIPT

const fs = require('fs');


/**
 * Asynchronously read JSON data from a file and add it to the request object.
 * @param {object} req - The Express request object
 * @param {object} res - The Express response object
 * @param {function} next - The next middleware function
 */
const loadContent = async (req, res, next) => {
  try {
    const data = await fs.promises.readFile('./private/data.json', 'utf8');
    req.baseData = JSON.parse(data);
    next();
  } catch (error) {
    console.error('Error loading JSON data:', error);
    res.status(500).send('Error loading base data');
  }
};

module.exports = loadContent;