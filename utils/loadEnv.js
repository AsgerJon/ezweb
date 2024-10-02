/*
 * AGPL-3.0 license
 * Copyright (c) 2024 Asger Jon Vistisen
 */

const navList = require('./navList');
const showList = require('./showList');


const loadEnv = (req, res, next) => {
  //  Application name and logo
  res.locals.appName = process.env.APP_NAME;
  res.locals.appLogo = process.env.LOGO;
  //  Remote scripts
  res.locals.bootstrapCssUrl = process.env.BOOTSTRAP_CSS_URL;
  res.locals.bootstrapJsUrl = process.env.BOOTSTRAP_JS_URL;
  res.locals.popperJsUrl = process.env.POPPER_JS_URL;
  res.locals.jquery_js_url = process.env.JQUERY_JS_URL;
  //  License/copyright
  let YEAR = new Date().getFullYear();
  let LIC = process.env.LICENSE;
  let AUTHOR = process.env.AUTHOR;
  res.locals.copyrightNotice = `${LIC} <br>Copyright (c) ${YEAR} ${AUTHOR}`;
  //  Social media
  let facebook = process.env.FACEBOOK;
  let twitter = process.env.TWITTER;
  let instagram = process.env.INSTAGRAM;
  let linkedin = process.env.LINKEDIN;
  let socialMedia = {
    facebook: facebook,
    twitter: twitter,
    instagram: instagram,
    linkedin: linkedin
  };
  res.locals.socialMedia = navList(socialMedia);
  //  Contact information
  let email = process.env.EMAIL;
  let phone = process.env.PHONE;
  let address = process.env.ADDRESS;
  let contactInfo = {
    Email: email,
    Tlf: phone,
    Adresse: address
  };
  res.locals.contactInfo = showList(contactInfo);
  next();
}

module.exports = loadEnv;