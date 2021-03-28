const mongoose = require('mongoose');
const Joi = require('joi');
const { TopicSchema } = require('./Topic.model');

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  speakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Speaker',
    },
  ],
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function validateVideo(video) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).required(),
    thumbnailUrl: Joi.string().required(),
    videoUrl: Joi.string().required(),
    speakers: Joi.array(),
    topics: Joi.array(),
  });

  return schema.validate(video);
}

const Video = mongoose.model('Video', VideoSchema);

exports.Video = Video;
exports.validate = validateVideo;
