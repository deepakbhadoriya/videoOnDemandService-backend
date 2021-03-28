const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

//! Add your mongoURI in default.json for local

var db = '';
if (process.env.NODE_ENV === 'production') {
  db = process.env.MONGO_URI;
} else {
  db = config.get('mongoURI');
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    winston.info(`Connected to MONOGODB`);
  } catch (error) {
    winston.error(error.message, error);
    //exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
