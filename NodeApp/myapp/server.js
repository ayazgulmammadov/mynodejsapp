'use strict';
const express = require('express');
const PORT = 8888;
const HOST = '0.0.0.0';
const app = express();
app.get('/', (req, res) => {
  res.send('Yeah, DevOps awesome app!!!\n');
});
app.listen(PORT, HOST);
console.log(`App URL: http://${HOST}:${PORT}`);