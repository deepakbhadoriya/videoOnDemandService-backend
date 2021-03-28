var mongoose = require('mongoose');

const ifNotFoundById = (data, dataName, res) =>
  !data && res.status(404).send(`The ${dataName} with the given ID was not found.`);

const validateMongoObjId = (id, idOf, res) =>
  !mongoose.Types.ObjectId.isValid(id) && res.status(404).send(`Give ID of ${idOf} is not valid.`);

const errorResponse = { ifNotFoundById, validateMongoObjId };

module.exports = errorResponse;
