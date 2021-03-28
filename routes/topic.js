const { Topic, validate } = require('../models/Topic.model');
const { ifNotFoundById, validateMongoObjId } = require('../utils/errorResponse');

const express = require('express');
const router = express.Router();

// @route   GET api/v1/topic
// @desc    Get the all the topic
// @access  Public
router.get('/', async (req, res) => {
  const topic = await Topic.find();
  res.send(topic);
});

// @route   GET api/v1/topic/:topicId
// @desc    Get the topic by ID
// @access  Public
router.get('/:topicId', async (req, res) => {
  const topicId = req.params.topicId;
  validateMongoObjId(topicId, 'topic', res);
  const topic = await Topic.findById(topicId);
  ifNotFoundById(topic, 'topic', res);
  res.send(topic);
});

// @route   POST api/v1/topic
// @desc    Add new topic
// @access  Public
router.post('/', async (req, res) => {
  const { name } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let topic = new Topic({ name });

  try {
    topic = await topic.save();
    topic = await Topic.findById(topic._id);
    res.send(topic);
  } catch (error) {
    res.status(400).send('Duplicate topic name');
  }
});

// @route   PUT api/v1/topic/:topicId
// @desc    Update the topic by Id
// @access  Public
router.put('/:topicId', async (req, res) => {
  const topicId = req.params.topicId;
  const { name } = req.body;

  validateMongoObjId(topicId, 'topic', res);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const topic = await Topic.findByIdAndUpdate(topicId, { name }, { new: true });
  ifNotFoundById(topic, 'topic', res);

  res.send(topic);
});

// @route   DELETE api/v1/topic/:topicId
// @desc    Delete the topic by Id
// @access  Public
router.delete('/:topicId', async (req, res) => {
  const topicId = req.params.topicId;

  validateMongoObjId(topicId, 'topic', res);

  const topic = await Topic.findByIdAndDelete(topicId);
  ifNotFoundById(topic, 'topic', res);

  res.send(topic);
});

module.exports = router;
