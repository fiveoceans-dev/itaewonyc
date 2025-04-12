// app.js

const express = require('express');
const session = require('express-session');
const path = require('path');
const i18n = require('i18n');

const app = express();

// i18n Configuration
i18n.configure({
  locales: ['ko', 'en'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'ko',
  cookie: 'lang',
  autoReload: true,
  updateFiles: false
});

app.use(i18n.init);

// Locale Extraction Middleware
app.use((req, res, next) => {
  const segments = req.url.split('/');
  // segments[0] is empty because URL starts with "/"
  if (segments.length > 1) {
    const potentialLocale = segments[1];
    if (['ko', 'en'].includes(potentialLocale)) {
      req.setLocale(potentialLocale);
      res.locals.locale = potentialLocale;
      req.url = req.url.substring(potentialLocale.length + 1) || '/';
    }
  }
  next();
});

// Make translation function available in all views
app.use((req, res, next) => {
  res.locals.__ = res.__;
  res.locals.locale = res.getLocale();
  next();
});

// View Engine & Static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const viewsRoutes = require('./routes/views');
app.use('/', viewsRoutes);

// Error Handling
app.use((req, res) => {
  res.status(404).render('404', { title: res.__('Page Not Found') });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: res.__('Server Error') });
});

module.exports = app;
