import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    require: true,
    maxlength: 300,
  },
  link: {
    type: String,
  },
});

export default model('Text', schema);
