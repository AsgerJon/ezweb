/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const fs = require('fs');
const path = require('path');

class FileTest {
  /**
   * FileTest is the JavaScript version of the FileTest class.
   * Files are tested for membership in the specified directory.
   *
   * @param {string} testDir - Directory where files are tested.
   * @throws Will throw an error if the directory doesn't exist or is not
   * a directory.
   */
  constructor(testDir) {
    console.log(testDir);
    if (!fs.existsSync(testDir)) {
      throw new Error(`Directory ${testDir} does not exist`);
    }
    const stat = fs.statSync(testDir);
    if (!stat.isDirectory()) {
      throw new Error(`${testDir} is not a directory`);
    }
    this.testDir = testDir;
  }

  /**
   * Tests asynchronously if 'target' is the name of a file in the test
   * directory.
   *
   * @param {string} target - File name to check.
   * @returns {Promise<boolean>} - Resolves to true if the file exists,
   * otherwise false.
   */
  async test(target) {
    try {
      const files = await fs.promises.readdir(this.testDir);
      for (let item of files) {
        const baseName = path.basename(item);
        console.log(baseName);
        console.log(item);
        console.log(item.includes(target));
        if (
          item.includes(target)
        ) {
          return true;
        }
      }
      return false;
    } catch (err) {
      // Return false in case of any issue reading the directory
      return false;
    }
  }
}

module.exports = FileTest;