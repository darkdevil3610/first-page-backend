import { GraphQLError } from 'graphql';
import Shop from '../../models/Shop.js';

const findShops = async () => {
  let shops;
  try {
    shops = await Shop.find({});
  } catch (err) {
    throw new GraphQLError(err.message);
  }
  return shops;
};

export default findShops;
