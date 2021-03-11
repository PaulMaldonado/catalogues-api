const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.w504p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.connect(uri, options)
    .then(() => {
        console.log('Database is connected!');
    })
    .catch(error => {
        console.error(error);
    })

mongoose.Promise = global.Promise

module.exports = mongoose;