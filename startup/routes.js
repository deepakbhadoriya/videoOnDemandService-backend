const express = require('express');
const cors = require('cors');

const video = require('../routes/video');
const speaker = require('../routes/speaker');
const topic = require('../routes/topic');

const error = require('../middleware/error');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json({ extended: false }));

  // Routes

  app.use('/api/v1/video', video);
  app.use('/api/v1/speaker', speaker);
  app.use('/api/v1/topic', topic);

  // Test Routes
  app.use('/__test', (req, res) => res.json('backend working'));

  app.use(error);
};
