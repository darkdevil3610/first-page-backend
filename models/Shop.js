import { Schema, model } from 'mongoose';

const schema = new Schema({
  city: {
    type: String,
    required: true,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
    maxlength: 40,
  },
  direcction: {
    type: String,
    required: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 30,
  },
  workingHours: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    maxlength: 60,
  },
  src: {
    type: String,
    required: true,
  },
});

export default model('Shop', schema);
