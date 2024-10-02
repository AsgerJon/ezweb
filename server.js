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
  res.locals.themeUrl = process.env.THEME_CERULEAN;
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


app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Om Os',
    page: 'about',
  });
});


app.get('/home', (req, res) => {
  res.render('home', {
    title: 'Hjem',
    page: 'home',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Kontakt',
    page: 'contact',
  });
});

app.get('/services', (req, res) => {
  res.render('services', {
    title: 'Ydelser og Tjenester',
    page: 'services',
  });
});
const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const service = process.env.GAE_SERVICE || 'default';
const version = process.env.GAE_VERSION;

// If the environment variables are set, assume production on GCP
app.listen(port, () => {
  console.log('______________________');
  console.log(new Date().toString());
  if (projectId && service && version) {
    const url = `https://${service}-dot-${projectId}.appspot.com`;
    console.log(`[server.js]: Server running at ${url}`);
  } else {
    console.log(`[server.js]: Server running at http://localhost:${port}`);
  }
  console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨');
});

