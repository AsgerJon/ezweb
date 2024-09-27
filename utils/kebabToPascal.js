/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

// FUCK JAVASCRIPT


const kebabToPascal = (word) => {
  return word
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

module.exports = kebabToPascal;