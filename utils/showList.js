/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const showList = (data) => {
  /**
   * Converts a dictionary (object in JavaScript) to an HTML list.
   * @param {Object} data - The key-value pairs to display in the list.
   * @returns {string} - The HTML list as a string.
   */

  let out = [];

  for (let [key, val] of Object.entries(data)) {
    out.push(`<li class="list-group-item">${key}: ${val}</li>`);
  }

  return out.join('\n');
}


module.exports = showList;