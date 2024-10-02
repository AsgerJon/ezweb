/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

require('dotenv').config();

const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const root = require('app-root-path').path;
const expressLayouts = require('express-ejs-layouts');
const loadEnv = require('./utils/loadEnv');
const Vistas = require('./utils/Vistas');
const yeet = require("./utils/yeet");

const port = process.env.PORT;
const theme_vapor = process.env.THEME_VAPOR;
const theme_solar = process.env.THEME_SOLAR;

const bootstrap_js_url = process.env.BOOTSTRAP_JS_URL;
const bootstrap_css_url = process.env.BOOTSTRAP_CSS_URL;
const popper_js_url = process.env.POPPER_JS_URL;


const views = path.resolve(root, 'views');
const viewPath = path.resolve(views, 'about.ejs');
const layout = path.resolve(views, 'layout.ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(loadEnv);
const vistas = new Vistas(views);

app.use((req, res, next) => {
  res.locals.themeUrl = theme_vapor;
  next();
});

app.use((req, res, next) => {
  let target = req.params.target;
  res.locals.headerItems = vistas.header(target);
  res.locals.footerItems = vistas.footer(target);
  next();
});

app.get('/', (req, res) => {
  res.redirect('/home');
});


app.get('/:target', async (req, res, next) => {
  let target = req.params.target;
  try {
    if (vistas.test(target)) {
      res.render(target, {
        title: target,
        page: target,
      });
    } else {
      res.status(404).send(`Page: ${target} not found!`);
    }
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`[server.js]: Server running at http://localhost:${port}`);
});

