// app.js

const express = require('express');
const session = require('express-session');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();


// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
const viewsRoutes = require('./routes/views');

app.use('/', viewsRoutes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// General error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

module.exports = app;