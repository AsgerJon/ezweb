/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

class Lang {
  static Languages = Object.freeze({
    ENGLISH: 'English',
    GERMAN: 'German',
    DANISH: 'Danish'
  });

  /**
   * Get the language code based on the enum key.
   * @param {string} language - The language key.
   * @returns {string} - The language code.
   */
  static getLanguageCode(language) {
    switch (language) {
      case this.Languages.ENGLISH:
        return 'en';
      case this.Languages.GERMAN:
        return 'de';
      case this.Languages.DANISH:
        return 'da';
      default:
        throw new Error('Invalid language');
    }
  }
}


module.exports = Lang;