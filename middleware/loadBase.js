/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const fs = require('fs');
const path = require('path');


const loadBase = async (req, res, next) => {
  const directoryPath = './private/pages';
  const filterFn = fileName => fileName.endsWith('.html');

  try {
    const files = await fs.promises.readdir(directoryPath, {withFileTypes: true});
    const result = {};

    for (const file of files) {
      if (file.isFile() && filterFn(file.name)) {
        const fileName = path.parse(file.name).name;
        const filePath = path.join(directoryPath, file.name);
        result[fileName] = await fs.promises.readFile(filePath, 'utf8');
      }
    }

    req.content = result;
    next();
  } catch (error) {
    console.error('Error loading HTML files:', error);
    res.status(500).send('Error loading content');
  }
};

module.exports = loadBase;