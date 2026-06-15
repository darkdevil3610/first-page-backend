import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  srcMobile: {
    type: String,
  },
  alt: {
    type: String,
    required: true,
    maxlength: 20,
  },
  link: {
    type: String,
    maxlength: 20,
  },
});

export default mongoose.model('Image', schema);
