const { Video, validate } = require('../models/Video.model');
const { ifNotFoundById, validateMongoObjId } = require('../utils/errorResponse');

const express = require('express');
const router = express.Router();

// @route   GET api/v1/video
// @desc    Get the all the video
// @access  Public
router.get('/', async (req, res) => {
  const video = await Video.find().populate('speakers').populate('topics');
  res.send(video);
});

// @route   GET api/v1/video/:videoId
// @desc    Get the video by ID
// @access  Public
router.get('/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  validateMongoObjId(videoId, 'video', res);
  const video = await Video.findById(videoId).populate('speakers').populate('topics');
  ifNotFoundById(video, 'video', res);
  res.send(video);
});

// @route   POST api/v1/video
// @desc    Add new video
// @access  Public
router.post('/', async (req, res) => {
  const { title, description, thumbnailUrl, videoUrl, speakers, topics } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let video = new Video({ title, description, thumbnailUrl, videoUrl, speakers, topics });

  video = await video.save();
  video = await Video.findById(video._id).populate('speakers').populate('topics');
  res.send(video);
});

// @route   PUT api/v1/video/:videoId
// @desc    Update the video by Id
// @access  Public
router.put('/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const { title, description, thumbnailUrl, videoUrl, speakers, topics } = req.body;

  validateMongoObjId(videoId, 'video', res);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const video = await Video.findByIdAndUpdate(
    videoId,
    { title, description, thumbnailUrl, videoUrl, speakers, topics },
    { new: true }
  )
    .populate('speakers')
    .populate('topics');
  ifNotFoundById(video, 'video', res);

  res.send(video);
});

// @route   DELETE api/v1/video/:videoId
// @desc    Delete the video by Id
// @access  Public
router.delete('/:videoId', async (req, res) => {
  const videoId = req.params.videoId;

  validateMongoObjId(videoId, 'video', res);

  const video = await Video.findByIdAndDelete(videoId).populate('speakers').populate('topics');
  ifNotFoundById(video, 'video', res);

  res.send(video);
});

module.exports = router;
