/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

// FUCK JAVASCRIPT

const path = require('path');
const kebabToPascal = require('./utils/kebabToPascal')
const express = require('express');
const loadBase = require('./middleware/loadBase');
const loadContent = require('./middleware/loadContent');
const root = require('app-root-path').path;

const views = path.resolve(root, 'views');
const layout = path.resolve(views, 'layout.ejs');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory where the view templates are stored
console.log(views)
app.set('views', views);

app.use(express.static(path.join(__dirname, 'public')));
app.use(loadBase);
app.use(loadContent);


app.get('/', (req, res) => {
  res.redirect('/home');
});


app.get('/:target', (req, res) => {
  target = req.params.target;
  if (!req.content[target.toLowerCase()]) {
    res.redirect('/home')
  } else {
    data = req.baseData;
    data['title'] = kebabToPascal(target);
    data['content'] = req.content[target.toLowerCase()];
    res.render(layout, data);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`[server.js]: Server running at http://localhost:${port}`);
});

