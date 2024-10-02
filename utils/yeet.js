/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const yeet = (...args) => {
  throw new Error((args || ['LOL STAHP!'])[0]);
}


module.exports = yeet;