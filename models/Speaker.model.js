const Joi = require('joi');
const mongoose = require('mongoose');

const SpeakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  highestEdu: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

function validateSpeaker(speaker) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    highestEdu: Joi.string().min(5).max(255).required(),
    imageUrl: Joi.string().required(),
  });

  return schema.validate(speaker);
}

const Speaker = mongoose.model('Speaker', SpeakerSchema);

exports.Speaker = Speaker;
exports.validate = validateSpeaker;
