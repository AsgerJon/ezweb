/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */


// FUCK JAVASCRIPT

const handleError = (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('File not found:', fid);
      // Handle file not found, e.g., by using fallback data
      return 1;
    } else if (err.code === 'EACCES') {
      console.error('Permission denied for reading file:', fid);
      // Handle permissions error
      return 2;
    } else {
      console.error('Unknown error occurred:', err);
      // Handle other types of errors
      return 3;
    }
  } else {
    return 0;
  }
};


module.exports = handleError;