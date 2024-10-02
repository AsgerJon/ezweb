/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const path = require('path');

const _dict = {
  'about': 'Om Os',
  'contact': 'Kontakt',
  'home': 'Hjem',
  'services': 'Ydelser og Tjenester'
}

class View {
  /**
   * @param {string} viewPath - The full path to the view file
   */
  constructor(viewPath) {
    this.fid = viewPath;  // Full path to the .ejs file
    this.name = this.toSnakeCase(
      path.basename(viewPath, path.extname(viewPath)));  // snake_case name
    this.title = _dict[this.name]
  }

  /**
   * Convert a string to snake_case
   * @param {string} str - The string to convert
   * @returns {string} - The snake_case version
   */
  toSnakeCase(str) {
    return str.replace(/\s+/g, '_').toLowerCase();  // Convert spaces to
                                                    // underscores and
                                                    // lowercase
  }

  /**
   * Capitalize the first letter of each word
   * @param {string} str - The string to capitalize
   * @returns {string} - The capitalized string
   */
  capitalizeTitle(str) {
    return str.split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  test(target) {
    return this.name.includes(target);
  }
}


module.exports = View;