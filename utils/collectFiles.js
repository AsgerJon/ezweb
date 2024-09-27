/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

// FUCK JAVASCRIPT

const fs = require('fs');

const collectFiles = (directoryPath, filterFn) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, {withFileTypes: true}, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const result = {};
      const readPromises = [];

      files.forEach(file => {
        if (file.isFile() && filterFn(file.name)) {
          const fileName = path.parse(file.name).name;
          const filePath = path.join(directoryPath, file.name);
          const readPromise = fs.promises.readFile(filePath, 'utf8')
            .then(content => {
              result[fileName] = content;
            });
          readPromises.push(readPromise);
        }
      });

      Promise.all(readPromises)
        .then(() => resolve(result))
        .catch(reject);
    });
  });
};


module.exports = collectFiles;