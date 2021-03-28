const { Speaker, validate } = require('../models/Speaker.model');
const { ifNotFoundById, validateMongoObjId } = require('../utils/errorResponse');

const express = require('express');
const router = express.Router();

// @route   GET api/v1/speaker
// @desc    Get the all the speaker
// @access  Public
router.get('/', async (req, res) => {
  const speaker = await Speaker.find();
  res.send(speaker);
});

// @route   GET api/v1/speaker/:speakerId
// @desc    Get the speaker by ID
// @access  Public
router.get('/:speakerId', async (req, res) => {
  const speakerId = req.params.speakerId;
  validateMongoObjId(speakerId, 'speaker', res);
  const speaker = await Speaker.findById(speakerId);
  ifNotFoundById(speaker, 'speaker', res);
  res.send(speaker);
});

// @route   POST api/v1/speaker
// @desc    Add new speaker
// @access  Public
router.post('/', async (req, res) => {
  const { name, highestEdu, imageUrl } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const speaker = new Speaker({ name, highestEdu, imageUrl });

  await speaker.save();
  res.send(speaker);
});

// @route   PUT api/v1/speaker/:speakerId
// @desc    Update the speaker by Id
// @access  Public
router.put('/:speakerId', async (req, res) => {
  const speakerId = req.params.speakerId;
  const { name, highestEdu, imageUrl } = req.body;

  validateMongoObjId(speakerId, 'speaker', res);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const speaker = await Speaker.findByIdAndUpdate(
    speakerId,
    { name, highestEdu, imageUrl },
    { new: true }
  );
  ifNotFoundById(speaker, 'speaker', res);

  res.send(speaker);
});

// @route   DELETE api/v1/speaker/:speakerId
// @desc    Delete the speaker by Id
// @access  Public
router.delete('/:speakerId', async (req, res) => {
  const speakerId = req.params.speakerId;

  validateMongoObjId(speakerId, 'speaker', res);

  const speaker = await Speaker.findByIdAndDelete(speakerId);
  ifNotFoundById(speaker, 'speaker', res);

  res.send(speaker);
});

module.exports = router;
