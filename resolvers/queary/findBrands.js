import { GraphQLError } from 'graphql';
import Brand from '../../models/Brand.js';

const findBrands = async () => {
  let brands;
  try {
    brands = await Brand.find({});
  } catch (err) {
    throw new GraphQLError(err.message);
  }
  return brands;
};

export default findBrands;
