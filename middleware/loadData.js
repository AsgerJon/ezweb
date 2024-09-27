/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

// FUCK JAVASCRIPT


const path = require("path");
const fs = require("fs");
const root = require('app-root-path').path;
const utilsDir = path.resolve(root, 'utils');
const handleError = require(path.resolve(utilsDir, 'handleError'));
const collectFiles = require(path.resolve(utilsDir, 'collectFiles'));

const dataFid = path.resolve(root, 'private', 'data.json');
const pagesDir = path.resolve(root, 'private', 'pages');


const _loadBaseData = (req) => {
  req.baseData = {};
  fs.readFile(dataFid, 'utf8', (err, rawData) => {
    const res = handleError(err);
    if (!res) {
      return res
    }
    data = JSON.parse(rawData);
    Object.entries(data).forEach(([key, value]) => {
      req.baseData[key] = value;
    });
  });
  return req
}

const _htmlFilter = (fid) => {
  console.log("_htmlFilter", fid)
  return path.parse(fid).ext === 'html';

}

const _loadContent = async (req) => {
  req.content = await collectFiles(pagesDir, _htmlFilter);
  return req
}


const loadData = async (req, res, next) => {
  req = await _loadBaseData(req);
  req = await _loadContent(req);
  next();
};

module.exports = loadData;