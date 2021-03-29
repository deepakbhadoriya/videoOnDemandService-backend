const express = require('express');
const winston = require('winston');
const app = express();

// winston logging transport
require('./startup/logger')();
//connect Database
require('./startup/db')();
//Routes
require('./startup/routes')(app);

//Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   //Set Static Folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => winston.info(`Server started at port ${PORT}`));
