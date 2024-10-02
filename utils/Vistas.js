/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */
const View = require('./View');
const fs = require('fs');
const path = require('path');

class Vistas {
  constructor(viewDir) {
    if (!fs.existsSync(viewDir)) {
      throw new Error(`Unable to find view directory at: '${viewDir}'!`);
    }
    if (!fs.lstatSync(viewDir).isDirectory()) {
      throw new Error(`'${viewDir}' is not a directory!`);
    }

    this.viewDir = viewDir;
    this.views = this.loadViews();
  }

  /**
   * Load views from the directory
   */
  loadViews() {
    const files = fs.readdirSync(this.viewDir).filter(file => {
      const filePath = path.join(this.viewDir, file);
      return fs.lstatSync(filePath).isFile() && file !== 'layout.ejs';
    });

    return files.map(file => new View(path.join(this.viewDir, file)));  // Return
                                                                        // instances
                                                                        // of
                                                                        // View
  }

  test(target) {
    for (let view of this.views) {
      if (view.test(target)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Generates HTML for the header navigation
   * @param {string} activePage - The active view name
   * @returns {string} - HTML string for the header navbar
   */
  header(activePage) {
    return this.render(activePage);
  }

  footer(activePage) {
    return this.render(activePage);
  }

  /**
   * Generates HTML for navigation
   * @param {string} activePage - The active view name
   * @returns {string} - HTML string for the footer navbar
   */
  render(activePage) {
    let html = '';
    this.views.forEach(view => {
      const isActive = view.name === activePage ? 'active' : '';
      html += `
        <li class="nav-item">
          <a class="nav-link ${isActive}" href="/${view.name === 'home' ? '' : view.name}">
            ${view.title}
          </a>
        </li>`;
    });
    return html;
  }
}

// View Class that processes each view file

module.exports = Vistas;