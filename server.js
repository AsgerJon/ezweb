/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory where the view templates are stored
app.set('views', __dirname + '/views');

// Serve static files (CSS, JavaScript, images) from the 'public' directory
app.use(express.static('public'));

app.use((req, res, next) => {
  fs.readFile('./data/about-us.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.locals.aboutUs = "Error loading About Us content.";
      return next();
    }
    res.locals.aboutUs = data;
    next();
  });
});

app.get('/', (req, res) => {
  res.render('layout', {
    title: 'Home Page',
    companyName: "Example Co.",
    companyLogo: "/images/logo.png",
    companyAddress: "123 Example Street, City, Country",
    content: 'index-content'
  });
});


app.get('/about', (req, res) => {
  res.render('layout', {
    title: 'About Us',
    companyName: "Example Co.",
    companyLogo: "/images/logo.png",
    companyAddress: "123 Example Street, City, Country",
    content: 'about-content'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`[server.js]: Server running at http://localhost:${port}`);
});

