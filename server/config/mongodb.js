const mongoose = require('mongoose');

const mongodbUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/default';

mongoose
  .connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'))
  .catch(() => console.log('failed to connect to db'));
