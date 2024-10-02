/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

/**
 * Renders a navigation item
 * @param {string} name - The name of the navigation item
 * @param {string} target - The target URL for the navigation item
 * @returns {string} - The rendered HTML string for the navigation item
 */
function _item(name, target) {
  const li0 = '<li class="nav-item">';
  const a0 = `<a class="nav-link" href="${target}" target="_blank">`;
  return `${li0}${a0}${name}</a></li>`;
}

/**
 * Renders a navigation list menu to external sites
 * @param {Object} data - A name-to-external-url mapping
 * @returns {string} - The rendered HTML string for the navigation list
 */
function navList(data) {
  const items = Object.entries(data).map(([key, val]) => _item(key, val));
  return items.join('\n');
}

module.exports = navList;