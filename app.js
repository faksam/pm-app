const path = require('path');
const express = require('express');
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app;
