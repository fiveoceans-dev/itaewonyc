// app.js

const express = require('express');
const path = require('path');
const i18n = require('i18n');
const session = require('express-session');

const app = express();

// -------------------
// i18n Configuration
// -------------------
i18n.configure({
  locales: ['ko', 'en'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'ko',
  cookie: 'lang',
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false
});

app.use(i18n.init);

// Make translation function available in all views
app.use((req, res, next) => {
  res.locals.__ = res.__;
  res.locals.locale = res.getLocale(); // Optional: for language switch buttons
  next();
});

// -------------------
// View Engine & Static
// -------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// -------------------
// Routes
// -------------------
const viewsRoutes = require('./routes/views');
app.use('/', viewsRoutes);

// -------------------
// Error Handling
// -------------------
app.use((req, res) => {
  res.status(404).render('404', { title: res.__('Page Not Found') });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: res.__('Server Error') });
});

module.exports = app;
