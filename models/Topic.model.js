const Joi = require('joi');
const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

function validateTopic(topic) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(topic);
}

const Topic = mongoose.model('Topic', TopicSchema);

exports.TopicSchema = TopicSchema;

exports.Topic = Topic;
exports.validate = validateTopic;
