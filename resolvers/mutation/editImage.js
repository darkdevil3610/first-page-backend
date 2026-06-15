/* eslint-disable import/extensions */
import { GraphQLError } from 'graphql';
import Image from '../../models/Image.js';

const editImage = async (root, args) => {
  const {
    id, src, srcMobile, link, alt,
  } = args;

  const image = await Image.findById(id);

  image.src = src;
  image.srcMobile = srcMobile;
  image.link = link;
  image.alt = alt;

  try {
    await image.save();
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'SERVER_DATABASE_ERROR',
        invalidArgs: args,
      },
    });
  }
  return image;
};

export default editImage;
