const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const FormSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique:true
  },
  password: String
});
const FormData = mongoose.model('formData', FormSchema);
module.exports = FormData;